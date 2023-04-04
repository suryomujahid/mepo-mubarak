'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230403084521 extends Migration {

  async up() {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter473` (`id` text NOT NULL, `channel_id` text NOT NULL, `daily_hadith` integer NOT NULL DEFAULT false, `created_at` datetime NOT NULL, `daily_quran` integer NOT NULL DEFAULT false, `language` text NOT NULL DEFAULT \'id\', PRIMARY KEY (`id`));');
    this.addSql('INSERT INTO "_knex_temp_alter473" SELECT * FROM "guild_notification";;');
    this.addSql('DROP TABLE "guild_notification";');
    this.addSql('ALTER TABLE "_knex_temp_alter473" RENAME TO "guild_notification";');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
exports.Migration20230403084521 = Migration20230403084521;
