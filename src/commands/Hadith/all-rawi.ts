import { Slash, Discord} from "@decorators";
import { Client } from "discordx";
import { Category } from "@discordx/utilities";
import { injectable } from "tsyringe";

import { Hadith } from "@services";
import { getColor } from "@utils/functions";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { UnknownReplyError } from "@errors";

@Discord()
@injectable()
@Category('Hadith')
export default class AllRawiCommand {

  constructor(
    private hadith: Hadith
  ) {}

  @Slash({
    name: 'all-rawi'
  })
  async allRawiHandler(
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData
  ) {
    const rawis: HadithRawiType[] | undefined = await this.hadith.getAllRawi()
    if (rawis && rawis.length > 0) {
      const body = rawis.map(rawi => rawi?.id).join('\n')

      const embed = new EmbedBuilder()
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.displayAvatarURL({ forceStatic: false })
        })
        .setTitle(localize['COMMANDS']['ALL_RAWI']['EMBED']['TITLE']())
        .setDescription(localize['COMMANDS']['ALL_RAWI']['EMBED']['DESCRIPTION']({ rawis: body }))
        .setColor(getColor('primary'))
        .setTimestamp()

      await interaction.followUp({ embeds: [embed] })
    } else throw new UnknownReplyError(interaction, localize['COMMANDS']['ALL_RAWI']['ERRORS']['NO_RAWI']())
  }
}
