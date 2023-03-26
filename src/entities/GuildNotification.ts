import { Entity, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core"
import { EntityRepository } from "@mikro-orm/sqlite"

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity({ customRepository: () => GuildNotificationRepository })
export class GuildNotification {

    [EntityRepositoryType]?: GuildNotificationRepository

    @PrimaryKey({ autoincrement: false })
    id!: string

    @Property()
    channelId: string

    @Property()
    dailyHadith: boolean = false

    @Property()
    createdAt: Date = new Date()
}

// ===========================================
// =========== Custom Repository =============
// ===========================================
export class GuildNotificationRepository extends EntityRepository<GuildNotification> {

}
