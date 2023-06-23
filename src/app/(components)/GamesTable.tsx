'use client'
import fetchGames, { Game } from "../scripts/fetchGames"
import { useEffect, useState } from "react"
import GameCard from "./GameCard/GameCard"



export default function GamesTable() {

  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [searchValue, setSearchValue] = useState<string>('')

  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  useEffect(() => {
    fetchGames()
      .then((games: Game[]) => setGames(games))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false))
  }, [])

  const allGenres = games.map((game) => game.genre)
  const uniqueGenres = Array.from(new Set(allGenres))

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

  const filteredGamesBySearch = games.filter((game) => {
    const games = game.title.toLowerCase().includes(searchValue.toLowerCase())
    if (games) {
      return games
    } else {
      return game.short_description.toLowerCase().includes(searchValue.toLowerCase())
    }
  }
  )

  const filteredGamesByGenre = filteredGamesBySearch?.filter((game) => {
    if (selectedGenres.length < 1) {
      return game
    } else {
      return selectedGenres.includes(game.genre.toLowerCase())
    }
  })

  if (error) return <div>{error}</div>

  return (

    <section>
      <div className="text-center">

        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          placeholder="Search"
          type="text"
          id="search"
          onChange={(e) => setSearchValue(e.target.value)}
          className="px-4 py-1 border border-theme-secondary-dark rounded"
        />

        <div className="flex items-center  justify-center gap-2">
          {uniqueGenres.map((genre) => (

            <label key={genre} htmlFor={genre}>
              <input
                className="mx-1 rounded"
                type="checkbox"
                id={genre}
                value={genre}
                checked={selectedGenres.includes(genre.toLowerCase())}
                onChange={handleGenreChange}
              />
              {genre}
            </label>

          ))}
        </div>

      </div>

      <div className="grid grid-cols-3">
        {isLoading
          ? (
            <div className="flex justify-center items-center h-screen col-span-full row-span-full">
              <div className="w-12 h-12 border-t-4 border-theme-secondary-dark rounded-full animate-spin"></div>
            </div>
          )
          : (
            filteredGamesByGenre.slice(0, 9).map((game) => (
              <span key={game.id}>
                <GameCard game={game} />
              </span>
            ))
          )}
      </div>
    </section>
  )
}
