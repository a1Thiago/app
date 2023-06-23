'use client'
import fetchGames, { Game } from "../scripts/fetchGames"
import { useEffect, useState } from "react"
import GameCard from "./gameCard/GameCard"

export default function GamesTable() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchGames()
      .then((games: Game[]) => setGames(games))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false))
  }, [])


  if (error) return <div>{error}</div>

  return (
    <div>
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="w-12 h-12 border-t-4 border-theme-primary rounded-full animate-spin"></div>
        </div>
      )}
      {games?.splice(0, 5).map((game) => (
        <span key={game.id}>
          <GameCard game={game} />
        </span>
      ))}
    </div>
  )
}
