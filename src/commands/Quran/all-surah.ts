
import { Category } from "@discordx/utilities";
import { CommandInteraction, EmbedBuilder } from "discord.js";
import { Client } from "discordx";
import { Pagination, PaginationResolver, PaginationType } from "@discordx/pagination";
import { injectable } from "tsyringe";

import { Discord, Slash, SlashOption } from "@decorators";
import { Quran } from "@services";
import { getColor } from "@utils/functions";
import { UnknownReplyError } from "@errors";

@Discord()
@injectable()
@Category('Quran')
export default class AllSurahCommand {

  constructor(
    private quran: Quran,
  ) { }

  @Slash({
    name: 'all-surah'
  })
  async allSurahHandler(
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData
  ) {
    try {
      const surahs: QuranSurahType[] | undefined = await this.quran.getAllSurah()
      if (surahs) {
        let data = surahs.map(surah => `**${surah?.number}.**\t${surah?.englishName} (${surah?.name}) - \`${surah?.numberOfAyahs}\``).join('\n').replace(/'/g, '\\\''),
          initDataLength = data.length,
          multipleData = []

        while (data.length > 1024) {
          if (data.length === initDataLength) data = `\n${data}`

          let pos = data.substring(0, 1024).lastIndexOf('\n')
          multipleData.push([data.substring(0, pos)])
          data = data.substring(pos)
        }
        multipleData.push([data])

        const embeds = multipleData.map(data => new EmbedBuilder()
          .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ forceStatic: false })
          })
          .setTitle(localize['COMMANDS']['ALL_SURAH']['EMBED']['TITLE']())
          .setDescription(`
              ${localize['COMMANDS']['ALL_SURAH']['EMBED']['DESCRIPTION']()}

              **No.**\t**Surah** - \`Ayah\`
              ${data}
            `)
          .setColor(getColor('primary'))
          .setTimestamp()
        )

        await new Pagination(
          interaction,
          embeds.map((embed) => ({
            embeds: [embed]
          })),
          {
            onTimeout: () => interaction.editReply({ components: [] }),
            time: 5 * 1000,
            type: PaginationType.Button,
          }
        ).send()
      } else if (!surahs) throw new UnknownReplyError(interaction, localize['COMMANDS']['ALL_SURAH']['ERRORS']['NO_SURAH']())
      else throw new UnknownReplyError(interaction)
    } catch (error) {
      throw new UnknownReplyError(interaction)
    }
  }
}