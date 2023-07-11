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
      <Button colorStyle='secondary' > </Button >
      <Button > </Button >
    </div>
  )

  return (
    <div>
      {user
        ? (
          <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14'>
            <Button colorStyle='secondary' onClick={() => router.push('/meus-jogos')} >
              <span>Meus jogos</span>
            </Button>
            <Button onClick={logOut} ><span>Sair</span></Button >
          </div>
        )
        : (
          <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14'>
            <Button colorStyle='secondary' onClick={() => router.push('/auth/registrar')} ><span>Registrar</span></Button >
            <Button onClick={() => router.push('/auth/entrar')} ><span>Entrar</span></Button >
          </div>
        )
      }
    </div>
  )
}
