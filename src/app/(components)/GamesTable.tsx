'use client'
import { useMemo, useState } from 'react'
import RenderGameCards from './gameCard/RenderGameCards'
import LoadingCircle from './LoadingCircle'
import Button from './Button'
import GenresFilter from './GenresFilter'
import ErrorMessage from './ErrorMessage'
import SearchInput from './SearchInput'
import { useGameStore } from '@/contexts/gameStore'
import fetchGames, { Game } from '@/scripts/fetchGames'
import CheckBoxButtonComponent from './CheckBoxButtonComponent'
import EmptyTableMessage from './EmptyTableMessage'
import Image from 'next/image'
import { SortStars } from './gameCard/Stars'

export default function GamesTable() {

  const { modifiedGames, setGames, isLoading, setIsLoading, error, setError } = useGameStore()

  const [sortOrderOfRatings, setSortOrderOfRatings] = useState<'asc' | 'desc' | 'fromZeroAsc'>('desc')

  const [pageSize, setPageSize] = useState<number>(15)

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
          return 'fromZeroAsc'
        case 'fromZeroAsc':
          return 'asc'
        default:
          return 'desc'
      }
    })
  }

  const loadMoreItems = () => {
    setPageSize(oldValue => oldValue + 15)
  }

  const filteredGamesBySearchValue = useMemo(() => {
    return filterGamesBySearchValue(modifiedGames, searchValue)
  }, [modifiedGames, searchValue])

  const filteredGamesByGenre = useMemo(() => {
    return filterGamesByGenre(selectedGenres, filteredGamesBySearchValue)
  }, [selectedGenres, filteredGamesBySearchValue])



  const gamesToShow = sortByRating(sortOrderOfRatings, filteredGamesByGenre)

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

      {!isLoading && !error &&

        (<div className='flex flex-col items-center justify-self-center text-center max-w-4xl'>
          <SearchInput onChange={(e) => setSearchValue(e.target.value)} />
          <GenresFilter selectedGenres={selectedGenres} onChange={handleGenreChange} />

          <CheckBoxButtonComponent className={`bg-theme-secondary-dark w-full transition-all duration-700 mt-4
           ${ratedGames.length === 0 && 'translate-y-28 opacity-50 scale-y-0 skew-y-12 -m-8 mobile:-m-4'}`} item='sortOrder'>
            <span className='flex w-full justify-center items-center scale-x-105' onClick={handleSortOrderOfRatings}>
              <SortStars sortOrderOfRatings={sortOrderOfRatings} />
            </span>
          </CheckBoxButtonComponent>

        </div>)}


      {isLoading
        ? (
          <EmptyTableMessage message='Carregando Jogos...'>
            <LoadingCircle />
          </EmptyTableMessage>
        )
        : gamesToShow.length > 0
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

const sortByRating = (sortOrder: 'asc' | 'desc' | 'fromZeroAsc', games: Game[]): Game[] => {

  const fromZero = sortOrder === 'fromZeroAsc'

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

    if (fromZero) {
      if (sortOrder === 'fromZeroAsc') {
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
