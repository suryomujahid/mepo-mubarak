// const rawi = {
//   id: ["abu-daud", "ahmad", "bukhari", "darimi", "ibnu-majah", "malik", "muslim", "nasai", "tirmidzi"],
//   available: [3000, 20, 2000, 1000, 2000, 500, 1500, 4000, 3625]
// }

type HadithResponseType = {
  code: number
  message: string
  // data is optional because the API sometimes returns an empty array
  data?: HadithRawiType[]
  error: boolean
}

type HadithRawiType = {
  id: string
  name?: string
  available: number
}

type HadithType = {
  id: string
  name: string
  available: number
  contents: {
    number: number
    arab: string
    id: string
  }
}
