'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUpResult, useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import InputWithLabel from './InputWithLabel'
import Button from './Button'
import Link from 'next/link'

export default function SignUp() {

  const { user, signUp } = useFirebaseAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user, router])

  const [error, setError] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    const { result, error }: SignUpResult = await signUp(email, password)

    if (error) {
      setError(error.code)
      return console.error(error)
    }
  }

  if (user) return <></>

  return (

    <div className=' px-4 py-6 bg-white w-full h-full'>
      <h2 className='my-4 text-center font-semibold text-24'>Registrar-se</h2>
      {error && (<div className='text-red-500'>{error}</div>)}
      <form className='grid gap-4' onSubmit={handleForm}>

        <InputWithLabel icon='email' label='E-mail' required type='email' name='email' id='email' placeholder='example@mail.com' inputRef={emailRef} />

        <InputWithLabel icon='password' label='Senha' required type='password' name='password' id='password' placeholder='********' inputRef={passwordRef} />

        <span className='my-6'>
          <Button type='submit' label='Registrar-se' colorStyle='secondary' />
        </span>

        <Link href='/auth/entrar'><p className='text-center underline font-medium mobile:text-14'>Ja tem uma conta? Clique aqui para entrar.</p></Link>

      </form>

    </div>

  )
}

