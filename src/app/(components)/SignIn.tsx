'use client'
import { SignInResult, useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import InputWithLabel from './InputWithLabel'
import Button from './Button'
import Link from 'next/link'
import { SmallLoadingCircle } from './LoadingCircle'

export default function SignIn() {

  const { user, signIn } = useFirebaseAuthContext()
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
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
    setError(null)
    event.preventDefault()
    setIsLoading(true)
    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    const { result, error }: SignInResult = await signIn(email, password)

    if (error) {
      setError(error.code)
      return console.error(error)
    }
    setIsLoading(false)
    router.push('/')
  }

  if (user) return <></>

  return (
    <div className='  bg-white flex flex-col justify-center items-center w-full h-full'>
      <h2 className='my-4 text-center font-semibold text-24'>Entrar</h2>

      <form onSubmit={handleForm} className='w-full'>
        <fieldset className='grid gap-4 group w-full' disabled={isLoading! && !error}>
          {error
            ? (<div className='text-red-500'>{error}</div>)
            : (<span className='opacity-0 group-disabled:opacity-100 '>
              <SmallLoadingCircle className='h-10 w-10 border-theme-secondary-dark' />
            </span>)
          }
          <InputWithLabel icon='email' label='E-mail' autoComplete='email' required type='email' name='email' id='email' placeholder='example@mail.com' inputRef={emailRef} />

          <InputWithLabel icon='password' label='Senha' autoComplete='password' required type='password' name='password' id='password' placeholder='********' inputRef={passwordRef} />
          <span className='my-6 inline-flex items-center justify-center'>
            <Button type='submit' colorStyle='secondary' >
              <span className='group-disabled:opacity-0'>Entrar</span>
            </Button >
          </span>
          <Link href='/auth/registrar'><p className='text-center underline font-medium mobile:text-14'>Ainda não tem uma conta?<br />Clique aqui para registrar-se.</p></Link>
        </fieldset>
      </form>

    </div>

  )
}