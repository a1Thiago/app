'use client'
import React from 'react'
import Button from './Button'
import { useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'


export default function AuthButtons() {

  const router = useRouter()

  const { user, logOut } = useFirebaseAuthContext()

  return (
    <div>
      {user
        ? (
          <Button label='Sair' onClick={logOut} />
        )
        : (
          <>
            <Button label='Entrar' onClick={() => router.push('/auth/entrar')} />
            <Button label='Registrar' onClick={() => router.push('/auth/registrar')} />
          </>
        )
      }
    </div>
  )
}
