'use client'
import isProduction from '@/lib/environment'
import fetchGamesImage, { GameFromRapidApi } from '@/scripts/fetchGamesImage'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CheckBoxButtonComponent from './CheckBoxButtonComponent'
import Accordion from './Accordion'
import EmptyTableMsg from './EmptyTableMsg'
import LoadingCircle from './LoadingCircle'
import ErrorMessage from './ErrorMessage'

interface GamePageComponentProps {
  id: string
}

export default function GamePageComponent({ id }: GamePageComponentProps) {

  const [gameData, setGameData] = useState<GameFromRapidApi | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | null>(true)

  useEffect(() => {

    if (!id) return

    if (!isProduction) {
      fetchGamesImage(Number(id))
        .then((response) => {
          if (!response?.id || !response) throw new Error('Ocorreu 1 problema, confirme que o jogo que voce procura existe e tente novamente.')
          setGameData(response)
        }
        )
        .catch(error => setError(error?.message))
        .finally(() => setIsLoading(false))

    } else {
      setGameData(gamesMock[0] as GameFromRapidApi)
      setIsLoading(false)
    }
  }, [id])

  if (isLoading) return (
    <EmptyTableMsg message='Carregando Informacoes'>
      <LoadingCircle />
    </EmptyTableMsg>
  )

  if (error) return <ErrorMessage error={error} />

  if (!gameData) return

  const { title, thumbnail, status, short_description, description, genre,
    platform, game_url, publisher, developer, release_date, freetogame_profile_url
    , minimum_system_requirements, screenshots,
  } = gameData && gameData

  const { graphics, memory, os, processor, storage } = minimum_system_requirements && minimum_system_requirements

  const Information = [
    { label: 'Plataforma', value: platform },
    { label: 'Game URL', value: game_url },
    { label: 'Publicadora', value: publisher },
    { label: 'Desenvolvedora', value: developer },
    { label: 'Data de lançamento', value: release_date },
    { label: 'Free-to-Game Profile', value: freetogame_profile_url },
  ]
  const requirements = [
    { label: 'Placa de video', value: graphics },
    { label: 'Memoria', value: memory },
    { label: 'Sistema Operacional', value: os },
    { label: 'Processador', value: processor },
    { label: 'Disco rigido', value: storage },
  ]

  return (

    <div className='grid gap-4 w-full'>

      <div className='grid gap-4 grid-cols-[70%,auto]'>

        {screenshots?.length > 0 &&
          (<div className='flex items-center justify-center'>
            <div className='flex flex-col relative h-fit'>
              <CheckBoxButtonComponent item={genre} disabled className='bg-theme-secondary-dark text-white w-28 absolute left-1 top-1 transform z-10'>
                {genre}
              </CheckBoxButtonComponent>
              <Carousel emulateTouch infiniteLoop autoPlay interval={5 * 1000} showThumbs={false}>
                {screenshots.map(screen => {
                  return (
                    <Image
                      key={screen.id}
                      src={screen.image} alt={title + ' Image'} className='w-full h-full' height={600} width={800}
                      sizes='(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 50vw' />
                  )
                })}
              </Carousel>
              <h3 title={title}
                className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4 transition-all opacity-90 hover:opacity-100
              absolute bottom-0 z-10 text-24  transform'>{title}</h3>
            </div>
          </div>)
        }

        <div className='flex gap-4 flex-col items-center '>
          <Image
            src={thumbnail} alt={title + ' Image'} className='w-full' height={200} width={300}
            sizes='(max-width: 404px) 100vw , (max-width: 768px) 30vw, (min-width: 769px) 10vw' />
          <ListRender listTitle='Informações' list={Information} />
        </div>

      </div>

      <Accordion title={{ closed: 'Ver descrição completa', opened: 'Fechar descrição completa' }}>
        <>{description}</>
      </Accordion>

      <ListRender list={requirements} listTitle='Requisitos mínimos' />

    </div >
  )

  function ListRender({ listTitle, list }: { listTitle: string, list: { label: string, value: string }[] }) {
    return <div className='grid gap-2 '>
      <h4 className="text-20">
        <strong>{listTitle}</strong>:
      </h4>
      <ul className="list-disc pl-8">
        {list?.map((item, index) => (
          item?.value && item?.value !== '?' && (
            <li key={index} className="text-14">
              <strong>{item?.label}</strong>: {item?.value}
            </li>
          )
        ))}
      </ul>
    </div>
  }
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

