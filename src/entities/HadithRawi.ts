import { Entity, EntityRepositoryType, PrimaryKey, Property } from "@mikro-orm/core"
import { EntityRepository } from "@mikro-orm/sqlite"

// ===========================================
// ================= Entity ==================
// ===========================================

@Entity({ customRepository: () => HadithRawiRepository })
export class HadithRawi {

  [EntityRepositoryType]?: HadithRawiRepository

  @PrimaryKey()
  id: string

  @Property()
  available: number

  @Property()
  createdAt: Date = new Date()

  @Property()
  updatedAt: Date = new Date()
}

// ===========================================
// =========== Custom Repository =============
// ===========================================
export class HadithRawiRepository extends EntityRepository<HadithRawi> {

}
