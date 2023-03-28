/* eslint-disable */
import type { BaseTranslation } from '../i18n-types'

const en: BaseTranslation = {
	GUARDS: {
		DISABLED_COMMAND: 'This command is currently disabled.',
		MAINTENANCE: 'This bot is currently in maintenance mode.',
		GUILD_ONLY: 'This command can only be used in a server.',
		NSFW: 'Why are you trying to use this command in a non-NSFW channel?',
	},
	ERRORS: {
		UNKNOWN: 'An unknown error occurred.',
	},
	SHARED: {
		NO_COMMAND_DESCRIPTION: 'No description provided.',
	},
	COMMANDS: {
		INVITE: {
			DESCRIPTION: 'Invite the bot to your server!',
			EMBED: {
				TITLE: 'Invite me on your server!',
				DESCRIPTION: '[Click here]({link}) to invite me!',
			},
		},
		PREFIX: {
			NAME: 'prefix',
			DESCRIPTION: 'Change the prefix of the bot.',
			OPTIONS: {
				PREFIX: {
					NAME: 'new_prefix',
					DESCRIPTION: 'The new prefix of the bot.',
				},
			},
			EMBED: {
				DESCRIPTION: 'Prefix changed to `{prefix:string}`.',
			},
		},
		MAINTENANCE: {
			DESCRIPTION: 'Set the maintenance mode of the bot.',
			EMBED: {
				DESCRIPTION: 'Maintenance mode set to `{state:string}`.',
			},
		},
		STATS: {
			DESCRIPTION: 'Get some stats about the bot.',
			HEADERS: {
				COMMANDS: 'Commands',
				GUILDS: 'Guild',
				ACTIVE_USERS: 'Active Users',
				USERS: 'Users',
			},
		},
		HELP: {
			DESCRIPTION: 'Get global help about the bot and its commands',
			EMBED: {
				TITLE: 'Help panel',
				CATEGORY_TITLE: '{category:string} Commands',
			},
			SELECT_MENU: {
				TITLE: 'Select a category',
				CATEGORY_DESCRIPTION: '{category:string} commands',
			},
		},
		PING: {
			DESCRIPTION: 'Pong!',
			MESSAGE: '{member:string} Pong! The message round-trip took {time:number}ms.{heartbeat:string}',
		},
		RANDOM_HADITH: {
			DESCRIPTION: 'Get a random hadith.',
			EMBED: {
				TITLE: 'Random Hadith',
				DESCRIPTION: '{hadith:string}',
				FOOTER: '{rawi:string} - {no:number}',
			},
			SELECT_MENU: {
				TITLE: 'Select a rawi',
				DESCRIPTION: 'Select a rawi to get a random hadith from. (optional)',
			},
			ERRORS: {
				NO_HADITH: 'No hadith found.',
			},
		},
		ALL_RAWI: {
			DESCRIPTION: 'List of rawi.',
			EMBED: {
				TITLE: 'List of Rawi',
				DESCRIPTION: '{rawis}',
			},
			ERRORS: {
				NO_RAWI: 'No rawi found.',
			},
		},
		DAILY_HADITH: {
			TITLE: 'Hadith of the day',
			DESCRIPTION: 'Enable daily hadith notification at 12 PM in this channel.',
			EMBED: {
				ENABLED: 'Daily hadith notification enabled on this channel.',
				DISABLED: 'Daily hadith notification disabled on this channel.',
			},
			ERRORS: {
				NO_CHANNEL: 'You must be in a channel to use this command.',
				ALREADY_ENABLED: 'You already have daily hadith notification enabled on this channel.',
				MUST_BE_ENABLED: 'Daily hadith notification must be enabled on this channel to disable it.',
			},
		},
	},
}

export default en
