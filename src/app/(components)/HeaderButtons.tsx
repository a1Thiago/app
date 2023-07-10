'use client'
import React from 'react'
import Button from './Button'
import { useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'


export default function HeaderButtons() {

  const router = useRouter()

  const { user, loading, logOut } = useFirebaseAuthContext()

  if (loading) return (
    <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14 animate-pulse'>
      <Button colorStyle='secondary' label=' ' />
      <Button label=' ' />
    </div>
  )

  return (
    <div>
      {user
        ? (
          <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14'>
            <Button label='Meus jogos' colorStyle='secondary' onClick={() => router.push('/meus-jogos')} />
            <Button label='Sair' onClick={logOut} />
          </div>
        )
        : (
          <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14'>
            <Button label='Registrar' colorStyle='secondary' onClick={() => router.push('/auth/registrar')} />
            <Button label='Entrar' onClick={() => router.push('/auth/entrar')} />
          </div>
        )
      }
    </div>
  )
}
