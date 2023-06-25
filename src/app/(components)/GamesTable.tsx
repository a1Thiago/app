'use client'
import fetchGames, { Game } from '../scripts/fetchGames'
import { useEffect, useState } from 'react'
import RenderGameCards from './gameCard/RenderGameCards'
import LoadingCircle from './LoadingCircle'
import Button from './Button'

import GenresFilter from './GenresFilter'
import ErrorMessage from './ErrorMessage'
import SearchInput from './SearchInput'



export default function GamesTable() {

  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [pageSize, setPageSize] = useState<number>(15)

  const [searchValue, setSearchValue] = useState<string>('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  useEffect(() => {
    setGames(gamesMock)
    setIsLoading(false)
    // fetchGames()
    //   .then((games: Game[]) => setGames(games))
    //   .catch(error => setError(error.message))
    //   .finally(() => setIsLoading(false))
  }, [])


  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { value, checked } = event.target

    setSelectedGenres((prevSelectedGenres) => {
      if (checked) {
        return [...prevSelectedGenres, value.toLowerCase()]
      } else {
        return prevSelectedGenres.filter((genre) => genre !== value.toLowerCase())
      }
    })
  }

  const loadMoreItems = () => {
    setPageSize(oldValue => oldValue + 15)
  }

  const filteredGamesBySearch = games.filter((game) => {

    const games = game.title.toLowerCase().includes(searchValue.toLowerCase())

    if (games) {
      return games
    }// else { //by description
    //   return game.short_description.toLowerCase().includes(searchValue.toLowerCase())
    // }
  }
  )

  const filteredGamesByGenre = filteredGamesBySearch?.filter((game) => {
    if (selectedGenres.length < 1) {
      return game
    } else {
      return selectedGenres.includes(game.genre.toLowerCase())
    }
  })

  if (error) return <ErrorMessage error={error} />

  return (

    <section className={`py-4 grid gap-8 ${isLoading && 'cursor-wait'}`}>

      {!isLoading && !error &&
        (<div className='grid gap-4 justify-items-center text-center'>

          <SearchInput
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <GenresFilter
            games={games}
            selectedGenres={selectedGenres}
            onChange={handleGenreChange}
          />

        </div>)}

      <div className='grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-1'>
        {isLoading
          ? (
            <div className='col-span-full text-center'>
              <h3 className='mt-32 text-32 tablet:text-24 mobile:text-20 font-medium'>Carregando Jogos...</h3>
              <LoadingCircle />
            </div>)
          : (<RenderGameCards games={filteredGamesByGenre.slice(0, pageSize)} />)
        }
      </div>
      {filteredGamesByGenre.length > 0 && <Button label='Mostrar Mais' onClick={loadMoreItems} disabled={filteredGamesByGenre.length < pageSize} />}
    </section >
  )
}


const gamesMock = [
  {
    "id": 540,
    "title": "Overwatch 2",
    "thumbnail": "https://www.freetogame.com/g/540/thumbnail.jpg",
    "short_description": "A hero-focused first-person team shooter from Blizzard Entertainment.",
    "game_url": "https://www.freetogame.com/open/overwatch-2",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Activision Blizzard",
    "developer": "Blizzard Entertainment",
    "release_date": "2022-10-04",
    "freetogame_profile_url": "https://www.freetogame.com/overwatch-2"
  },
  {
    "id": 521,
    "title": "Diablo Immortal",
    "thumbnail": "https://www.freetogame.com/g/521/thumbnail.jpg",
    "short_description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
    "game_url": "https://www.freetogame.com/open/diablo-immortal",
    "genre": "MMOARPG",
    "platform": "PC (Windows)",
    "publisher": "Blizzard Entertainment",
    "developer": "Blizzard Entertainment",
    "release_date": "2022-06-02",
    "freetogame_profile_url": "https://www.freetogame.com/diablo-immortal"
  },
  {
    "id": 517,
    "title": "Lost Ark",
    "thumbnail": "https://www.freetogame.com/g/517/thumbnail.jpg",
    "short_description": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
    "game_url": "https://www.freetogame.com/open/lost-ark",
    "genre": "ARPG",
    "platform": "PC (Windows)",
    "publisher": "Amazon Games",
    "developer": "Smilegate RPG",
    "release_date": "2022-02-11",
    "freetogame_profile_url": "https://www.freetogame.com/lost-ark"
  },
  {
    "id": 516,
    "title": "PUBG: BATTLEGROUNDS",
    "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
    "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
    "game_url": "https://www.freetogame.com/open/pubg",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "KRAFTON, Inc.",
    "developer": "KRAFTON, Inc.",
    "release_date": "2022-01-12",
    "freetogame_profile_url": "https://www.freetogame.com/pubg"
  },
  {
    "id": 508,
    "title": "Enlisted",
    "thumbnail": "https://www.freetogame.com/g/508/thumbnail.jpg",
    "short_description": "Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted. ",
    "game_url": "https://www.freetogame.com/open/enlisted",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Gaijin Entertainment",
    "developer": "Darkflow Software",
    "release_date": "2021-04-08",
    "freetogame_profile_url": "https://www.freetogame.com/enlisted"
  },
  {
    "id": 525,
    "title": "MultiVersus",
    "thumbnail": "https://www.freetogame.com/g/525/thumbnail.jpg",
    "short_description": "The Warner Bros lineup meets Smash in Player First Games’ MultiVersus.",
    "game_url": "https://www.freetogame.com/open/multiversus",
    "genre": "Fighting",
    "platform": "PC (Windows)",
    "publisher": "Warner Bros. Games",
    "developer": "Player First Games",
    "release_date": "2022-07-19",
    "freetogame_profile_url": "https://www.freetogame.com/multiversus"
  },
  {
    "id": 475,
    "title": "Genshin Impact",
    "thumbnail": "https://www.freetogame.com/g/475/thumbnail.jpg",
    "short_description": "If you’ve been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair, then you’re going to want to check out miHoYo’s Genshin Impact.",
    "game_url": "https://www.freetogame.com/open/genshin-impact",
    "genre": "Action RPG",
    "platform": "PC (Windows)",
    "publisher": "miHoYo",
    "developer": "miHoYo",
    "release_date": "2020-09-28",
    "freetogame_profile_url": "https://www.freetogame.com/genshin-impact"
  },
  {
    "id": 523,
    "title": "Fall Guys",
    "thumbnail": "https://www.freetogame.com/g/523/thumbnail.jpg",
    "short_description": "Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms. ",
    "game_url": "https://www.freetogame.com/open/fall-guys",
    "genre": "Battle Royale",
    "platform": "PC (Windows)",
    "publisher": "Mediatonic",
    "developer": "Mediatonic",
    "release_date": "2020-08-04",
    "freetogame_profile_url": "https://www.freetogame.com/fall-guys"
  },
  {
    "id": 11,
    "title": "Neverwinter",
    "thumbnail": "https://www.freetogame.com/g/11/thumbnail.jpg",
    "short_description": "A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game. ",
    "game_url": "https://www.freetogame.com/open/neverwinter",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Perfect World Entertainment",
    "developer": "Cryptic Studios",
    "release_date": "2013-12-06",
    "freetogame_profile_url": "https://www.freetogame.com/neverwinter"
  },
  {
    "id": 515,
    "title": "Halo Infinite",
    "thumbnail": "https://www.freetogame.com/g/515/thumbnail.jpg",
    "short_description": "For the first time ever, a free-to-play Halo experience is available in the form of Halo Infinite’s multiplayer.",
    "game_url": "https://www.freetogame.com/open/halo-infinite",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Xbox Game Studios",
    "developer": "343 Industries",
    "release_date": "2021-11-15",
    "freetogame_profile_url": "https://www.freetogame.com/halo-infinite"
  },
  {
    "id": 511,
    "title": "Phantasy Star Online 2 New Genesis",
    "thumbnail": "https://www.freetogame.com/g/511/thumbnail.jpg",
    "short_description": "The legacy of Phantasy Star Online 2 continues a thousand years later!",
    "game_url": "https://www.freetogame.com/open/pso2-new-genesis",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Sega",
    "developer": "Sega",
    "release_date": "2021-06-09",
    "freetogame_profile_url": "https://www.freetogame.com/pso2-new-genesis"
  },
  {
    "id": 5,
    "title": "Crossout",
    "thumbnail": "https://www.freetogame.com/g/5/thumbnail.jpg",
    "short_description": "A post-apocalyptic MMO vehicle combat game! ",
    "game_url": "https://www.freetogame.com/open/crossout",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Targem",
    "developer": "Gaijin",
    "release_date": "2017-05-30",
    "freetogame_profile_url": "https://www.freetogame.com/crossout"
  },
  {
    "id": 9,
    "title": "World of Warships",
    "thumbnail": "https://www.freetogame.com/g/9/thumbnail.jpg",
    "short_description": "A 3D free to play naval action-themed MMO from the creators of World of Tanks! ",
    "game_url": "https://www.freetogame.com/open/world-of-warships",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Wargaming",
    "developer": "Wargaming",
    "release_date": "2015-07-02",
    "freetogame_profile_url": "https://www.freetogame.com/world-of-warships"
  },
  {
    "id": 12,
    "title": "War Thunder",
    "thumbnail": "https://www.freetogame.com/g/12/thumbnail.jpg",
    "short_description": "A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.",
    "game_url": "https://www.freetogame.com/open/war-thunder",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Gaijin Entertainment",
    "developer": "Gaijin Entertainment",
    "release_date": "2013-08-15",
    "freetogame_profile_url": "https://www.freetogame.com/war-thunder"
  },
  {
    "id": 2,
    "title": "World of Tanks",
    "thumbnail": "https://www.freetogame.com/g/2/thumbnail.jpg",
    "short_description": "If you like blowing up tanks, with a quick and intense game style you will love this game!",
    "game_url": "https://www.freetogame.com/open/world-of-tanks",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Wargaming",
    "developer": "Wargaming",
    "release_date": "2011-04-12",
    "freetogame_profile_url": "https://www.freetogame.com/world-of-tanks"
  },
  {
    "id": 529,
    "title": "Tower of Fantasy",
    "thumbnail": "https://www.freetogame.com/g/529/thumbnail.jpg",
    "short_description": "Tower of Fantasy is a 3D open-world RPG, anime-style sci-fi MMO RPG game with unique characters and beautiful open vistas!",
    "game_url": "https://www.freetogame.com/open/tower-of-fantasy",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Level Infinite",
    "developer": "Hotta Studio",
    "release_date": "2022-08-10",
    "freetogame_profile_url": "https://www.freetogame.com/tower-of-fantasy"
  },
  {
    "id": 528,
    "title": "Noah’s Heart",
    "thumbnail": "https://www.freetogame.com/g/528/thumbnail.jpg",
    "short_description": "Noah’s Heart is an open-world MMORPG game with a focus on exploration and socialization.",
    "game_url": "https://www.freetogame.com/open/noahs-heart",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Archosaur Games",
    "developer": "Archosaur Games",
    "release_date": "2022-07-28",
    "freetogame_profile_url": "https://www.freetogame.com/noahs-heart"
  },
  {
    "id": 466,
    "title": "Valorant",
    "thumbnail": "https://www.freetogame.com/g/466/thumbnail.jpg",
    "short_description": "Test your mettle in Riot Games’ character-based FPS shooter Valorant.",
    "game_url": "https://www.freetogame.com/open/valorant",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Riot Games",
    "developer": "Riot Games",
    "release_date": "2020-06-02",
    "freetogame_profile_url": "https://www.freetogame.com/valorant"
  },
  {
    "id": 467,
    "title": "Phantasy Star Online 2",
    "thumbnail": "https://www.freetogame.com/g/467/thumbnail.jpg",
    "short_description": "Welcome to ARKS, and elite task force searching dangerous planets for the corrupted Falspawn in Phantasy Star 2 Online, Sega’s popular, free-to-play sci-fi MMORPG.",
    "game_url": "https://www.freetogame.com/open/pso2",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "SEGA",
    "developer": "SEGA",
    "release_date": "2020-05-27",
    "freetogame_profile_url": "https://www.freetogame.com/pso2"
  },
  {
    "id": 452,
    "title": "Call Of Duty: Warzone",
    "thumbnail": "https://www.freetogame.com/g/452/thumbnail.jpg",
    "short_description": "A standalone free-to-play battle royale and modes accessible via Call of Duty: Modern Warfare.",
    "game_url": "https://www.freetogame.com/open/call-of-duty-warzone",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Activision",
    "developer": "Infinity Ward",
    "release_date": "2020-03-10",
    "freetogame_profile_url": "https://www.freetogame.com/call-of-duty-warzone"
  },
  {
    "id": 21,
    "title": "Destiny 2",
    "thumbnail": "https://www.freetogame.com/g/21/thumbnail.jpg",
    "short_description": "A free-to-play multiplayer Sci-Fi MMOFPS from Bungie.",
    "game_url": "https://www.freetogame.com/open/destiny-2",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Bungie",
    "developer": "Bungie",
    "release_date": "2019-10-01",
    "freetogame_profile_url": "https://www.freetogame.com/destiny-2"
  },
  {
    "id": 1,
    "title": "Dauntless",
    "thumbnail": "https://www.freetogame.com/g/1/thumbnail.jpg",
    "short_description": "A free-to-play, co-op action RPG with gameplay similar to Monster Hunter.",
    "game_url": "https://www.freetogame.com/open/dauntless",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Phoenix Labs",
    "developer": "Phoenix Labs, Iron Galaxy",
    "release_date": "2019-05-21",
    "freetogame_profile_url": "https://www.freetogame.com/dauntless"
  },
  {
    "id": 23,
    "title": "Apex Legends",
    "thumbnail": "https://www.freetogame.com/g/23/thumbnail.jpg",
    "short_description": "A free-to-play strategic battle royale game featuring 60-player matches and team-based play. ",
    "game_url": "https://www.freetogame.com/open/apex-legends",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Electronic Arts",
    "developer": "Electronic Arts",
    "release_date": "2019-02-04",
    "freetogame_profile_url": "https://www.freetogame.com/apex-legends"
  },
  {
    "id": 57,
    "title": "Fortnite",
    "thumbnail": "https://www.freetogame.com/g/57/thumbnail.jpg",
    "short_description": "A free-to-play, standalone mode of Epic Game's Fortnite. ",
    "game_url": "https://www.freetogame.com/open/fortnite-battle-royale",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Epic Games",
    "developer": "Epic Games",
    "release_date": "2017-09-26",
    "freetogame_profile_url": "https://www.freetogame.com/fortnite-battle-royale"
  },
  {
    "id": 449,
    "title": "Albion Online",
    "thumbnail": "https://www.freetogame.com/g/449/thumbnail.jpg",
    "short_description": "A free-to-play cross-platform sandbox MMO developed and published by Sandbox Interactive GmbH. ",
    "game_url": "https://www.freetogame.com/open/albion-online",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Sandbox Interactive GmbH",
    "developer": "Sandbox Interactive GmbH",
    "release_date": "2017-07-17",
    "freetogame_profile_url": "https://www.freetogame.com/albion-online"
  },
  {
    "id": 6,
    "title": "Blade and Soul",
    "thumbnail": "https://www.freetogame.com/g/6/thumbnail.jpg",
    "short_description": "A free-to-play martial arts MMORPG that tasks players with learning combination attacks.",
    "game_url": "https://www.freetogame.com/open/blade-and-soul",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "NCSoft",
    "developer": "NCSoft",
    "release_date": "2016-01-19",
    "freetogame_profile_url": "https://www.freetogame.com/blade-and-soul"
  },
  {
    "id": 212,
    "title": "Brawlhalla",
    "thumbnail": "https://www.freetogame.com/g/212/thumbnail.jpg",
    "short_description": "A free-to-play 2D platform fighter inspired by the Smash Bros.",
    "game_url": "https://www.freetogame.com/open/brawlhalla",
    "genre": "Fighting",
    "platform": "PC (Windows)",
    "publisher": "Blue Mammoth Games",
    "developer": "Blue Mammoth Games",
    "release_date": "2015-11-03",
    "freetogame_profile_url": "https://www.freetogame.com/brawlhalla"
  },
  {
    "id": 8,
    "title": "Trove",
    "thumbnail": "https://www.freetogame.com/g/8/thumbnail.jpg",
    "short_description": "A free to play Sandbox massively multiplayer online role-playing game! ",
    "game_url": "https://www.freetogame.com/open/trove",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Trion Worlds",
    "developer": "Trion Worlds",
    "release_date": "2015-07-09",
    "freetogame_profile_url": "https://www.freetogame.com/trove"
  },
  {
    "id": 202,
    "title": "Heroes & Generals",
    "thumbnail": "https://www.freetogame.com/g/202/thumbnail.jpg",
    "short_description": "A World War II-based MMOFPS that mixes infantry, armor, and aircraft.",
    "game_url": "https://www.freetogame.com/open/heroes-and-generals",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Reto-Moto",
    "developer": "Reto-Moto",
    "release_date": "2014-07-11",
    "freetogame_profile_url": "https://www.freetogame.com/heroes-and-generals"
  },
  {
    "id": 207,
    "title": "Warface",
    "thumbnail": "https://www.freetogame.com/g/207/thumbnail.jpg",
    "short_description": "A free-to-play multiplayer online FPS from Crytek, makers of the Far Cry and Crysis series of games.",
    "game_url": "https://www.freetogame.com/open/warface",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Crytek",
    "developer": "Crytek",
    "release_date": "2014-07-01",
    "freetogame_profile_url": "https://www.freetogame.com/warface"
  },
  {
    "id": 217,
    "title": "Smite",
    "thumbnail": "https://www.freetogame.com/g/217/thumbnail.jpg",
    "short_description": "A popular free-to-play 3D MOBA where you take on the role of an ancient god.",
    "game_url": "https://www.freetogame.com/open/smite",
    "genre": "MOBA",
    "platform": "PC (Windows)",
    "publisher": "Hi-Rez Studios",
    "developer": "Hi-Rez Studios",
    "release_date": "2014-03-25",
    "freetogame_profile_url": "https://www.freetogame.com/smite"
  },
  {
    "id": 3,
    "title": "Warframe",
    "thumbnail": "https://www.freetogame.com/g/3/thumbnail.jpg",
    "short_description": "A cooperative free-to-play third person online action shooter set in an stunning sci-fi world. ",
    "game_url": "https://www.freetogame.com/open/warframe",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Digital Extremes",
    "developer": "Digital Extremes",
    "release_date": "2013-03-25",
    "freetogame_profile_url": "https://www.freetogame.com/warframe"
  },
  {
    "id": 243,
    "title": "PlanetSide 2",
    "thumbnail": "https://www.freetogame.com/g/243/thumbnail.jpg",
    "short_description": "A free-to-play open-world FPS that pits three factions against each other in a never-ending war.",
    "game_url": "https://www.freetogame.com/open/planetside-2",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Daybreak Games",
    "developer": "Daybreak Games",
    "release_date": "2012-11-21",
    "freetogame_profile_url": "https://www.freetogame.com/planetside-2"
  },
  {
    "id": 13,
    "title": "Guild Wars 2",
    "thumbnail": "https://www.freetogame.com/g/13/thumbnail.jpg",
    "short_description": "A free-to-play MMORPG, the follow-up to ArenaNet's popular Guild Wars. ",
    "game_url": "https://www.freetogame.com/open/guild-wars-2",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "NCsoft",
    "developer": "ArenaNet",
    "release_date": "2012-08-28",
    "freetogame_profile_url": "https://www.freetogame.com/guild-wars-2"
  },
  {
    "id": 14,
    "title": "Star Trek Online",
    "thumbnail": "https://www.freetogame.com/g/14/thumbnail.jpg",
    "short_description": "A free-to-play, 3D, Sci-Fi MMORPG based on the popular Star Trek series.",
    "game_url": "https://www.freetogame.com/open/star-trek-online",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Perfect World Entertainment",
    "developer": " Cryptic Studios",
    "release_date": "2010-02-02",
    "freetogame_profile_url": "https://www.freetogame.com/star-trek-online"
  },
  {
    "id": 433,
    "title": "RuneScape",
    "thumbnail": "https://www.freetogame.com/g/433/thumbnail.jpg",
    "short_description": "A popular 3D browser MMORPG boasting a huge player base and 15 years of content.",
    "game_url": "https://www.freetogame.com/open/runescape",
    "genre": "MMORPG",
    "platform": "PC (Windows), Web Browser",
    "publisher": "Jagex",
    "developer": "Jagex",
    "release_date": "2001-01-04",
    "freetogame_profile_url": "https://www.freetogame.com/runescape"
  },
  {
    "id": 554,
    "title": "Undawn",
    "thumbnail": "https://www.freetogame.com/g/554/thumbnail.jpg",
    "short_description": "A free-to-play open-world survival RPG developed by LightSpeed studios and published by Level Infinite.",
    "game_url": "https://www.freetogame.com/open/undawn",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Level Infinite",
    "developer": "LightSpeed Studios",
    "release_date": "2023-06-15",
    "freetogame_profile_url": "https://www.freetogame.com/undawn"
  },
  {
    "id": 268,
    "title": "Eden Eternal",
    "thumbnail": "https://www.freetogame.com/g/268/thumbnail.jpg",
    "short_description": "A free to play fantasy MMORPG with cute anime-inspired graphics.",
    "game_url": "https://www.freetogame.com/open/eden-eternal",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "X-Legend Entertainment",
    "developer": "X-Legend Entertainment",
    "release_date": "2023-05-10",
    "freetogame_profile_url": "https://www.freetogame.com/eden-eternal"
  },
  {
    "id": 551,
    "title": "Veiled Experts",
    "thumbnail": "https://www.freetogame.com/g/551/thumbnail.jpg",
    "short_description": "A free-to-play multiplayer shooter game focused on the search and destroy mode of classic shooters.",
    "game_url": "https://www.freetogame.com/open/veiled-experts",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Nexon Games Co., LTC",
    "developer": "Nexon",
    "release_date": "2023-05-18",
    "freetogame_profile_url": "https://www.freetogame.com/veiled-experts"
  },
  {
    "id": 552,
    "title": "Jected - Rivals",
    "thumbnail": "https://www.freetogame.com/g/552/thumbnail.jpg",
    "short_description": "A free-to-play game mixing extreme sports with destructible vehicles and a unique ejection mechanic.",
    "game_url": "https://www.freetogame.com/open/jected-rivals",
    "genre": "Sports",
    "platform": "PC (Windows)",
    "publisher": "THQ Nordic",
    "developer": "PowWow Entertainment",
    "release_date": "2023-05-04",
    "freetogame_profile_url": "https://www.freetogame.com/jected-rivals"
  },
  {
    "id": 548,
    "title": "Dead Cide Club",
    "thumbnail": "https://www.freetogame.com/g/548/thumbnail.jpg",
    "short_description": "A free-to-play, side-scrolling shooter with a variety of modes and character types to choose from.",
    "game_url": "https://www.freetogame.com/open/dead-cide-club",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "PressA",
    "developer": "PressZ",
    "release_date": "2023-02-28",
    "freetogame_profile_url": "https://www.freetogame.com/dead-cide-club"
  },
  {
    "id": 546,
    "title": "Kartrider: Drift",
    "thumbnail": "https://www.freetogame.com/g/546/thumbnail.jpg",
    "short_description": "A free-to-play multiplayer online racing game set in the Kartrider franchise.",
    "game_url": "https://www.freetogame.com/open/kartrider-drift",
    "genre": "Racing",
    "platform": "PC (Windows)",
    "publisher": "Nexon America Inc.",
    "developer": "Nexon Korea Corporation",
    "release_date": "2023-01-10",
    "freetogame_profile_url": "https://www.freetogame.com/kartrider-drift"
  },
  {
    "id": 547,
    "title": "Warlander",
    "thumbnail": "https://www.freetogame.com/g/547/thumbnail.jpg",
    "short_description": "A medieval-style combat game with a selection of modes and characters.",
    "game_url": "https://www.freetogame.com/open/warlander",
    "genre": "MOBA",
    "platform": "PC (Windows)",
    "publisher": "Plaion",
    "developer": "Toylogic Inc.",
    "release_date": "2023-01-24",
    "freetogame_profile_url": "https://www.freetogame.com/warlander"
  },
  {
    "id": 545,
    "title": "Fangs",
    "thumbnail": "https://www.freetogame.com/g/545/thumbnail.jpg",
    "short_description": "A 4v4 MOBA with hero-specific strategies.",
    "game_url": "https://www.freetogame.com/open/fangs",
    "genre": "MOBA",
    "platform": "PC (Windows)",
    "publisher": "Hidden Leaf Games",
    "developer": "Hidden Leaf Games",
    "release_date": "2022-11-30",
    "freetogame_profile_url": "https://www.freetogame.com/fangs"
  },
  {
    "id": 549,
    "title": "Summoners War: Chronicles",
    "thumbnail": "https://www.freetogame.com/g/549/thumbnail.jpg",
    "short_description": "A multi-platform ARPG set in the Summoners War universe.",
    "game_url": "https://www.freetogame.com/open/summoners-war-chronicles",
    "genre": "MMORPG",
    "platform": "PC (Windows)",
    "publisher": "Com2uS",
    "developer": "Com2uS",
    "release_date": "2022-11-09",
    "freetogame_profile_url": "https://www.freetogame.com/summoners-war-chronicles"
  },
  {
    "id": 541,
    "title": "Marvel Snap",
    "thumbnail": "https://www.freetogame.com/g/541/thumbnail.jpg",
    "short_description": "A fast paced strategy card game set in the Marvel universe.",
    "game_url": "https://www.freetogame.com/open/marvel-snap",
    "genre": "Card Game",
    "platform": "PC (Windows)",
    "publisher": "Nuverse",
    "developer": "Second Dinner Studios, Inc.",
    "release_date": "2022-10-18",
    "freetogame_profile_url": "https://www.freetogame.com/marvel-snap"
  },
  {
    "id": 542,
    "title": "World Boss",
    "thumbnail": "https://www.freetogame.com/g/542/thumbnail.jpg",
    "short_description": "An experimental FPS based on io and roguelike gameplay.",
    "game_url": "https://www.freetogame.com/open/world-boss",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Playside",
    "developer": "Playside",
    "release_date": "2022-10-19",
    "freetogame_profile_url": "https://www.freetogame.com/world-boss"
  },
  {
    "id": 536,
    "title": "Omega Strikers",
    "thumbnail": "https://www.freetogame.com/g/536/thumbnail.jpg",
    "short_description": "A 3v3 socccer-style game with knockouts.",
    "game_url": "https://www.freetogame.com/open/omega-strikers",
    "genre": "Sports",
    "platform": "PC (Windows)",
    "publisher": "Odyssey Interactive",
    "developer": "Odyssey Interactive",
    "release_date": "2022-09-16",
    "freetogame_profile_url": "https://www.freetogame.com/omega-strikers"
  },
  {
    "id": 537,
    "title": "Gundam Evolution",
    "thumbnail": "https://www.freetogame.com/g/537/thumbnail.jpg",
    "short_description": "A 6v6 team-based shooter based on the Gundam multiverse",
    "game_url": "https://www.freetogame.com/open/gundam-evolution",
    "genre": "Shooter",
    "platform": "PC (Windows)",
    "publisher": "Bandai Namco",
    "developer": "Bandai Namco",
    "release_date": "2022-09-21",
    "freetogame_profile_url": "https://www.freetogame.com/gundam-evolution"
  },
  {
    "id": 539,
    "title": "Deathverse: Let It Die",
    "thumbnail": "https://www.freetogame.com/g/539/thumbnail.jpg",
    "short_description": "A game of survival where contestants are pit against each other in a life or death game show.",
    "game_url": "https://www.freetogame.com/open/deathverse-let-it-die",
    "genre": "Battle Royale",
    "platform": "PC (Windows)",
    "publisher": "Supertrick Games, Inc.",
    "developer": "GungHo Online Entertianment, Inc.",
    "release_date": "2022-09-28",
    "freetogame_profile_url": "https://www.freetogame.com/deathverse-let-it-die"
  }
]