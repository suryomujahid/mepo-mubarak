import { Category } from "@discordx/utilities"
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js"
import { Client } from "discordx"
import { injectable } from "tsyringe"

import { Discord, Slash, SlashOption } from "@decorators"
import { Hadith } from "@services"
import { getColor } from "@utils/functions"
import { UnknownReplyError } from "@errors"

@Discord()
@injectable()
@Category('Hadith')
export default class RandomHadithCommand {

  constructor(
    private hadith: Hadith
  ) {}

  @Slash({
    name: 'random-hadith'
  })
  async randomHadithHandler(
    @SlashOption({name: 'rawi_id', type: ApplicationCommandOptionType.String, required: false}) rawi: string,
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData
  ) {
    const hadith: HadithType | undefined = await this.hadith.getRandomHadith(rawi)

    if (hadith) {
      const body = `${hadith.contents.arab}\n\n${hadith.contents.id}`

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ forceStatic: false })
        })
        .setTitle(localize['COMMANDS']['RANDOM_HADITH']['EMBED']['TITLE']())
        .setDescription(localize['COMMANDS']['RANDOM_HADITH']['EMBED']['DESCRIPTION']({ hadith: body }))
        .setColor(getColor('primary'))
        .setTimestamp()
        .setFooter({
          text: localize['COMMANDS']['RANDOM_HADITH']['EMBED']['FOOTER']({rawi: hadith.name, no: hadith.contents.number})
        })

      await interaction.followUp({ embeds: [embed] })
    } else throw new UnknownReplyError(interaction, localize['COMMANDS']['RANDOM_HADITH']['ERRORS']['NO_HADITH']())
  }
}
