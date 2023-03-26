import { Category } from "@discordx/utilities"
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js"
import { Client } from "discordx"
import { injectable } from "tsyringe"

import { generalConfig } from "@configs"
import { Discord, Slash, SlashOption } from "@decorators"
import { Guild, GuildNotification } from "@entities"
import { UnknownReplyError } from "@errors"
import { Guard, UserPermissions } from "@guards"
import { Database } from "@services"
import { resolveChannel, resolveGuild, simpleSuccessEmbed } from "@utils/functions"

@Discord()
@injectable()
@Category('Hadith')
export default class DailyHadithCommand {

  constructor(
    private db: Database,
  ) { }

  @Slash({ name: 'daily-hadith' })
  @Guard(
    UserPermissions(['Administrator'])
  )
  async dailyHadithHandler(
    @SlashOption({
      name: 'state',
      type: ApplicationCommandOptionType.Boolean,
      required: true,
    }) state: boolean | undefined,
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData
  ) {

    // TODO: Create a service to handle this (especially the part where database is called)
    const guild = resolveGuild(interaction),
      guildData = await this.db.get(GuildNotification).findOne({ id: guild?.id || '' }),
      channel = resolveChannel(interaction)

    if (guildData && state) throw new UnknownReplyError(interaction, localize['COMMANDS']['DAILY_HADITH']['ERRORS']['ALREADY_ENABLED']())

    try {
      if (guildData) {
        guildData.dailyHadith = state

        if (state) this.db.get(GuildNotification).persistAndFlush(guildData)
        else this.db.get(GuildNotification).removeAndFlush(guildData)

        const message = state ? localize['COMMANDS']['DAILY_HADITH']['EMBED']['ENABLED']() : localize['COMMANDS']['DAILY_HADITH']['EMBED']['DISABLED']()
        simpleSuccessEmbed(interaction, message)
      }
      else {
        const newGuild = new GuildNotification()
        newGuild.id = guild?.id || ''
        newGuild.dailyHadith = state || false
        newGuild.channelId = channel?.id || ''
        this.db.get(GuildNotification).persistAndFlush(newGuild)

        const message = state ? localize['COMMANDS']['DAILY_HADITH']['EMBED']['ENABLED']() : localize['COMMANDS']['DAILY_HADITH']['EMBED']['DISABLED']()
        simpleSuccessEmbed(interaction, message)
      }
    } catch (error) {
      throw new UnknownReplyError(interaction)
    }

  }
}
