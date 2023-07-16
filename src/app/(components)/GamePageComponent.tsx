'use client'
import isProduction from '@/lib/environment'
import fetchGamesImage, { GameFromRapidApi } from '@/scripts/fetchGamesImage'

import { useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import CheckBoxButtonComponent from './CheckBoxButtonComponent'

import EmptyTableMessage from './EmptyTableMessage'
import LoadingCircle from './LoadingCircle'
import ErrorMessage from './ErrorMessage'
import CustomImage from './CustomImage'
import Accordion from './Accordion'
import { useGameStore } from '@/contexts/gameStore'
import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import UserDataControl from './gameCard/UserDataControl'
import { Game } from '@/scripts/fetchGames'

interface GamePageComponentProps {
  id: string
}

export default function GamePageComponent({ id }: GamePageComponentProps) {

  const { games } = useGameStore()

  const gameOfThePage = games.filter(game => game.id === Number(id))?.[0]

  const { userData } = useFirebaseDataContext()

  const [gameData, setGameData] = useState<GameFromRapidApi | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean | null>(true)

  useEffect(() => {

    if (!id) return

    if (isProduction) {
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

    <div className='py-4'>
      <GamePageSkeleton game={gameOfThePage} />
    </div>

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


    <div className='py-6'>

      {/* 1-COL     */}
      <div className='desktop:hidden smdesktop:hidden grid gap-4'>

        <span className='relative flex w-full justify-self-center max-w-[350px]'>
          <UserDataControl id={Number(id)} userData={userData} />
        </span>

        <CustomImage
          width='0' height='0'
          src={thumbnail} alt={title + ' thumbnail'}
          sizes="(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 30vw"
          className='justify-self-center max-w-[350px] min-h-[190px]'
        />

        <ListRender listTitle='Informações' list={Information} />

        {screenshots?.length > 0 &&
          (<div className='grid items-center w-full'>
            <div className='flex flex-col relative h-fit group 
            tablet:min-h-[200px] mobile:min-h-[175px]'>
              <CheckBoxButtonComponent item={genre} disabled className='bg-theme-secondary-dark text-white w-28 absolute left-1 top-1 transform z-10'>
                {genre}
              </CheckBoxButtonComponent>
              <Carousel emulateTouch infiniteLoop autoPlay interval={5 * 1000} showThumbs={false}>
                {screenshots.map(screen => {
                  return (
                    <CustomImage
                      src={screen.image}
                      alt={title + ' Image'} height={600} width={800}
                      sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 33vw"
                      priority
                      className='w-full h-full  self-center'
                      key={screen.id}
                    />

                  )
                })}
              </Carousel>
              <h3 title={title}
                className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4  opacity-90 
              absolute bottom-0 z-10 tablet:text-20 mobile:text-18 transform transition-all duration-400 group-hover:opacity-0'>{title}</h3>
            </div>
          </div>)
        }

        <ListRender list={requirements} listTitle='Requisitos mínimos' />

        <Accordion title={{ closed: 'Ver descrição completa', opened: 'Fechar descrição completa' }}>
          <>{description}</>
        </Accordion>
      </div>
      {/* 1-COL     */}

      {/* ------------------------------------------------------------------------------------------- */}
      {/* 2-COL */}
      <div className='mobile:hidden tablet:hidden grid gap-6'>

        <div className="grid gap-6 grid-cols-3 smdesktop:grid-cols-2">

          <div className='grid gap-4 max-w-[350px]'>

            <span className='relative flex w-full'>
              <UserDataControl id={Number(id)} userData={userData} />
            </span>

            <CustomImage
              sizes="(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 30vw"
              width='0'
              height='0'
              src={thumbnail}
              alt={title + ' thumbnail'}
              className='min-h-[190px]'
            />
          </div>

          <ListRender listTitle='Informações' list={Information} />

          <span className='smdesktop:hidden'> <ListRender list={requirements} listTitle='Requisitos mínimos' /></span>

        </div>

        {screenshots?.length > 0 &&
          (<div className='grid items-center'>
            <div className='flex flex-col relative h-fit group 
            min-h-[340px] smdesktop:min-h-[275px]'>
              <CheckBoxButtonComponent item={genre} disabled className='bg-theme-secondary-dark text-white w-28 absolute left-1 top-1 transform z-10'>
                {genre}
              </CheckBoxButtonComponent>
              <Carousel emulateTouch infiniteLoop autoPlay interval={5 * 1000} showThumbs={false}>
                {screenshots.map(screen => {
                  return (
                    <CustomImage
                      src={screen.image}
                      alt={title + ' Image'} height={600} width={800}
                      sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw, 33vw"
                      priority
                      className='w-full h-full self-center'
                      key={screen.id}
                    />

                  )
                })}
              </Carousel>
              <h3 title={title}
                className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4  opacity-90 
              absolute bottom-0 z-10 text-24 transform transition-all duration-400 group-hover:opacity-0'>{title}</h3>
            </div>
          </div>)
        }

        <span className='desktop:hidden'> <ListRender list={requirements} listTitle='Requisitos mínimos' /> </span>

        <Accordion title={{ closed: 'Ver descrição completa', opened: 'Fechar descrição completa' }}>
          <>{description}</>
        </Accordion>
      </div>
      {/* 2-COL */}


    </div>

  )

  function ListRender({ listTitle, list }: { listTitle: string, list: { label: string, value: string }[] }) {
    return <div className='grid gap-1 text-left'>
      <h4 className="text-16">
        <strong>{listTitle}</strong>:
      </h4>
      <ul className="px-2">
        {list?.map((item, index) => (
          item?.value && item?.value !== '?' && (
            <li key={item.label + index} className="text-14">
              <strong>{item?.label}</strong>: {item?.value}
            </li>
          )
        ))}
      </ul>
    </div>
  }
}

const ListRenderSkeleton = ({ listTitle, itemCount, className }: { listTitle: string, itemCount: number, className?: string }) => {
  const renderLoadingSkeletons = () => {
    const skeletons = []

    for (let i = 0; i < itemCount; i++) {
      skeletons.push(<div className="bg-theme-primary animate-pulse rounded-lg" key={i}> </div>)
    }

    return skeletons
  }

  return (
    <div className={`grid gap-1 text-left ${className}`}>
      <h4 className="text-16">
        <strong>{listTitle}</strong>:
      </h4>
      <ul className="pl-2 grid gap-1">
        {renderLoadingSkeletons()}
      </ul>
    </div>
  )
}

function GamePageSkeleton({ game }: { game: Game }) {
  return (
    <>

      {/* 1COL */}
      <div className='smdesktop:hidden desktop:hidden grid gap-4'>
        <div className='grid gap-4 justify-center'>
          <span className='relative flex w-full justify-self-center max-w-[350px] h-fit bg-theme-primary animate-pulse rounded-xl'> </span>
          {game
            ? (<  CustomImage className='justify-self-center max-w-[350px] min-h-[190px]' src={game?.thumbnail} width={100} height={100} alt={game?.title + 'Thumbnail'} />)
            : (<span className='flex w-[350px] h-[190px] bg-theme-primary animate-pulse rounded-xl'> </span>)
          }
        </div>
        <ListRenderSkeleton listTitle='Informações' itemCount={4} />
        <div className='tablet:h-[330px] mobile:h-[200px] bg-theme-primary w-full animate-pulse relative rounded-lg'>
          <h3 title={game?.title}
            className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4  opacity-90 
              absolute bottom-0 z-10 tablet:text-20 mobile:text-18 transform transition-all duration-400 group-hover:opacity-0'>{game?.title}</h3>
        </div>

        <ListRenderSkeleton listTitle='Requisitos mínimos' itemCount={4} />
        <span className='flex w-full h-11 bg-theme-primary animate-pulse rounded-xl'> </span>

      </div>
      {/* 1COL */}

      {/* 2COL */}
      <div className='tablet:hidden mobile:hidden grid gap-6'>
        <div className='grid gap-6 grid-cols-3 smdesktop:grid-cols-2'>
          <span className='grid gap-4'>
            <span className='relative flex w-full max-w-[350px] h-fit bg-theme-primary animate-pulse rounded-xl'> </span>
            {game
              ? (<  CustomImage className='justify-self-center max-w-[350px] min-h-[190px]' src={game?.thumbnail} width={100} height={100} alt={game?.title + 'Thumbnail'} />)
              : (<span className='flex w-full max-w-[350px] h-[190px] bg-theme-primary animate-pulse rounded-xl'> </span>)
            }
          </span>

          <ListRenderSkeleton listTitle='Informações' itemCount={4} />
          <ListRenderSkeleton listTitle='Requisitos mínimos' itemCount={4} className='smdesktop:hidden' />
        </div>

        <div className='desktop:h-[600px] smdesktop:h-[460px] bg-theme-primary w-full relative rounded-lg animate-pulse'>
          <h3 title={game?.title}
            className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4  opacity-90 
              absolute bottom-0 z-10 text-24 transform transition-all duration-400 group-hover:opacity-0'>{game?.title}</h3>
        </div>

        <ListRenderSkeleton listTitle='Requisitos mínimos' itemCount={4} className='desktop:hidden' />
        <span className='flex w-full h-11 bg-theme-primary animate-pulse rounded-xl'> </span>

      </div>
      {/* 2COL */}

    </>
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

