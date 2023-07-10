'use client'
import { SignInResult, useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import InputWithLabel from './InputWithLabel'
import Button from './Button'
import Link from 'next/link'

export default function SignIn() {

  const { user, signIn } = useFirebaseAuthContext()

  const [error, setError] = useState<string | null>(null)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])


  const handleForm = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    const { result, error }: SignInResult = await signIn(email, password)

    if (error) {
      setError(error.code)
      return console.error(error)
    }

    router.push('/')
  }

  if (user) return <></>

  return (
    <div className=' px-4 py-6 bg-white w-full h-full'>
      <h2 className='my-4 text-center font-semibold text-24'>Entrar</h2>
      {error && (<div className='text-red-500'>{error}</div>)}
      <form className='grid gap-4' onSubmit={handleForm}>

        <InputWithLabel icon='email' label='E-mail' required type='email' name='email' id='email' placeholder='example@mail.com' inputRef={emailRef} />

        <InputWithLabel icon='password' label='Senha' required type='password' name='password' id='password' placeholder='********' inputRef={passwordRef} />
        <span className='my-6'>
          <Button type='submit' label='Entrar' colorStyle='secondary' />
        </span>
        <Link href='/auth/registrar'><p className='text-center underline font-medium mobile:text-14'>Ainda não tem uma conta? Clique aqui para registrar-se.</p></Link>

      </form>

    </div>

  )
}