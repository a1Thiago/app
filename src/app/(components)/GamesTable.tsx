'use client'
import { useMemo, useState } from 'react'
import Image from 'next/image'

import RenderGameCards from './gameCard/RenderGameCards'
import GenresFilter from './GenresFilter'
import ErrorMessage from './ErrorMessage'
import SearchInput from './SearchInput'
import CheckBoxButtonComponent from './CheckBoxButtonComponent'
import EmptyTableMessage from './EmptyTableMessage'
import { SortStars } from './gameCard/Stars'

import fetchGames, { Game } from '@/scripts/fetchGames'
import { useGameStore } from '@/contexts/gameStore'
import Button from '@/app/(components)/ui/Button'
import LoadingCircle from '@/app/(components)/ui/LoadingCircle'

export default function GamesTable() {

  const { modifiedGames, setGames, isLoading, setIsLoading, error, setError } = useGameStore()

  const [sortOrderOfRatings, setSortOrderOfRatings] = useState<'ascIgnoreZero' | 'desc' | 'asc'>('ascIgnoreZero')

  const [pageSize, setPageSize] = useState<number>(18)

  const [searchValue, setSearchValue] = useState<string>('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const ratedGames = modifiedGames?.filter(game => game?.rating)

  const handleGenreChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const { value, checked } = event.target

    const selected = value.toLowerCase()

    setSelectedGenres((prevSelectedGenres) => {
      if (checked) {
        return selected === 'favoritos'
          ? [selected]
          : [...prevSelectedGenres, selected]
      } else {
        return prevSelectedGenres.filter(genre => genre !== selected)
      }
    })
  }

  const handleSortOrderOfRatings = () => {
    setSortOrderOfRatings((oldValue) => {
      switch (oldValue) {
        case 'asc':
          return 'desc'
        case 'desc':
          return 'ascIgnoreZero'
        case 'ascIgnoreZero':
          return 'asc'
        default:
          return 'desc'
      }
    })
  }

  const loadMoreItems = () => {
    setPageSize(oldValue => oldValue + 16)
  }

  const filteredGamesBySearchValue = useMemo(() => {
    return filterGamesBySearchValue(modifiedGames, searchValue)
  }, [modifiedGames, searchValue])

  const filteredGamesByGenre = useMemo(() => {
    return filterGamesByGenre(selectedGenres, filteredGamesBySearchValue)
  }, [selectedGenres, filteredGamesBySearchValue])

  const gamesToShow = sortByRating(sortOrderOfRatings, filteredGamesByGenre)

  if (isLoading) return (<LoadingControls />)

  if (error) return (
    <div className='flex flex-col items-center justify-center'>
      <ErrorMessage error={error} />
      <span className='w-fit'>
        <Button onClick={() => {
          setError(null)
          setIsLoading(true)
          fetchGames()
            .then((games: Game[]) => setGames(games))
            .catch(error => setError(error.message))
            .finally(() => setIsLoading(false))
        }
        }>
          Tentar novamente
        </Button>
      </span>
    </div>)

  return (

    <section className={`py-4 grid gap-4 ${isLoading && 'cursor-wait'}`}>

      <div className='flex flex-col gap-4 items-center justify-self-center text-center max-w-4xl'>
        <SearchInput onChange={(e) => setSearchValue(e.target.value)} />
        <GenresFilter selectedGenres={selectedGenres} onChange={handleGenreChange} />

        <CheckBoxButtonComponent aria-label='Sort Order button' className={`bg-theme-secondary-dark w-full transition-all duration-700 mt-4
           ${ratedGames.length === 0 && 'translate-y-28 opacity-50 scale-y-0 skew-y-12 -m-8 mobile:-m-4'}`} item='sortOrder'>
          <span className='flex w-full justify-center items-center scale-x-105' onClick={handleSortOrderOfRatings}>
            <SortStars sortOrderOfRatings={sortOrderOfRatings} />
          </span>
        </CheckBoxButtonComponent>
        <p className='font-semibold text-18'>Para ver as informações completas de um jogo, clique no botão Ver Mais...</p>
      </div>


      {
        gamesToShow.length > 0
          ? (<div className='grid gap-4 grid-cols-3 smdesktop:grid-cols-2 mobile:grid-cols-1 tablet:grid-cols-1'><RenderGameCards games={gamesToShow.slice(0, pageSize)} /></div>)
          : (
            <EmptyTableMessage message='Não tem nada aqui.'>
              <span className='grid justify-center w-full'>
                <Image className='animate-bounce-slow' src={'/empty.png'} height={200} width={200} alt='Não encontramos nada que satisfaça seus filtros' />
              </span>
            </EmptyTableMessage>
          )
      }

      {gamesToShow.length > 0 && (
        <div className='mx-2'>
          <Button onClick={loadMoreItems} disabled={gamesToShow.length < pageSize} >
            <span>Mostrar Mais</span>
          </Button>
        </div>
      )}

    </section >
  )
}


const filterGamesByGenre = (selectedGenres: Array<string>, games: Game[]) => {
  return games?.filter((game) => {
    if (selectedGenres.length < 1) {
      return true
    } else {
      return selectedGenres.includes(game.genre.toLowerCase()) || (selectedGenres.includes('favoritos') && game.isFavorite)
    }
  })
}

const filterGamesBySearchValue = (games: Game[], searchValue: string) => {
  return games.filter((game) => {

    const titleMatch = game.title.toLowerCase().includes(searchValue.toLowerCase())
    // const descriptionMatch = game.short_description.toLowerCase().includes(searchValue.toLowerCase())
    return titleMatch //|| descriptionMatch
  })
}

const sortByRating = (sortOrder: 'asc' | 'desc' | 'ascIgnoreZero', games: Game[]): Game[] => {

  const ascIgnoreZero = sortOrder === 'ascIgnoreZero'

  return games.sort((a, b) => {
    if (!games || !a || !b) return -1

    const aDiff = Number(a?.rating)
    const bDiff = Number(b?.rating)

    if (isNaN(aDiff) && isNaN(bDiff)) {
      return 0
    }

    if (isNaN(aDiff)) {
      return 1
    }

    if (isNaN(bDiff)) {
      return -1
    }

    if (ascIgnoreZero) {
      if (sortOrder === 'ascIgnoreZero') {
        if (aDiff === bDiff) {
          return 0
        } else if (aDiff === 0) {
          return 1
        } else if (bDiff === 0) {
          return -1
        } else {
          return aDiff - bDiff
        }
      } else {
        return bDiff - aDiff
      }
    } else {
      if (sortOrder === 'asc') {
        return aDiff - bDiff
      } else {
        return bDiff - aDiff
      }
    }
  })
}

function LoadingControls() {
  return (
    <div className='flex gap-4 flex-col items-center justify-self-center text-center py-4'>
      <div className='grid w-full gap-2 text-center max-w-4xl '>
        <div className='font-medium'>Procurar pelo titulo</div>
        <span className='bg-theme-primary/50 h-10 rounded animate-pulse'> </span>
      </div>
      <div className='grid gap-2 w-full text-center'>
        <div className='font-medium'>Filtrar pelo gênero</div>
        <div className='flex flex-col items-center justify-self-center text-center max-w-4xl w-full'>
          <span className="grid grid-rows-2 smdesktop:grid-rows-3 gap-2 items-center truncate text-start
        grid-flow-col mobile:grid-flow-row mobile:grid-cols-2 tablet:grid-cols-3 tablet:grid-flow-row w-full">
            {Array.from({ length: 14 }).map((_, index) => {
              return (
                <span key={index} className='h-[29px] rounded-lg animate-pulse  bg-theme-secondary/90  min-w-[116px] w-auto'></span>
              )
            })}
          </span>
        </div>
      </div>

      <span className='py-32'>
        <EmptyTableMessage message='Carregando Jogos...'>
          <LoadingCircle />
        </EmptyTableMessage>
      </span>
    </div>
  )
}