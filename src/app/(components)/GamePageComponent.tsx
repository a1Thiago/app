'use client'
import isProduction from '@/lib/environment'
import fetchGamesImage, { GameFromRapidApi } from '@/scripts/fetchGamesImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface GamePageComponentProps {
  id: string
}

export default function GamePageComponent({ id }: GamePageComponentProps) {

  const [gameData, setGameData] = useState<GameFromRapidApi | null>(null)
  const [error, setError] = useState<boolean | null>(false)
  const [isLoading, setIsLoading] = useState<boolean | null>(true)

  useEffect(() => {
    if (!id) return
    if (isProduction) {
      fetchGamesImage(Number(id))
        .then((game) => setGameData(game))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false))

    } else {
      setGameData(gamesMock[0] as GameFromRapidApi)
      setIsLoading(false)
    }
  }, [id])

  if (!gameData) return

  const { title, thumbnail, status, short_description, description, game_url, genre, platform,
    publisher, developer, release_date, freetogame_profile_url, minimum_system_requirements, screenshots,
  } = gameData


  if (isLoading) return (<div>loading...</div>)
  if (error) return (<div>error...</div>)

  return (
    <div>{title}
      <div className='flex flex-col'>
        <Carousel emulateTouch autoPlay>
          {screenshots.map(screen => {
            return (
              // <div className='relative w-96 h-96' key={screen.id}>
              <Image
                key={screen.id}
                // fill 
                src={screen.image} alt={title + ' Image'} className="w-full h-full" height={400} width={600}
                sizes="(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 50vw" />
              // </div>
            )
          })}
        </Carousel>
      </div>
    </div>
  )
}

const gamesMock = [{
  'id': 521,
  'title': 'Diablo Immortal',
  'thumbnail': 'https://www.freetogame.com/g/521/thumbnail.jpg',
  'status': 'Live',
  'short_description': 'Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.',
  'description': 'The demon fighting doesn’t have to stop when you walk away from the computer thanks to Blizzard Entertainment’s Diablo Immortal. Built for mobile and also released on PC, the game fills in the gaps between Diablo II and III in an MMOARPG environment.\r\n\r\nDiablo Immortal picks up following the presumed death of the Archangel Tyrael, during which time mankind must deal with the fallout. One of the many problems are the fragments of the shattered Worldstone spread across the land, waiting for Diablo’s underlings to collect them in an attempt to bring about his return.\r\n\r\nPlayers can choose from one of six classes in Diablo Immortal. These are the classic Barbarian, the Crusader, the Demon Hunter, the Monk, the Necromancer, and the Wizard. All six classes features their own unique skills and abilities.\r\n\r\nThe game also introduces six new bosses, ranging from The Skeleton King to the Glacial Colossus. Each offers players a unique challenge, and all are found in places filled with danger. So, players will want to be well prepared before taking them on.\r\n',
  'game_url': 'https://www.freetogame.com/open/diablo-immortal',
  'genre': 'MMOARPG',
  'platform': 'Windows',
  'publisher': 'Blizzard Entertainment',
  'developer': 'Blizzard Entertainment',
  'release_date': '2022-06-02',
  'freetogame_profile_url': 'https://www.freetogame.com/diablo-immortal',
  'minimum_system_requirements': {
    'os': 'Windows 7 / Windows 8 / Windows 10 / Windows 11 (64-bit)',
    'processor': 'Intel Core i3 or AMD FX-8100',
    'memory': '4 GB RAM',
    'graphics': 'NVIDIA GeForce GTX 460, ATI Radeon HD 6850 or Intel HD Graphics 530',
    'storage': '?'
  },
  'screenshots': [
    {
      'id': 1277,
      'image': 'https://www.freetogame.com/g/521/diablo-immortal-1.jpg'
    },
    {
      'id': 1278,
      'image': 'https://www.freetogame.com/g/521/diablo-immortal-2.jpg'
    },
    {
      'id': 1279,
      'image': 'https://www.freetogame.com/g/521/diablo-immortal-3.jpg'
    }
  ]
}
]