'use client'
import { Game } from '@/scripts/fetchGames'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Accordion from '../Accordion'
import Button from '../Button'
import Heart from './Heart'
// import { getDataFromDatabase, setDataOnDatabase } from '@/lib/firebase.db'
import { useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { arrayUnion } from 'firebase/firestore'
import { useFirebaseDataContext } from '@/contexts/FirebaseDataContext'
import Stars from './Stars'

interface GameCardProps {
  game: Game
}

export default function GameCard({ game }: GameCardProps) {

  const { user, } = useFirebaseAuthContext()
  const { userData, setDataOnDatabase, removeItemFromDatabaseCollection } = useFirebaseDataContext()

  const [rendering, setRendering] = useState(true)

  useEffect(() => {
    setRendering(false)
  }, [])

  if (!game) return <></>

  // const handleClick = () => {

  //   if (checkIsFavorite) {
  //     removeItemFromDatabaseCollection('users', 'favorites', game.id)
  //   } else {
  //     setDataOnDatabase('users', { favorites: arrayUnion(game.id) })
  //       .then((response) => {
  //         console.log('set', response)
  //         // console.log('Data successfully set in Firestore:', response.result)
  //       })
  //       .catch((error) => {
  //         console.error('Error setting data in Firestore:', error)
  //       })
  //   }
  // }

  const handleStarClick = (rating: number) => {
    console.log('Selected rating:', rating)
    // Perform any other actions with the rating value
  }

  // const checkIsFavorite = user && userData?.favorites?.includes(game.id) || false

  return (
    <div
      className={`bg-white p-4 flex gap-2 flex-col border border-theme-secondary-dark rounded shadow-sm shadow-theme-secondary tablet:grid grid-cols-2 tablet:gap-x-4
      transition-opacity duration-500  ${rendering ? 'opacity-0' : 'opacity-100'} relative`}
    >
      <span
        // onClick={handleClick} 
        className='absolute right-2 top-2 z-10 '>
        <Heart
          gameID={game.id}
        // isFavorite={checkIsFavorite}
        />
      </span>

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

      <p title={game.short_description} className='h-40 tablet:h-32 mobile:h-30 overflow-y-hidden text-ellipsis'>
        {game.short_description}
      </p>

      <div className='hidden tablet:grid col-start-2 tablet:row-span-2'>
        <p ><span className='font-medium'>Genre</span>: {game.genre}</p>
        <p ><span className='font-medium'>Platform</span>: {game.platform}</p>
        <p ><span className='font-medium'>Publisher</span>: {game.publisher}</p>
        <p ><span className='font-medium'>Developer</span>: {game.developer}</p>
        <p ><span className='font-medium'>Release Date</span>: {game.release_date}</p>
      </div>

      <Accordion title={{ closed: 'Mostrar mais', opened: 'Mostrar menos' }}>
        <div>
          <p ><span className='font-medium'>Genre</span>: {game.genre}</p>
          <p ><span className='font-medium'>Platform</span>: {game.platform}</p>
          <p ><span className='font-medium'>Publisher</span>: {game.publisher}</p>
          <p ><span className='font-medium'>Developer</span>: {game.developer}</p>
          <p ><span className='font-medium'>Release Date</span>: {game.release_date}</p>
        </div>
      </Accordion>
      <Stars gameID={game.id} />
      <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14'>
        <Link href={game.game_url} target='_blank'>
          <Button label='Play Now' colorStyle='secondary' />
        </Link>
        <Link href={game.freetogame_profile_url} target='_blank'>
          <Button label='View Profile' colorStyle='primary' />
        </Link>
      </div>
    </div>
  )
}
