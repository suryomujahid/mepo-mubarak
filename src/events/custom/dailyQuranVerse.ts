import { Client } from 'discordx'

import { Discord, OnCustom, Schedule } from '@decorators'
import { injectable } from 'tsyringe'
import { GuildNotification, Quran, Logger } from '@services'
import { EmbedBuilder, TextChannel } from 'discord.js'
import { getColor } from '@utils/functions'
import { L } from '@i18n'

@Discord()
@injectable()

export default class DailyQuranVerse {

  // =============================
  // ========= Handlers ==========
  // =============================

  constructor(
    private client: Client,
    private logger: Logger,
    private guildNotification: GuildNotification,
    private quran: Quran
  ) {
    this.logger
  }

  @OnCustom('dailyQuranVerse')
  @Schedule('0 0 18 * * *')
  async dailyRandomQuranVerse(): Promise<void> {
    this.logger.log(`Schedule: Daily random quran verse started`)

    const guildNotifications = await this.guildNotification.getAll({ dailyQuran: true })
    if (!guildNotifications || guildNotifications.length === 0) {
      this.logger.log(`Schedule: Daily random quran verse stopped. No guild notification found`)
      return
    }

    // Temporary fix for quran api error
    let errorCount = 0
    do {
      var verses = await this.quran.getRandomAyah(L['id']['QURAN_CONFIG']['SURAH']['EDITIONS']() + ',' + L['en']['QURAN_CONFIG']['SURAH']['EDITIONS']())
    } while (!verses || verses.length === 0) {
      errorCount++
      if (errorCount > 5)  {
        this.logger.log(`Schedule: Daily random quran verse stopped. No verses found`)
        return
      }
    }

    for (const guildNotification of guildNotifications) {
      const guild = this.client.guilds.cache.get(guildNotification.id)
      if (!guild) continue

      const channel = guild.channels.cache.get(guildNotification.channelId)
      if (!channel) continue

      const localVerses = verses.slice(guildNotification.language === 'en' ? 2 : 0, guildNotification.language === 'en' ? 4 : 2)
      const title = `${localVerses[0].surah?.englishName} (${localVerses[0].surah?.name}) - ${localVerses[0].numberInSurah}`,
        description = `
          \u202A${localVerses[0].text}

          ${localVerses[1].text}
        `,
        footer = `Quran edition: ${localVerses[1]?.edition?.name} (${guildNotification.language ?? 'id'}), ${localVerses[0]?.edition?.englishName} (ar)`

      const embed = new EmbedBuilder()
        .setAuthor({
          name: '📖 ' + L[guildNotification.language]['COMMANDS']['DAILY_QURAN_VERSE']['TITLE'](),
        })
        .setTitle(title)
        .setDescription(description)
        .setColor(getColor('primary'))
        .setFooter({
          text: footer
        })
        .setTimestamp()

      await (channel as TextChannel).send({ embeds: [embed] })
    }

    this.logger.log(`Schedule: Daily random quran verse finished`)
  }
}
