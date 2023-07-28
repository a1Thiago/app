'use client'
import { useEffect } from 'react'
import { create } from 'zustand'

import { useFirebaseDataContext } from './FirebaseDataContext'

import isProduction from '@/lib/environment'
import gamesMock from '@/lib/gamesMock'
import fetchGames, { Game } from '@/scripts/fetchGames'

/* eslint-disable */
type GameStorePros = {
  games: Game[]
  modifiedGames: Game[]
  isLoading: boolean
  error: string | null
  setGames: (games: Game[]) => void,
  setModifiedGames: (games: Game[]) => void
  setIsLoading: (isLoading: boolean) => void,
  setError: (error: string | null) => void,
}

export const useGameStore = create<GameStorePros>()((set) => ({
  games: [],
  modifiedGames: [],
  isLoading: true,
  error: null,
  setGames: (games) => set((state) => ({ games: [...games] })),
  setModifiedGames: (games) => set((state) => ({ modifiedGames: [...games] })),
  setIsLoading: (isLoading) => set((state) => ({ isLoading: isLoading })),
  setError: (error) => set((state) => ({ error: error })),
}))
/* eslint-enable */

export default function GamesStoreProvider() {

  const { userData } = useFirebaseDataContext()

  const { setGames, setIsLoading, setError, games, setModifiedGames } = useGameStore()

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
  }, [setGames, setError, setIsLoading])

  useEffect(() => {

    if (games.length < 1) return
    if (!userData) return setModifiedGames(games)

    const updatedGames: Game[] = games.map((game: Game) => {

      const { id } = game

      const isFavorite = userData?.favorites?.includes(id)

      const rating = Number(userData?.ratings?.[id])

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
