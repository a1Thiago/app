import GameCard from './GameCard'

import { Game } from '@/scripts/fetchGames'

interface RenderGameCardsProps {
  games: Game[]
}

export default function RenderGameCards({ games }: RenderGameCardsProps) {
  return (
    <>
      {games.map((game) => (
        <span key={game.id} >
          <GameCard game={game} />
        </span>
      ))}
    </>
  )
}
