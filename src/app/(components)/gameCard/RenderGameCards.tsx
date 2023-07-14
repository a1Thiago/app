import { Game } from '@/scripts/fetchGames'
import GameCard from './GameCard'

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
