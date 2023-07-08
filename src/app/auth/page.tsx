'use client'
import { FormEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUpResult, useFirebaseContext } from '@/contexts/FirebaseContext'

export default function Page() {

  const { user, signUp } = useFirebaseContext()

  const [error, setError] = useState<string | null>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const handleForm = async (
    event: FormEvent<HTMLFormElement>

  ) => {

    event.preventDefault()

    const email = emailRef.current?.value || ''
    const password = passwordRef.current?.value || ''

    const { result, error }: SignUpResult = await signUp(email, password)

    if (error) {
      setError(error.code)
      return console.error(error)
    }
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <h1 className='mt-60 mb-30'>Sign up</h1>
        {error && (<div className='text-red-500'>{error}</div>)}
        <form
          onSubmit={handleForm}
          className='form'>
          <label htmlFor='email'>
            <p>Email</p>
            <input
              ref={emailRef}
              required
              type='email'
              name='email'
              id='email'
              placeholder='example@mail.com'
            />
          </label>
          <label htmlFor='password'>
            <p>Password</p>
            <input
              ref={passwordRef}
              required
              type='password'
              name='password'
              id='password'
              placeholder='password'
            />
          </label>
          <button type='submit'>Sign up</button>
        </form>
      </div>
    </div>
  )
}

