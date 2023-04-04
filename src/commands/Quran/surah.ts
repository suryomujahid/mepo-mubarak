import { Pagination, PaginationType } from "@discordx/pagination";
import { Category } from "@discordx/utilities";
import { ApplicationCommandOptionType, CommandInteraction, EmbedBuilder } from "discord.js";
import { Client } from "discordx";
import { injectable } from "tsyringe";


import { Discord, Slash, SlashChoice, SlashOption } from "@decorators";
import { Quran } from "@services";
import { getColor } from "@utils/functions";
import { UnknownReplyError } from "@errors";
import { L, Locales } from "@i18n";

@Discord()
@injectable()
@Category('Quran')
export default class SurahCommand {

  constructor(
    private quran: Quran,
  ) { }

  @Slash({
    name: 'surah',
    description: L['en']['COMMANDS']['SURAH']['DESCRIPTION'](),
    descriptionLocalizations: {
      en: L['en']['COMMANDS']['SURAH']['DESCRIPTION'](),
      id: L['id']['COMMANDS']['SURAH']['DESCRIPTION'](),
    },
  })
  async surahHandler(
    @SlashOption({
      name: 'surah',
      description: L['en']['COMMANDS']['SURAH']['OPTIONS']['SURAH'](),
      descriptionLocalizations: {
        en: L['en']['COMMANDS']['SURAH']['OPTIONS']['SURAH'](),
        id: L['id']['COMMANDS']['SURAH']['OPTIONS']['SURAH'](),
      },
      required: true,
      type: ApplicationCommandOptionType.Integer,
      minValue: 1,
      maxValue: 114
    }) surah: number,
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
        en: L['en']['COMMANDS']['SURAH']['OPTIONS']['LANG'](),
        id: L['id']['COMMANDS']['SURAH']['OPTIONS']['LANG'](),
      },
      required: true,
    }) lang: Locales,
    interaction: CommandInteraction,
    client: Client,
    { localize }: InteractionData,
  ) {
    try {
      const editions = L[lang]['QURAN_CONFIG']['SURAH']['EDITIONS'](),
        surahs: QuranSurahType[] | undefined = await this.quran.getSurah(surah, editions || localize['QURAN_CONFIG']['SURAH']['EDITIONS']())

      if (surahs && surahs.length > 0) {
        const embeds = surahs[0].ayahs?.map((ayah, index) => new EmbedBuilder()
          .setAuthor({
            name: interaction.user.username,
            iconURL: interaction.user.displayAvatarURL({ forceStatic: false })
          })
          .setTitle(localize['COMMANDS']['SURAH']['EMBED']['TITLE']({ name: surahs[1]?.englishName, name_translation: surahs[1]?.englishNameTranslation}))
          .setDescription(localize['COMMANDS']['SURAH']['EMBED']['DESCRIPTION']({ ayah_arabic: ayah?.text, ayah_translation: surahs[1]?.ayahs?.[index]?.text ?? '' }))
          .setFooter({
            text: localize['COMMANDS']['SURAH']['EMBED']['FOOTER']({ from: index + 1, total: surahs[1]?.numberOfAyahs })
          })
          .setColor(getColor('primary'))
          .setTimestamp()
        ) ?? []

        await new Pagination(
          interaction,
          embeds.map((embed) => ({
            embeds: [embed],
          })),
          {
            onTimeout: () => interaction.editReply({ components: [] }),
            time: 90 * 1000,
            type: PaginationType.Button,
          }
        ).send()
      } else throw new UnknownReplyError(interaction)
    } catch (error) {
      throw new UnknownReplyError(interaction)
    }
  }
}
