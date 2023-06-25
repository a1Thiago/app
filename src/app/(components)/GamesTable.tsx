'use client'
import fetchGames, { Game } from '../scripts/fetchGames'
import { useEffect, useState } from 'react'
import RenderGameCards from './gameCard/RenderGameCards'
import LoadingCircle from './LoadingCircle'
import Button from './Button'
import GenresFilter from './GenresFilter'
import ErrorMessage from './ErrorMessage'
import SearchInput from './SearchInput'
import isProduction from '@/utils/environment'
import gamesMock from '@/utils/gamesMock'



export default function GamesTable() {

  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [pageSize, setPageSize] = useState<number>(15)

  const [searchValue, setSearchValue] = useState<string>('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  useEffect(() => {
    if (isProduction) {

      fetchGames()
        .then((games: Game[]) => setGames(games))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading(false))

    } else {

      setGames(gamesMock)
      setIsLoading(false)

    }
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
            games={games}
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

