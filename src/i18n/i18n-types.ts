// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n'

export type BaseTranslation = BaseTranslationType
export type BaseLocale = 'en'

export type Locales =
	| 'en'
	| 'id'

export type Translation = RootTranslation

export type Translations = RootTranslation

type RootTranslation = {
	GUARDS: {
		/**
		 * T​h​i​s​ ​c​o​m​m​a​n​d​ ​i​s​ ​c​u​r​r​e​n​t​l​y​ ​d​i​s​a​b​l​e​d​.
		 */
		DISABLED_COMMAND: string
		/**
		 * T​h​i​s​ ​b​o​t​ ​i​s​ ​c​u​r​r​e​n​t​l​y​ ​i​n​ ​m​a​i​n​t​e​n​a​n​c​e​ ​m​o​d​e​.
		 */
		MAINTENANCE: string
		/**
		 * T​h​i​s​ ​c​o​m​m​a​n​d​ ​c​a​n​ ​o​n​l​y​ ​b​e​ ​u​s​e​d​ ​i​n​ ​a​ ​s​e​r​v​e​r​.
		 */
		GUILD_ONLY: string
		/**
		 * W​h​y​ ​a​r​e​ ​y​o​u​ ​t​r​y​i​n​g​ ​t​o​ ​u​s​e​ ​t​h​i​s​ ​c​o​m​m​a​n​d​ ​i​n​ ​a​ ​n​o​n​-​N​S​F​W​ ​c​h​a​n​n​e​l​?
		 */
		NSFW: string
	}
	ERRORS: {
		/**
		 * A​n​ ​u​n​k​n​o​w​n​ ​e​r​r​o​r​ ​o​c​c​u​r​r​e​d​.
		 */
		UNKNOWN: string
	}
	SHARED: {
		/**
		 * N​o​ ​d​e​s​c​r​i​p​t​i​o​n​ ​p​r​o​v​i​d​e​d​.
		 */
		NO_COMMAND_DESCRIPTION: string
	}
	COMMANDS: {
		INVITE: {
			/**
			 * I​n​v​i​t​e​ ​t​h​e​ ​b​o​t​ ​t​o​ ​y​o​u​r​ ​s​e​r​v​e​r​!
			 */
			DESCRIPTION: string
			EMBED: {
				/**
				 * I​n​v​i​t​e​ ​m​e​ ​o​n​ ​y​o​u​r​ ​s​e​r​v​e​r​!
				 */
				TITLE: string
				/**
				 * [​C​l​i​c​k​ ​h​e​r​e​]​(​{​l​i​n​k​}​)​ ​t​o​ ​i​n​v​i​t​e​ ​m​e​!
				 * @param {unknown} link
				 */
				DESCRIPTION: RequiredParams<'link'>
			}
		}
		PREFIX: {
			/**
			 * p​r​e​f​i​x
			 */
			NAME: string
			/**
			 * C​h​a​n​g​e​ ​t​h​e​ ​p​r​e​f​i​x​ ​o​f​ ​t​h​e​ ​b​o​t​.
			 */
			DESCRIPTION: string
			OPTIONS: {
				PREFIX: {
					/**
					 * n​e​w​_​p​r​e​f​i​x
					 */
					NAME: string
					/**
					 * T​h​e​ ​n​e​w​ ​p​r​e​f​i​x​ ​o​f​ ​t​h​e​ ​b​o​t​.
					 */
					DESCRIPTION: string
				}
			}
			EMBED: {
				/**
				 * P​r​e​f​i​x​ ​c​h​a​n​g​e​d​ ​t​o​ ​`​{​p​r​e​f​i​x​}​`​.
				 * @param {string} prefix
				 */
				DESCRIPTION: RequiredParams<'prefix'>
			}
		}
		MAINTENANCE: {
			/**
			 * S​e​t​ ​t​h​e​ ​m​a​i​n​t​e​n​a​n​c​e​ ​m​o​d​e​ ​o​f​ ​t​h​e​ ​b​o​t​.
			 */
			DESCRIPTION: string
			EMBED: {
				/**
				 * M​a​i​n​t​e​n​a​n​c​e​ ​m​o​d​e​ ​s​e​t​ ​t​o​ ​`​{​s​t​a​t​e​}​`​.
				 * @param {string} state
				 */
				DESCRIPTION: RequiredParams<'state'>
			}
		}
		STATS: {
			/**
			 * G​e​t​ ​s​o​m​e​ ​s​t​a​t​s​ ​a​b​o​u​t​ ​t​h​e​ ​b​o​t​.
			 */
			DESCRIPTION: string
			HEADERS: {
				/**
				 * C​o​m​m​a​n​d​s
				 */
				COMMANDS: string
				/**
				 * G​u​i​l​d
				 */
				GUILDS: string
				/**
				 * A​c​t​i​v​e​ ​U​s​e​r​s
				 */
				ACTIVE_USERS: string
				/**
				 * U​s​e​r​s
				 */
				USERS: string
			}
		}
		HELP: {
			/**
			 * G​e​t​ ​g​l​o​b​a​l​ ​h​e​l​p​ ​a​b​o​u​t​ ​t​h​e​ ​b​o​t​ ​a​n​d​ ​i​t​s​ ​c​o​m​m​a​n​d​s
			 */
			DESCRIPTION: string
			EMBED: {
				/**
				 * H​e​l​p​ ​p​a​n​e​l
				 */
				TITLE: string
				/**
				 * {​c​a​t​e​g​o​r​y​}​ ​C​o​m​m​a​n​d​s
				 * @param {string} category
				 */
				CATEGORY_TITLE: RequiredParams<'category'>
			}
			SELECT_MENU: {
				/**
				 * S​e​l​e​c​t​ ​a​ ​c​a​t​e​g​o​r​y
				 */
				TITLE: string
				/**
				 * {​c​a​t​e​g​o​r​y​}​ ​c​o​m​m​a​n​d​s
				 * @param {string} category
				 */
				CATEGORY_DESCRIPTION: RequiredParams<'category'>
			}
		}
		PING: {
			/**
			 * P​o​n​g​!
			 */
			DESCRIPTION: string
			/**
			 * {​m​e​m​b​e​r​}​ ​P​o​n​g​!​ ​T​h​e​ ​m​e​s​s​a​g​e​ ​r​o​u​n​d​-​t​r​i​p​ ​t​o​o​k​ ​{​t​i​m​e​}​m​s​.​{​h​e​a​r​t​b​e​a​t​}
			 * @param {string} heartbeat
			 * @param {string} member
			 * @param {number} time
			 */
			MESSAGE: RequiredParams<'heartbeat' | 'member' | 'time'>
		}
		RANDOM_HADITH: {
			/**
			 * G​e​t​ ​a​ ​r​a​n​d​o​m​ ​h​a​d​i​t​h​.
			 */
			DESCRIPTION: string
			EMBED: {
				/**
				 * R​a​n​d​o​m​ ​H​a​d​i​t​h
				 */
				TITLE: string
				/**
				 * {​h​a​d​i​t​h​}
				 * @param {string} hadith
				 */
				DESCRIPTION: RequiredParams<'hadith'>
				/**
				 * {​r​a​w​i​}​ ​-​ ​{​n​o​}
				 * @param {number} no
				 * @param {string} rawi
				 */
				FOOTER: RequiredParams<'no' | 'rawi'>
			}
			SELECT_MENU: {
				/**
				 * S​e​l​e​c​t​ ​a​ ​r​a​w​i
				 */
				TITLE: string
				/**
				 * S​e​l​e​c​t​ ​a​ ​r​a​w​i​ ​t​o​ ​g​e​t​ ​a​ ​r​a​n​d​o​m​ ​h​a​d​i​t​h​ ​f​r​o​m​.​ ​(​o​p​t​i​o​n​a​l​)
				 */
				DESCRIPTION: string
			}
			ERRORS: {
				/**
				 * N​o​ ​h​a​d​i​t​h​ ​f​o​u​n​d​.
				 */
				NO_HADITH: string
			}
		}
		ALL_RAWI: {
			/**
			 * L​i​s​t​ ​o​f​ ​r​a​w​i​.
			 */
			DESCRIPTION: string
			EMBED: {
				/**
				 * L​i​s​t​ ​o​f​ ​R​a​w​i
				 */
				TITLE: string
				/**
				 * {​r​a​w​i​s​}
				 * @param {unknown} rawis
				 */
				DESCRIPTION: RequiredParams<'rawis'>
			}
			ERRORS: {
				/**
				 * N​o​ ​r​a​w​i​ ​f​o​u​n​d​.
				 */
				NO_RAWI: string
			}
		}
		DAILY_HADITH: {
			/**
			 * H​a​d​i​t​h​ ​o​f​ ​t​h​e​ ​d​a​y
			 */
			TITLE: string
			/**
			 * E​n​a​b​l​e​ ​d​a​i​l​y​ ​h​a​d​i​t​h​ ​n​o​t​i​f​i​c​a​t​i​o​n​ ​a​t​ ​1​2​ ​P​M​ ​i​n​ ​t​h​i​s​ ​c​h​a​n​n​e​l​.
			 */
			DESCRIPTION: string
			EMBED: {
				/**
				 * D​a​i​l​y​ ​h​a​d​i​t​h​ ​n​o​t​i​f​i​c​a​t​i​o​n​ ​e​n​a​b​l​e​d​ ​o​n​ ​t​h​i​s​ ​c​h​a​n​n​e​l​.
				 */
				ENABLED: string
				/**
				 * D​a​i​l​y​ ​h​a​d​i​t​h​ ​n​o​t​i​f​i​c​a​t​i​o​n​ ​d​i​s​a​b​l​e​d​ ​o​n​ ​t​h​i​s​ ​c​h​a​n​n​e​l​.
				 */
				DISABLED: string
			}
			ERRORS: {
				/**
				 * Y​o​u​ ​m​u​s​t​ ​b​e​ ​i​n​ ​a​ ​c​h​a​n​n​e​l​ ​t​o​ ​u​s​e​ ​t​h​i​s​ ​c​o​m​m​a​n​d​.
				 */
				NO_CHANNEL: string
				/**
				 * Y​o​u​ ​c​a​n​ ​o​n​l​y​ ​e​n​a​b​l​e​ ​d​a​i​l​y​ ​h​a​d​i​t​h​ ​n​o​t​i​f​i​c​a​t​i​o​n​ ​o​n​ ​1​ ​c​h​a​n​n​e​l​.
				 */
				ALREADY_ENABLED: string
			}
		}
	}
}

export type TranslationFunctions = {
	GUARDS: {
		/**
		 * This command is currently disabled.
		 */
		DISABLED_COMMAND: () => LocalizedString
		/**
		 * This bot is currently in maintenance mode.
		 */
		MAINTENANCE: () => LocalizedString
		/**
		 * This command can only be used in a server.
		 */
		GUILD_ONLY: () => LocalizedString
		/**
		 * Why are you trying to use this command in a non-NSFW channel?
		 */
		NSFW: () => LocalizedString
	}
	ERRORS: {
		/**
		 * An unknown error occurred.
		 */
		UNKNOWN: () => LocalizedString
	}
	SHARED: {
		/**
		 * No description provided.
		 */
		NO_COMMAND_DESCRIPTION: () => LocalizedString
	}
	COMMANDS: {
		INVITE: {
			/**
			 * Invite the bot to your server!
			 */
			DESCRIPTION: () => LocalizedString
			EMBED: {
				/**
				 * Invite me on your server!
				 */
				TITLE: () => LocalizedString
				/**
				 * [Click here]({link}) to invite me!
				 */
				DESCRIPTION: (arg: { link: unknown }) => LocalizedString
			}
		}
		PREFIX: {
			/**
			 * prefix
			 */
			NAME: () => LocalizedString
			/**
			 * Change the prefix of the bot.
			 */
			DESCRIPTION: () => LocalizedString
			OPTIONS: {
				PREFIX: {
					/**
					 * new_prefix
					 */
					NAME: () => LocalizedString
					/**
					 * The new prefix of the bot.
					 */
					DESCRIPTION: () => LocalizedString
				}
			}
			EMBED: {
				/**
				 * Prefix changed to `{prefix}`.
				 */
				DESCRIPTION: (arg: { prefix: string }) => LocalizedString
			}
		}
		MAINTENANCE: {
			/**
			 * Set the maintenance mode of the bot.
			 */
			DESCRIPTION: () => LocalizedString
			EMBED: {
				/**
				 * Maintenance mode set to `{state}`.
				 */
				DESCRIPTION: (arg: { state: string }) => LocalizedString
			}
		}
		STATS: {
			/**
			 * Get some stats about the bot.
			 */
			DESCRIPTION: () => LocalizedString
			HEADERS: {
				/**
				 * Commands
				 */
				COMMANDS: () => LocalizedString
				/**
				 * Guild
				 */
				GUILDS: () => LocalizedString
				/**
				 * Active Users
				 */
				ACTIVE_USERS: () => LocalizedString
				/**
				 * Users
				 */
				USERS: () => LocalizedString
			}
		}
		HELP: {
			/**
			 * Get global help about the bot and its commands
			 */
			DESCRIPTION: () => LocalizedString
			EMBED: {
				/**
				 * Help panel
				 */
				TITLE: () => LocalizedString
				/**
				 * {category} Commands
				 */
				CATEGORY_TITLE: (arg: { category: string }) => LocalizedString
			}
			SELECT_MENU: {
				/**
				 * Select a category
				 */
				TITLE: () => LocalizedString
				/**
				 * {category} commands
				 */
				CATEGORY_DESCRIPTION: (arg: { category: string }) => LocalizedString
			}
		}
		PING: {
			/**
			 * Pong!
			 */
			DESCRIPTION: () => LocalizedString
			/**
			 * {member} Pong! The message round-trip took {time}ms.{heartbeat}
			 */
			MESSAGE: (arg: { heartbeat: string, member: string, time: number }) => LocalizedString
		}
		RANDOM_HADITH: {
			/**
			 * Get a random hadith.
			 */
			DESCRIPTION: () => LocalizedString
			EMBED: {
				/**
				 * Random Hadith
				 */
				TITLE: () => LocalizedString
				/**
				 * {hadith}
				 */
				DESCRIPTION: (arg: { hadith: string }) => LocalizedString
				/**
				 * {rawi} - {no}
				 */
				FOOTER: (arg: { no: number, rawi: string }) => LocalizedString
			}
			SELECT_MENU: {
				/**
				 * Select a rawi
				 */
				TITLE: () => LocalizedString
				/**
				 * Select a rawi to get a random hadith from. (optional)
				 */
				DESCRIPTION: () => LocalizedString
			}
			ERRORS: {
				/**
				 * No hadith found.
				 */
				NO_HADITH: () => LocalizedString
			}
		}
		ALL_RAWI: {
			/**
			 * List of rawi.
			 */
			DESCRIPTION: () => LocalizedString
			EMBED: {
				/**
				 * List of Rawi
				 */
				TITLE: () => LocalizedString
				/**
				 * {rawis}
				 */
				DESCRIPTION: (arg: { rawis: unknown }) => LocalizedString
			}
			ERRORS: {
				/**
				 * No rawi found.
				 */
				NO_RAWI: () => LocalizedString
			}
		}
		DAILY_HADITH: {
			/**
			 * Hadith of the day
			 */
			TITLE: () => LocalizedString
			/**
			 * Enable daily hadith notification at 12 PM in this channel.
			 */
			DESCRIPTION: () => LocalizedString
			EMBED: {
				/**
				 * Daily hadith notification enabled on this channel.
				 */
				ENABLED: () => LocalizedString
				/**
				 * Daily hadith notification disabled on this channel.
				 */
				DISABLED: () => LocalizedString
			}
			ERRORS: {
				/**
				 * You must be in a channel to use this command.
				 */
				NO_CHANNEL: () => LocalizedString
				/**
				 * You can only enable daily hadith notification on 1 channel.
				 */
				ALREADY_ENABLED: () => LocalizedString
			}
		}
	}
}

export type Formatters = {}
