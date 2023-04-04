import { Client } from "discordx"
import { delay, inject, singleton } from "tsyringe"
import { Database, Logger } from "@services"
import { Schedule } from "@decorators"

@singleton()
export class Quran {
  private _totalVerse: number = 6236

  constructor(
    private logger: Logger,
    @inject(delay(() => Client)) private client: Client,
  ) {
    this.logger
  }

  /**
   * Get quran from the API
   * @param edition The edition to get
   */
  async getQuran(edition: string): Promise<QuranType | undefined> {
    const quran: QuranResponseType = await fetch(process.env.QURAN_BASE_URL + '/quran/' + edition)
        .then(res => res.json())
        .catch(err => err)

    if (!quran || !quran?.data || quran?.code !== 200) {
      return
    }

    return quran.data as QuranType
  }

  /**
   * Get all quran surah from the API
   * @param editions The editions to get
   *
   * @returns The surahs
   */
  async getAllSurah(): Promise<QuranSurahType[] | undefined> {
    const surahs: QuranResponseType = await fetch(process.env.QURAN_BASE_URL + '/surah')
        .then(res => res.json())
        .catch(err => err)
    if (!surahs || !surahs?.data || surahs?.code !== 200) {
      return
    }

    return surahs.data as QuranSurahType[]
  }

  /**
   * Get a quran surah from the API
   * @param number The surah number
   * @param editions The editions to get
   */
  async getSurah(number: number, editions: string): Promise<QuranSurahType[] | undefined> {
    const surahs: QuranResponseType = await fetch(process.env.QURAN_BASE_URL + '/surah/' + number + '/editions/' + editions)
        .then(res => res.json())
        .catch(err => err)

    if (!surahs || !surahs?.data || surahs?.code !== 200) {
      return
    }

    return surahs.data as QuranSurahType[]
  }

  /**
   * Get a quran ayah from the API
   * @param number The ayah number
   * @param editions The editions to get
   */
  async getAyah(number: number, editions: string): Promise<QuranAyahType[] | undefined> {
    const ayahs: QuranResponseType = await fetch(process.env.QURAN_BASE_URL + '/ayah/' + number + '/editions/' + editions)
        .then(res => res.json())
        .catch(err => err)

    if (!ayahs || !ayahs?.data || ayahs?.code !== 200) {
      return
    }

    return ayahs.data as QuranAyahType[]
  }

  /**
   * Get a random quran ayah from the API
   * @param editions The editions to get
   * @param number The number of ayahs to get
   *
   * @returns The ayahs
  */
  async getRandomAyah(editions: string): Promise<QuranAyahType[] | undefined> {
    const randomAyah: number = Math.floor(Math.random() * this._totalVerse) + 1
    const ayahs = await this.getAyah(randomAyah, editions)

    if (!ayahs) return

    return ayahs
  }

}
