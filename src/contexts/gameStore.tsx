'use client'
import isProduction from '@/lib/environment'
import gamesMock from '@/lib/gamesMock'
import fetchGames, { Game } from '@/scripts/fetchGames'
import { useEffect } from 'react'
import { create } from 'zustand'
import { useFirebaseDataContext } from './FirebaseDataContext'

type Store = {
  games: Game[]
  modifiedGames: Game[]
  isLoading: boolean
  error: string | null
  setGames: (games: Game[]) => void,
  setModifiedGames: (games: Game[]) => void
  setIsLoading: () => void,
  setError: (error: string) => void,
}

export const useGameStore = create<Store>()((set) => ({
  games: [],
  modifiedGames: [],
  isLoading: true,
  error: null,
  setGames: (games) => set((state) => ({ games: [...games] })),
  setModifiedGames: (games) => set((state) => ({ modifiedGames: [...games] })),
  setIsLoading: () => set((state) => ({ isLoading: false })),
  setError: (error) => set((state) => ({ error: error })),
}
)
)

export default function GamesStoreProvider() {

  const { userData } = useFirebaseDataContext()

  const { setGames, setIsLoading, setError, games, setModifiedGames } = useGameStore()

  console.log('RENDERING STORE')

  useEffect(() => {
    if (isProduction) {
      fetchGames()
        .then((games: Game[]) => setGames(games))
        .catch(error => setError(error.message))
        .finally(() => setIsLoading())

    } else {
      setGames(gamesMock)
      setIsLoading()
    }
  }, [setGames, setError, setIsLoading])

  useEffect(() => {

    if (games.length < 1) return
    if (!userData) return setModifiedGames(games)

    const updatedGames: Game[] = games.map((game: Game) => {

      const { id } = game

      const isFavorite = userData.favorites.includes(id)

      const rating = Number(userData.ratings[id])

      return {
        ...game,
        isFavorite: isFavorite || null,
        rating: rating || null,
      }
    })
    setModifiedGames(updatedGames)
  }, [userData, games, setModifiedGames])


  return (<></>)

}
