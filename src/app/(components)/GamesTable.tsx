'use client'
import fetchGames, { Game } from "../scripts/fetchGames"
import { useEffect, useState } from "react"
import RenderGameCards from "./gameCard/RenderGameCards"
import LoadingCircle from "./LoadingCircle"
import Image from "next/image"
import Button from "./Button"



export default function GamesTable() {

  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [pageSize, setPageSize] = useState<number>(15)

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

  if (error) return (
    <div className="grid gap-8  place-items-center text-center p-4">
      <h3 className="text-32 tablet:text-24 mobile:text-20 font-medium mt-32">{error}</h3>
      <Image src={'/error.png'} alt="error image" width={100} height={100} />
    </div>)

  return (

    <section className="py-4 grid gap-8">
      {!isLoading && !error &&
        (<div className="grid gap-4 justify-items-center text-center">
          <div>
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              placeholder="Procurar pelo título"
              type="text"
              id="search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="px-4 py-1 border border-theme-secondary-dark rounded placeholder:text-center"
            />
          </div>
          <div className="grid gap-2">
            <div className="font-medium">Filtrar pelo gênero</div>
            <div className="flex gap-2 items-center desktop:grid text-start e desktop:grid-flow-col desktop:grid-rows-2 mobile:grid mobile:grid-cols-2 tablet:grid tablet:grid-cols-3 truncate">

              {uniqueGenres.map((genre) => {
                const countOfGames = games
                  .map((game) => game.genre.toLowerCase() === genre.toLowerCase())
                  .filter((game) => game)
                  .length

                return (
                  <div key={genre} >
                    <label htmlFor={genre} className="mobile:text-14">
                      <input
                        className="mx-1 rounded cursor-pointer"
                        type="checkbox"
                        id={genre}
                        value={genre}
                        checked={selectedGenres.includes(genre.toLowerCase())}
                        onChange={handleGenreChange}
                      />
                      {genre} ({countOfGames})
                    </label>
                  </div>
                )
              })}
            </div>
          </div>

        </div>)}

      <div className="grid grid-cols-3 mobile:grid-cols-1 tablet:grid-cols-1">
        {isLoading
          ? (
            <div className="col-span-full text-center">
              <h3 className="text-32 tablet:text-24 mobile:text-20 font-medium">Carregando Jogos...</h3>
              <LoadingCircle />
            </div>)
          : (<RenderGameCards games={filteredGamesByGenre.slice(0, pageSize)} />)
        }
      </div>
      {filteredGamesByGenre.length > 0 && <Button label="Mostrar Mais" onClick={loadMoreItems} disabled={filteredGamesByGenre.length < pageSize} />}
    </section>
  )
}
