type HadithResponseType = {
  code: number
  message: string
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
