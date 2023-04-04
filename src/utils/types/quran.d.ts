type QuranResponseType = {
  code: number
  status: string
  data?: QuranType | QuranSurahType[] | QuranSurahType | QuranEditionType | QuranAyahType[]
}

type QuranType = {
  surahs: QuranSurahType[]
  editions: QuranEditionType
}

type QuranSurahType = {
  number: number
  name: string
  englishName: string
  englishNameTranslation: string
  numberOfAyahs: number
  revelationType: string
  ayahs?: QuranAyahType[]
}

type QuranAyahType = {
  number: number
  numberInSurah: number
  juz: number
  manzil: number
  ruku: number
  hizbQuarter: number
  sajda: boolean
  text: string
  surah?: QuranSurahType
  edition?: QuranEditionType
}

type QuranEditionType = {
  identifier: string
  language: string
  name: string
  englishName: string
  format: string
  type: string
}
