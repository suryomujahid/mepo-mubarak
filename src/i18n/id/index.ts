/* eslint-disable */
import type { Translation } from '../i18n-types'

const id: Translation = {
	GUARDS: {
		DISABLED_COMMAND: 'Perintah ini saat ini dinonaktifkan.',
		MAINTENANCE: 'Bot ini saat ini dalam mode perawatan.',
		GUILD_ONLY: 'Perintah ini hanya dapat digunakan di server.',
		NSFW: 'Astagfirullah, kenapa mau nge-NSFW di server ini?',
	},
	ERRORS: {
		UNKNOWN: 'Terjadi kesalahan yang tidak diketahui.',
	},
	SHARED: {
		NO_COMMAND_DESCRIPTION: 'Tidak ada deskripsi yang disediakan.',
	},
	COMMANDS: {
		INVITE: {
			DESCRIPTION: 'Undang bot ke servermu!',
			EMBED: {
				TITLE: 'Undang saya ke servermu!',
				DESCRIPTION: '[Klik disini]({link}) untuk mengundang saya!',
			},
		},
		PREFIX: {
			NAME: 'prefix',
			DESCRIPTION: 'Ubah prefix bot.',
			OPTIONS: {
				PREFIX: {
					NAME: 'prefix_baru',
					DESCRIPTION: 'Prefix baru dari bot.',
				},
			},
			EMBED: {
				DESCRIPTION: 'Prefix berhasil diubah menjadi `{prefix}`.',
			},
		},
		MAINTENANCE: {
			DESCRIPTION: 'Atur mode perawatan bot.',
			EMBED: {
				DESCRIPTION: 'Mode perawatan berhasil diubah menjadi `{state}`.',
			},
		},
		STATS: {
			DESCRIPTION: 'Dapatkan beberapa statistik tentang bot.',
			HEADERS: {
				COMMANDS: 'Perintah',
				GUILDS: 'Server',
				ACTIVE_USERS: 'Pengguna Aktif',
				USERS: 'Pengguna',
			},
		},
		HELP: {
			DESCRIPTION: 'Dapatkan bantuan global tentang bot dan perintahnya',
			EMBED: {
				TITLE: 'Panel bantuan',
				CATEGORY_TITLE: 'Perintah {category}',
			},
			SELECT_MENU: {
				TITLE: 'Pilih kategori',
				CATEGORY_DESCRIPTION: 'Perintah {category}',
			},
		},
		PING: {
			DESCRIPTION: 'Pong!',
			MESSAGE: '{member} Pong! Perjalanan pesan ini memakan waktu {time}ms.{heartbeat}',
		},
		RANDOM_HADITH: {
			DESCRIPTION: 'Dapatkan hadist secara acak.',
			EMBED: {
				TITLE: 'Random Hadist',
				DESCRIPTION: '{hadith}',
				FOOTER: '{rawi} - {no}',
			},
			SELECT_MENU: {
				TITLE: 'Pilih rawi',
				DESCRIPTION: 'Pilih rawi untuk mendapatkan hadist secara acak. (opsional)',
			},
			ERRORS: {
				NO_HADITH: 'Tidak ada hadist yang ditemukan.',
			},
		},
		ALL_RAWI: {
			DESCRIPTION: 'Daftar rawi.',
			EMBED: {
				TITLE: 'Daftar Rawi',
				DESCRIPTION: '{rawis}',
			},
			ERRORS: {
				NO_RAWI: 'Tidak ada rawi yang ditemukan.',
			},
		},
		DAILY_HADITH: {
			TITLE: 'Hadist Hari Ini',
			DESCRIPTION: 'Aktifkan notifikasi hadist harian setiap jam 12 siang di channel ini.',
			EMBED: {
				ENABLED: 'Notifikasi hadist harian diaktifkan di channel ini.',
				DISABLED: 'Notifikasi hadist harian dinonaktifkan di channel ini.',
			},
			ERRORS: {
				NO_CHANNEL: 'Kamu harus berada di channel untuk menggunakan perintah ini.',
				ALREADY_ENABLED: 'Kamu sudah memiliki notifikasi hadist harian di channel ini.',
				MUST_BE_ENABLED: 'Notifikasi hadist harian harus diaktifkan di channel ini untuk menonaktifkannya.',
			},
		},
	},
}

export default id
