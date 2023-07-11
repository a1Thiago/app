export interface GameFromRapidApi {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: {
    id: number;
    image: string;
  }[];
}

export default async function fetchGamesImage(id: number): Promise<GameFromRapidApi | null> {
  try {
    const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
      cache: 'force-cache',
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '0fb829c3d8mshf90787035bd201ap1925e0jsnaa6594e21ed9',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
      },
    })

    if (!response.ok) {
      console.error(response)
    }

    const data = await response.json()

    return data as GameFromRapidApi

  } catch (error: any) {
    console.error(error)
    return null
  }
}

