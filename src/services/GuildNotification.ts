import { GuildNotification as GuildNotificationEntity } from "@entities";
import { EntityRepository } from "@mikro-orm/core";
import { Client } from "discord.js";
import { delay, inject, singleton } from "tsyringe";
import { Database, Logger } from "@services";
import { GuildNotificationFilterType, GuildNotificationType } from "src/utils/types/guildNotification";

@singleton()
export class GuildNotification {

  private guildNotificationRepo: EntityRepository<GuildNotificationEntity>

  constructor(
    private db: Database,
    private logger: Logger,
    @inject(delay(() => Client)) private client: Client,
  ) {
    this.guildNotificationRepo = this.db.em.getRepository(GuildNotificationEntity)
    this.logger
  }

  /**
   * Get all guild notification from the database
   * @param filter The filter to get
   */
  async getAll(filter?: GuildNotificationFilterType): Promise<GuildNotificationType[] | undefined> {
    try {
      const guildNotifications = await this.guildNotificationRepo.find(filter ?? {})

      if (!guildNotifications) return

      return guildNotifications as GuildNotificationType[]
    } catch (err) {
      this.logger.logError(`GuildNotification: Get all guild notification failed: ` + err, "Exception")
      return
    }
  }

  /**
   * Get a guild notification from the database
   * @param id The guild notification id
   */
  async get(id: string): Promise<GuildNotificationType | undefined> {
    try {
      const guildNotification = await this.guildNotificationRepo.findOne({ id })

      if (!guildNotification) return

      return guildNotification as GuildNotificationType
    } catch (err) {
      this.logger.logError(`GuildNotification: Get guild notification failed: ` + err, "Exception")
      return
    }
  }

  /**
   * Create a guild notification
   * @param parameter The parameter to create
   */
  async create(parameter: GuildNotificationType): Promise<boolean> {
    try {
      parameter.language = parameter.language ?? "id"
      await this.guildNotificationRepo.persistAndFlush(parameter)
      return true
    } catch (err) {
      this.logger.logError(`GuildNotification: Create guild notification failed: ` + err, "Exception")
      return false
    }
  }

  /**
   * Update a guild notification
   * @param id The guild notification id
   * @param parameter The parameter to update
   */
  async update(id: string, parameter: GuildNotificationType): Promise<boolean> {
    try {
      const guildNotification = await this.guildNotificationRepo.findOne({ id })
      if (!guildNotification) return false

      this.guildNotificationRepo.assign(guildNotification, parameter)
      await this.guildNotificationRepo.flush()
      return true
    } catch (err) {
      this.logger.logError(`GuildNotification: Update guild notification failed: ` + err, "Exception")
      return false
    }
  }

  /**
   * Delete a guild notification
   * @param id The guild notification id
   */
  async delete(id: string): Promise<boolean> {
    try {
      await this.guildNotificationRepo.removeAndFlush({ id })
      return true
    } catch (err) {
      this.logger.logError(`GuildNotification: Delete guild notification failed: ` + err, "Exception")
      return false
    }
  }
}