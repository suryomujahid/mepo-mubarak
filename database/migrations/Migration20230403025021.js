'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20230403025021 extends Migration {

  async up() {
    this.addSql('alter table `guild_notification` add column `daily_quran` integer not null default false;');
    this.addSql('alter table `guild_notification` add column `language` text not null default \'en\';');
  }

}
exports.Migration20230403025021 = Migration20230403025021;
