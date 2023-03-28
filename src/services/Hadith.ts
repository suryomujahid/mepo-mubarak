import { GuildNotification, HadithRawi } from "@entities"
import { EntityRepository } from "@mikro-orm/core"
import { Client } from "discord.js"
import { delay, inject, singleton } from "tsyringe"
import { Database, Logger } from "@services"
import { Schedule } from "@decorators"

@singleton()
export class Hadith {

  private hadithRawiRepo: EntityRepository<HadithRawi>

  constructor(
    private db: Database,
    private logger: Logger,
    @inject(delay(() => Client)) private client: Client,
  ) {
    this.hadithRawiRepo = this.db.em.getRepository(HadithRawi)
    this.logger
  }

  /**
   * Get all hadith rawi from the database
   *
   */
  async getAllRawi(rawi?: string): Promise<HadithRawi[] | undefined> {

    const rawis = rawi ? await this.hadithRawiRepo.find({ id: rawi }) : await this.hadithRawiRepo.findAll()

    if (!rawis) return

    return rawis
  }

  /**
   * Get a hadith rawi from the database
   * @param id The rawi id
   */
  async getRawi(id: string): Promise<HadithRawi | undefined> {

    const rawi = await this.hadithRawiRepo.findOne({ id })

    if (!rawi) return

    return rawi
  }

  /**
   * Schedule every week to get hadith rawi from the API and save it to the database
   */
  @Schedule('0 0 * * 0')
  async updateRawi(): Promise<void> {
    this.logger.log(`Schedule: Update hadith rawi started`)

    const rawi: HadithResponseType = await fetch(process.env.HADITH_BASE_URL + '/books')
      .then(res => res.json())
      .catch(err => err)

    if (!rawi || !rawi.data || rawi.error) {
      this.logger.logError(`Schedule: Update hadith rawi update failed: ` + rawi, "Exception")
      return
    }

    try {
      for (const rawiData of rawi.data) {
        const rawiEntity = await this.getRawi(rawiData.id)
        if (rawiEntity) {
          rawiEntity.available = rawiData.available
          await this.hadithRawiRepo.persistAndFlush(rawiEntity)
        } else {
          const newRawiEntity = new HadithRawi()
          newRawiEntity.id = rawiData.id
          newRawiEntity.available = rawiData.available
          await this.hadithRawiRepo.persistAndFlush(newRawiEntity)
        }
      }
    } catch (err) {
      this.logger.logError(`Schedule: Update hadith rawi failed: ` + err, "Exception")
      return
    }

    const rawiIds = rawi.data.map(rawi => rawi.id)
    this.logger.log(`Schedule: Hadith rawi updated: ` + rawiIds.join(`,`))
  }

  /**
   * Get a hadith from the API
   * @param id The rawi id
   * @param number The number of hadith
   *
   * @returns The hadith
  */
  async getHadith(id: string, number: number): Promise<HadithType | undefined> {

    const rawi = await this.getRawi(id)

    if (!rawi) return undefined
    if (number > rawi.available) {
      throw new Error(`The number of hadith is greater than the available number of hadith`)
    }

    const hadith: HadithType = await fetch(process.env.HADITH_BASE_URL + `/books/${id}/${number}`)
      .then(res => res.json())
      .then(res => res.data)
      .catch(err => undefined)

    return hadith
  }

  /**
   * Get a random hadith from the API
   * @param id The rawi id
   *
   * @returns The hadith
  */
  async getRandomHadith(rawi?: string): Promise<HadithType | undefined> {

    const rawis: HadithRawiType[] | undefined = await this.getAllRawi(rawi ?? undefined)
    if (!rawis || rawis.length === 0) return

    const randomRawi = rawis[Math.floor(Math.random() * rawis.length)]
    const randomHadith = await this.getHadith(randomRawi.id, Math.floor(Math.random() * randomRawi.available) + 1)

    return randomHadith
  }
}
