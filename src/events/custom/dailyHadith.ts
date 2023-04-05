import { Client } from 'discordx'

import { Discord, OnCustom, Schedule } from '@decorators'
import { injectable } from 'tsyringe'
import { GuildNotification, Hadith, Logger } from '@services'
import { EntityRepository } from '@mikro-orm/sqlite'
import { EmbedBuilder, TextChannel } from 'discord.js'
import { getColor } from '@utils/functions'
import { L } from '@i18n'

@Discord()
@injectable()

export default class DailyHadith {

  // =============================
  // ========= Handlers ==========
  // =============================

  private guildNotificationRepo: EntityRepository<GuildNotification>

  constructor(
    private client: Client,
    private logger: Logger,
    private guildNotification: GuildNotification,
    private hadith: Hadith
  ) {
    this.logger
  }

  @OnCustom('dailyHadith')
  @Schedule('0 0 12 * * *')
  async dailyRandomHadith(): Promise<void> {
    this.logger.log(`Schedule: Daily random hadith started`)

    const guildNotifications = await this.guildNotification.getAll({ dailyHadith: true })
    if (!guildNotifications || guildNotifications.length === 0) {
      this.logger.log(`Schedule: Daily random hadith stopped. No guild notification found`)
      return
    }

    // Temporary fix for hadith api error
    let errorCount = 0
    do {
      var hadith = await this.hadith.getRandomHadith()
    } while (!hadith) {
      errorCount++
      if (errorCount > 5)  {
        this.logger.log(`Schedule: Daily random hadith stopped. No hadith found`)
        return
      }
    }

    for (const guildNotification of guildNotifications) {
      const guild = this.client.guilds.cache.get(guildNotification.id)
      if (!guild) continue

      const channel = guild.channels.cache.get(guildNotification.channelId)
      if (!channel) continue

      const body = `${hadith?.contents?.arab}\n\n${hadith?.contents?.id}`
      const embed =  new EmbedBuilder()
        .setTitle('👳‍♂️ ' + L[guildNotification.language]['COMMANDS']['DAILY_HADITH']['TITLE'](),)
        .setDescription(L[guildNotification.language]['COMMANDS']['RANDOM_HADITH']['EMBED']['DESCRIPTION']({ hadith: body }))
        .setColor(getColor('primary'))
        .setTimestamp()
        .setFooter({
          text: L[guildNotification.language]['COMMANDS']['RANDOM_HADITH']['EMBED']['FOOTER']({rawi: hadith?.name, no: hadith?.contents?.number})
        })

      await (channel as TextChannel).send({ embeds: [embed] })
    }

    this.logger.log(`Schedule: Daily random hadith finished`)
  }
}