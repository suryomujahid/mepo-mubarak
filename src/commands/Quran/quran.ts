import { Pagination, PaginationType, PaginationOptions } from "@discordx/pagination";
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
export default class QuranCommand {

  constructor(
    private quran: Quran,
  ) { }

  @Slash({
    name: 'quran',
    description: L['en']['COMMANDS']['QURAN']['DESCRIPTION'](),
    descriptionLocalizations: {
      en: L['en']['COMMANDS']['QURAN']['DESCRIPTION'](),
      id: L['id']['COMMANDS']['QURAN']['DESCRIPTION'](),
    },
  })
  async surahHandler(
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
      const editions = (L[lang]['QURAN_CONFIG']['SURAH']['EDITIONS']()).split(','),
        quranArabic: QuranType | undefined = await this.quran.getQuran( editions[0] || localize['QURAN_CONFIG']['SURAH']['EDITIONS']()),
        quranLocal: QuranType | undefined = await this.quran.getQuran( editions[1] || localize['QURAN_CONFIG']['SURAH']['EDITIONS']())

      if (quranArabic && quranLocal) {
        const embeds = quranArabic.surahs.map((surah, surahIndex) => {
          const local = quranLocal.surahs[surahIndex]

          const ayahs: EmbedBuilder[] = surah.ayahs?.map((ayah, ayahIndex) => {
            const localAyah = local.ayahs?.[ayahIndex]

            return new EmbedBuilder()
              .setColor(getColor('primary'))
              .setTitle(localize['COMMANDS']['QURAN']['EMBED']['TITLE']({ name: local?.englishName, name_translation: local?.englishNameTranslation}))
              .setDescription(localize['COMMANDS']['QURAN']['EMBED']['DESCRIPTION']({ ayah_arabic: ayah?.text, ayah_translation: localAyah?.text ?? '' }))
              .setFooter({
                text: localize['COMMANDS']['QURAN']['EMBED']['FOOTER']({ from: surahIndex + 1, total: quranArabic.surahs.length, count: ayahIndex + 1, total_count: surah.ayahs?.length ?? 0 })
              })
            }
          ) || []

          if (!ayahs) throw new UnknownReplyError(interaction)

          return ayahs
        }).flat() ?? []

        if (!embeds || embeds.length < 1) throw new UnknownReplyError(interaction)

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
        )
        .send()

      } else throw new UnknownReplyError(interaction)
    } catch (error) {
      throw new UnknownReplyError(interaction)
    }
  }
}
