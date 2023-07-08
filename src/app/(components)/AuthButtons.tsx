'use client'
import React from 'react'
import Button from './Button'
import { useFirebaseContext } from '@/contexts/FirebaseContext'
import { useRouter } from 'next/navigation'


export default function AuthButtons() {

  const router = useRouter()

  const { user, logOut } = useFirebaseContext()

  return (
    <div>
      {user
        ? (
          <Button label='Sair' onClick={logOut} />
        )
        : (
          <>
            <Button label='Entrar' onClick={() => router.push('/signin')} />
            <Button label='Registrar' onClick={() => router.push('/auth')} />
          </>
        )
      }
    </div>
  )
}
