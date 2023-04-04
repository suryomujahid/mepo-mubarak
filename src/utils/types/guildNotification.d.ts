import { Locales } from "@i18n"

type GuildNotificationType = {
  id: string
  channelId: string
  dailyHadith?: boolean
  dailyQuran?: boolean
  language: Locales
  createdAt?: Date
  updatedAt?: Date
}

type GuildNotificationFilterType = {
  channelId?: string
  dailyHadith?: boolean
  dailyQuran?: boolean
  language?: Locales
  createdAt?: Date
  updatedAt?: Date
}