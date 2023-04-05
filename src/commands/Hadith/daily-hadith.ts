import { Category } from "@discordx/utilities"
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js"
import { Client } from "discordx"
import { injectable } from "tsyringe"

import { Discord, Slash, SlashChoice, SlashOption } from "@decorators"
import { UnknownReplyError } from "@errors"
import { Guard, UserPermissions } from "@guards"
import { GuildNotification } from "@services"
import { resolveChannel, resolveGuild, simpleSuccessEmbed } from "@utils/functions"
import { L, Locales } from "@i18n"
import { GuildNotificationType } from "src/utils/types/guildNotification"

@Discord()
@injectable()
@Category('Hadith')
export default class DailyHadithCommand {

  constructor(
    private guildNotification: GuildNotification,
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
    @SlashChoice({
      name: 'English',
      value: 'en',
    })
    @SlashChoice({
      name: 'Indonesia',
      value: 'id',
    })
    @SlashOption({
      name: 'lang',
      type: ApplicationCommandOptionType.String,
      description: L['en']['COMMANDS']['DAILY_QURAN_VERSE']['OPTIONS']['LANG'](),
      descriptionLocalizations: {
        en: L['en']['COMMANDS']['DAILY_QURAN_VERSE']['OPTIONS']['LANG'](),
        id: L['id']['COMMANDS']['DAILY_QURAN_VERSE']['OPTIONS']['LANG'](),
      },
      required: false,
      maxLength: 2
    }) lang: Locales,
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData
  ) {
    const guild = resolveGuild(interaction),
      guildData = await this.guildNotification.get(guild!.id),
      channel = resolveChannel(interaction)

      try {
        if (guildData) {
          if (guildData.dailyHadith && state && (channel?.id === guildData.channelId)) throw new UnknownReplyError(interaction, localize['COMMANDS']['DAILY_HADITH']['ERRORS']['ALREADY_ENABLED']())
          guildData.dailyHadith = state
          guildData.language = lang || guildData.language

          this.guildNotification.update(guild!.id, guildData)

          const message = state ? localize['COMMANDS']['DAILY_HADITH']['EMBED']['ENABLED']() : localize['COMMANDS']['DAILY_HADITH']['EMBED']['DISABLED']()
          simpleSuccessEmbed(interaction, message)
        } else {
          if (!state) throw new UnknownReplyError(interaction, localize['COMMANDS']['DAILY_HADITH']['ERRORS']['MUST_BE_ENABLED']())

          const newGuild: GuildNotificationType = {
            id: guild!.id,
            channelId: channel!.id,
            dailyHadith: state,
            language: lang || 'id'
          }
          this.guildNotification.create(newGuild)

          simpleSuccessEmbed(interaction, localize['COMMANDS']['DAILY_HADITH']['EMBED']['ENABLED']())
        }
      } catch (error) {
        throw new UnknownReplyError(interaction)
      }
  }
}
