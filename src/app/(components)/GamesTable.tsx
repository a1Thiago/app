'use client'
import fetchGames, { Game } from '../../scripts/fetchGames'
import { useEffect, useState } from 'react'
import RenderGameCards from './gameCard/RenderGameCards'
import LoadingCircle from './LoadingCircle'
import Button from './Button'
import GenresFilter from './GenresFilter'
import ErrorMessage from './ErrorMessage'
import SearchInput from './SearchInput'
import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import { useGameStore } from '@/contexts/gameStore'

export default function GamesTable() {

  const { userData } = useFirebaseDataContext()

  const { games, isLoading, error } = useGameStore()

  console.log(games)

  const [pageSize, setPageSize] = useState<number>(15)

  const [searchValue, setSearchValue] = useState<string>('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

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
      return selectedGenres.includes(game.genre.toLowerCase()) || selectedGenres.includes('favoritos') && userData?.favorites?.includes(game.id) // game.isFavorite
    }
  })

  if (error) return <ErrorMessage error={error} />

  return (

    <section className={`py-4 grid gap-8 ${isLoading && 'cursor-wait'}`}>

      {!isLoading && !error &&

        (<div className='flex flex-col gap-4 items-center justify-self-center text-center max-w-4xl'>
          <SearchInput onChange={(e) => setSearchValue(e.target.value)} />
          <GenresFilter selectedGenres={selectedGenres} onChange={handleGenreChange} />
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

      {filteredGamesByGenre.length > 0 && (
        <div className='mx-2'>
          <Button label='Mostrar Mais' onClick={loadMoreItems} disabled={filteredGamesByGenre.length < pageSize} />
        </div>
      )}

    </section >
  )
}

