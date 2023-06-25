import { Game } from '@/app/scripts/fetchGames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Accordion from '../Accordion'

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {

  const [rendering, setRendering] = useState(true)

  useEffect(() => {
    setRendering(false)
  }, [])

  if (!game) return <></>

  return (
    <div
      className={`bg-white p-4 flex gap-2 flex-col border border-theme-secondary-dark rounded shadow-sm shadow-theme-secondary tablet:grid grid-cols-2 tablet:gap-x-4
      transition-opacity duration-500  ${rendering ? 'opacity-0' : 'opacity-100'}`}
    >
      <h3
        title={game.title}
        className='text-24 font-medium text-black truncate'
      >
        {game.title}
      </h3>

      <Image
        sizes='100vw'
        width='0'
        height='0'
        src={game.thumbnail}
        alt={game.title}
        className='w-full h-auto tablet:w-full tablet:h-full self-center tablet:col-start-1 tablet:row-span-2 rounded'
      />

      <p
        title={game.short_description}
        className='text-black h-36 mobile:h-32 tablet:h-auto text-ellipsis'
      >
        {game.short_description}
      </p>

      <div className='hidden tablet:grid col-start-2 tablet:row-span-2'>
        <p className='text-16 text-gray-600'>Genre: {game.genre}</p>
        <p className='text-16 text-gray-600'>Platform: {game.platform}</p>
        <p className='text-16 text-gray-600'>Publisher: {game.publisher}</p>
        <p className='text-16 text-gray-600'>Developer: {game.developer}</p>
        <p className='text-16 text-gray-600'>
          Release Date: {game.release_date}
        </p>
      </div>

      <Accordion title={{ closed: 'Mostrar mais', opened: 'Mostrar menos' }}>
        <div className=''>
          <p className='text-16 text-gray-600'>Genre: {game.genre}</p>
          <p className='text-16 text-gray-600'>Platform: {game.platform}</p>
          <p className='text-16 text-gray-600'>Publisher: {game.publisher}</p>
          <p className='text-16 text-gray-600'>Developer: {game.developer}</p>
          <p className='text-16 text-gray-600'>
            Release Date: {game.release_date}
          </p>
        </div>
      </Accordion>

      <div className='grid grid-cols-2'>
        <Link
          href={game.game_url}
          target='_blank'
          className='text-center truncate inline-block bg-theme-secondary text-white px-4 py-2 rounded hover:opacity-90 transition-opacity'
        >
          Play Now
        </Link>
        <Link
          href={game.freetogame_profile_url}
          className='text-center truncate inline-block bg-theme-primary-dark text-white ml-2 px-4 py-2 rounded hover:opacity-90 transition-opacity'
          target='_blank'
        >
          View Profile
        </Link>
      </div>
    </div>
  )
}
