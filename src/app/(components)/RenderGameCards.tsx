import { Game } from "@/app/scripts/fetchGames"
import GameCard from "./GameCard/GameCard"

interface RenderGameCardsProps {
  games: Game[]
}

export default function RenderGameCards({ games }: RenderGameCardsProps) {
  return (
    <>
      {games.map((game) => (
        <span key={game.id} className="m-2">
          <GameCard game={game} />
        </span>
      ))}
    </>
  )
}
