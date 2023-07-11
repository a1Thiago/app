'use client'
import { useState } from 'react'
import RenderGameCards from './gameCard/RenderGameCards'
import LoadingCircle from './LoadingCircle'
import Button from './Button'
import GenresFilter from './GenresFilter'
import ErrorMessage from './ErrorMessage'
import SearchInput from './SearchInput'
import { useGameStore } from '@/contexts/gameStore'
import { Game } from '@/scripts/fetchGames'
import CheckBoxButtonComponent from './CheckBoxButtonComponent'

export default function GamesTable() {

  const { modifiedGames, isLoading, error } = useGameStore()

  const [sortOrderOfRatings, setSortOrderOfRatings] = useState<'asc' | 'desc'>('desc')

  const [pageSize, setPageSize] = useState<number>(15)

  const [searchValue, setSearchValue] = useState<string>('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const ratedGames = modifiedGames?.filter(game => game?.rating)

  console.log(ratedGames)

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
    setSortOrderOfRatings(oldValue => oldValue === 'asc' ? 'desc' : 'asc')
  }

  const loadMoreItems = () => {
    setPageSize(oldValue => oldValue + 15)
  }

  const gamesToShow =
    sortByRating(sortOrderOfRatings,
      filterGamesByGenre(selectedGenres,
        filterGamesBySearchValue(modifiedGames, searchValue)))//😳

  if (error) return <ErrorMessage error={error} />

  return (

    <section className={`py-4 grid gap-4 ${isLoading && 'cursor-wait'}`}>

      {!isLoading && !error &&

        (<div className='flex flex-col mobile:gap-4 gap-8 items-center justify-self-center text-center max-w-4xl'>
          <SearchInput onChange={(e) => setSearchValue(e.target.value)} />
          <GenresFilter selectedGenres={selectedGenres} onChange={handleGenreChange} />

          <CheckBoxButtonComponent className={`bg-theme-primary w-full transition-all duration-700 
           ${ratedGames.length === 0 && 'translate-y-28 opacity-50 scale-y-0 skew-y-12 -m-8 mobile:-m-4'}`} item='sortOrder'>
            <span onClick={handleSortOrderOfRatings}>Ordenar por estrelas: {sortOrderOfRatings === 'desc' ? 'Da menor para maior' : 'Da maior para menor'}</span>
          </CheckBoxButtonComponent>

        </div>)}

      <div className='grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-1'>
        {isLoading
          ? (
            <div className='col-span-full text-center'>
              <h3 className='mt-32 text-32 tablet:text-24 mobile:text-20 font-medium'>Carregando Jogos...</h3>
              <LoadingCircle />
            </div>)
          : (<RenderGameCards games={gamesToShow.slice(0, pageSize)} />)
        }
      </div>

      {gamesToShow.length > 0 && (
        <div className='mx-2'>
          <Button label='Mostrar Mais' onClick={loadMoreItems} disabled={gamesToShow.length < pageSize} />
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

const sortByRating = (sortOrder: 'asc' | 'desc', games: Game[]): Game[] => {

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

    if (sortOrder === 'asc') {
      return aDiff - bDiff
    } else {
      return bDiff - aDiff
    }
  })
}