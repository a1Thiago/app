import { Game } from "@/app/scripts/fetchGames"
import Image from "next/image"
import Link from "next/link"
import React from "react"

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {

  if (!game) return <></>

  return (

    <div className="max-w-3xl">

      <div className="p-4 grid desktop:grid-cols-[1fr,1fr] desktop:grid-rows-[.1fr,.9fr] gap-4">

        <h3 className="text-24 font-medium text-black  col-span-full">{game.title}</h3>

        <Image
          sizes="(max-width: 767px) 100vw, 50vh,(min-width: 768px) 25vw,25vh"
          width='0'
          height='0'
          src={game.thumbnail}
          alt={game.title}
          className="w-full h-auto self-center"
        />

        <div className="desktop:col-start-2 desktop:col-end-2">
          <p className="text-black mb-2">{game.short_description}</p>
          <p className="text-16 text-gray-600">Genre: {game.genre}</p>
          <p className="text-16 text-gray-600">Platform: {game.platform}</p>
          <p className="text-16 text-gray-600">Publisher: {game.publisher}</p>
          <p className="text-16 text-gray-600">Developer: {game.developer}</p>
          <p className="text-16 text-gray-600">
            Release Date: {game.release_date}
          </p>
          <div className="mt-4">
            <Link
              href={game.game_url}
              target="_blank"
              className="inline-block bg-theme-secondary text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Play Now
            </Link>
            <Link
              href={game.freetogame_profile_url}
              className="inline-block bg-theme-primary-dark text-white ml-2 px-4 py-2 rounded hover:opacity-90 transition-opacity"
              target="_blank"
            >
              View Profile
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

