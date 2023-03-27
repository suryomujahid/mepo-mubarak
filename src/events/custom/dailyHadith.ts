import { Client } from 'discordx'

import { Discord, OnCustom, Schedule } from '@decorators'
import { injectable } from 'tsyringe'
import { Database, Logger } from '@services'
import { EntityRepository } from '@mikro-orm/sqlite'
import { GuildNotification } from '@entities'
import { Hadith } from '@services'
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
    private db: Database,
    private hadith: Hadith
  ) {
    this.guildNotificationRepo = this.db.em.getRepository(GuildNotification)
    this.logger
  }

  @OnCustom('dailyHadith')
  @Schedule('0 0 12 * * *')
  async dailyRandomHadith(): Promise<void> {
    this.logger.log(`Schedule: Daily random hadith started`)

    const guildNotifications = await this.guildNotificationRepo.findAll()

    if (!guildNotifications || guildNotifications.length === 0) {
      this.logger.log(`Schedule: Daily random hadith stopped. No guild notification found`)
      return
    }

    const hadith = await this.hadith.getRandomHadith()

    if (!hadith || !hadith.contents) return

    for (const guildNotification of guildNotifications) {

      const guild = this.client.guilds.cache.get(guildNotification.id)
      if (!guild) continue

      const channel = guild.channels.cache.get(guildNotification.channelId)

      // TODO: Add language support
      const body = `${hadith?.contents?.arab}\n\n${hadith?.contents?.id}`
      const embed =  new EmbedBuilder()
        // .setAuthor({
        //   name: interaction.user.username,
        //   iconURL: interaction.user.displayAvatarURL({ forceStatic: false })
        // })
        .setTitle(L['en']['COMMANDS']['DAILY_HADITH']['TITLE']())
        .setDescription(L['en']['COMMANDS']['RANDOM_HADITH']['EMBED']['DESCRIPTION']({ hadith: body }))
        .setColor(getColor('primary'))
        .setTimestamp()
        .setFooter({
          text: L['en']['COMMANDS']['RANDOM_HADITH']['EMBED']['FOOTER']({rawi: hadith?.name, no: hadith?.contents?.number})
        })

      await (channel as TextChannel).send({ embeds: [embed] })

    }

    this.logger.log(`Schedule: Daily random hadith sent`)
  }
}