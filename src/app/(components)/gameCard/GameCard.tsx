'use client'
import { Game } from '@/scripts/fetchGames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Button from '../Button'
import Heart from './Heart'
import Stars from './Stars'
import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import AuthMessage from './AuthMessage'
import CheckBoxButtonComponent from '../CheckBoxButtonComponent'
interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {

  const [rendering, setRendering] = useState(true)

  const { userData } = useFirebaseDataContext()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    setRendering(false)
  }, [])

  const handleAuthCheck = () => {
    setIsAuthenticated(undefined)

    if (userData) return setIsAuthenticated(true)

    setIsAuthenticated(false)
  }

  if (!game) return <></>

  return (
    <div
      className={`grid h-full gap-4 
      border-theme-primary border-2 rounded-lg shadow-sm shadow-theme-secondary bg-white
      transition-opacity duration-500  ${rendering ? 'opacity-0' : 'opacity-100'}`}
    >

      <div className='relative w-full h-fit min-h-[180px] tablet:min-h-[220px] mobile:min-h-[120px]'>

        <CheckBoxButtonComponent item={game.genre} className='bg-theme-secondary-dark text-white w-28 absolute left-1 top-1'>
          {game.genre}
        </CheckBoxButtonComponent>

        <Image
          // blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcc/L/fwAH0gNlHyeiMAAAAABJRU5ErkJggg=='
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOcc/J/HwAHYQL0xs6VQgAAAABJRU5ErkJggg=='
          placeholder='blur'
          height={100} width={200}
          sizes="(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 50vw"
          className='w-full h-full  self-center  rounded-t-lg' src={game.thumbnail} alt={game.title} />

        <h3
          title={game.title}
          className='text-black bg-white/70 truncate flex w-full font-semibold py-2 px-4 transition-all opacity-90 hover:opacity-100
absolute bottom-0 z-10 text-24 tablet:text-20 mobile:text-18  transform'>
          {game.title}
        </h3>
      </div>

      <div className='p-2 grid  gap-4'>
        <p title={game.short_description} className=' overflow-y-hidden text-ellipsis'>
          {game.short_description}
        </p>

        <div className='grid gap-4 items-end'>
          {isAuthenticated === false && <AuthMessage />}
          <div className='flex gap-4 items-center cursor-pointer ' onClick={handleAuthCheck}>
            <Heart gameID={game.id} />
            <Stars gameID={game.id} />
          </div>

          <Link href={`/game/${game.id}`} className='w-full' >
            <Button colorStyle='secondary'><span>Ver mais</span></Button >
          </Link>

        </div>
      </div>
    </div >
  )
}
