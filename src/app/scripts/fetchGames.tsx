export interface Game {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export default async function fetchGames(): Promise<Game[]> {
  try {
    const abortController = new AbortController()
    const { signal } = abortController

    const timeoutId = setTimeout(() => {
      abortController.abort()
      throw new Error("O servidor demorou para responder, tente mais tarde.")
    }, 5000)

    const response = await fetch(
      "https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/",
      {
        cache: "no-store",
        headers: { "dev-email-address": "contato@a1th.dev" },
        signal,
      }
    )

    clearTimeout(timeoutId)

    if (!response.ok) {

      const errors = [500, 502, 503, 504, 507, 508, 509]

      if (errors.includes(response.status)) {
        throw new Error(
          `O servidor falhou em responder, tente recarregar a página. Status (${response.status})`
        )
      } else {
        throw new Error(
          `O servidor não conseguiu responder por agora, tente novamente mais tarde. Status (${response.status})`
        )
      }
    }

    const data = await response.json()

    return data as Game[]

  } catch (error: any) {

    if (error.name === "AbortError") {
      throw new Error('O servidor demorou para responder, tente mais tarde.')
    } else {
      throw new Error(error.message)
    }

  }
}



// const publishers = games.map((game: any) => game.publisher)
//   const uniquePublishers = publishers.filter((publisher: any, index: any, self: any) => self.indexOf(publisher) === index)

// const genres = games.map((game: any) => game.genre)
// const uniqueGenres = genres.filter((genre: any, index: any, self: any) => self.indexOf(genre) === index)

//   console.log(uniquePublishers)