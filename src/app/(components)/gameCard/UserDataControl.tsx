'use client'
import { useState } from 'react'
import AuthMessage from '../AuthMessage'
import { UserData } from '@/contexts/FirebaseDataContext'
import Heart from './Heart'
import Stars from './Stars'


interface UserDataControlProps {
  id: number
  userData: UserData | null
}

export default function UserDataControl({ id, userData }: UserDataControlProps) {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | undefined>(undefined)

  if (!id) return

  const handleAuthCheck = () => {

    setIsAuthenticated(undefined)

    if (userData) return setIsAuthenticated(true)

    setIsAuthenticated(false)
  }

  return (
    <>
      {isAuthenticated === false && <AuthMessage />}
      <div className='display-inherit w-fit gap-4 items-center cursor-pointer ' onClick={handleAuthCheck}>
        <Heart gameID={Number(id)} />
        <Stars gameID={Number(id)} />
      </div>
    </>
  )
}
