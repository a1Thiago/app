'use client'
import React, { useState } from 'react'
import Button from './Button'
import { useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import CloseButton from './CloseButton'
import Link from 'next/link'
import Image from 'next/image'


export default function HeaderButtons() {

  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const { user, loading, logOut } = useFirebaseAuthContext()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  if (loading) return (
    <div>
      <div className='grid grid-cols-2 gap-2 animate-pulse pointer-events-none mobile:hidden'>
        <Button colorStyle='secondary' > </Button >
        <Button > </Button >
      </div>

      <div className='hidden mobile:flex flex-row-reverse '>
        <div className='rounded-sm h-10 w-10 bg-theme-secondary-dark/20 animate-pulse'> </div>
      </div>
    </div>
  )

  return (
    <nav className=''>
      {/* mobile*/}
      <div className="hidden mobile:flex flex-row-reverse items-center justify-between  text-white">
        <button
          aria-label="Mobile Menu"
          className={`focus:outline-none transition-all duration-700
${isOpen && 'scale-75 opacity-30'}`}
          onClick={toggleMenu}
        >
          <svg
            className="text-theme-secondary-dark w-10 h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className={`fixed inset-0 flex justify-end z-40 transition-all duration-500 origin-right transform h-full top-0 right-0 bottom-0
${isOpen ? 'scale-x-100 opacity-100' : 'opacity-70 -scale-x-50'} overflow-x-hidden`}>
          <Image src={'/mlogo.png'} alt='a1Th logo' quality={100} width={112} height={32} className='absolute right-4 top-4' sizes="(max-width: 404px) 100vw , (max-width: 768px) 60vw, (min-width: 769px) 30vw" />
          <div className="w-[60vw] bg-theme-secondary-dark text-white flex flex-row-reverse">

            <ul className="p-4 mt-16 text-24 font-medium flex flex-col gap-8 pr-6">
              <li>
                <Link className='flex w-full' onClick={() => setIsOpen(false)} href='/'>Home</Link>
              </li>
              {user ? (
                <li>
                  <button aria-label='LogOut button' className='flex w-full' onClick={() => { logOut(); setIsOpen(false) }}>Sair</button>
                </li>
              ) : (
                <>
                  <li>
                    <button className='flex w-full' onClick={() => setIsOpen(false)} aria-label='Login Button'>
                      <Link className='flex w-full' href='/auth/entrar'>Entrar</Link>
                    </button>
                  </li>
                  <li>
                    <button className='flex w-full' onClick={() => setIsOpen(false)} aria-label='SignIn Button'>
                      <Link className='flex w-full' href='/auth/registrar'>Registrar-se</Link>
                    </button>
                  </li>
                </>
              )}
            </ul>

            <CloseButton onClick={toggleMenu} className='w-10 h-10 fixed left-[35vw]' />
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className='mobile:hidden'>
        {user
          ? (
            <div className='grid grid-cols-2 gap-2 tablet:text-14 mobile:text-14'>
              <span></span>
              <Button onClick={logOut} ><span>Sair</span></Button >
            </div>
          )
          : (
            <div className='grid grid-cols-2 gap-2'>
              <Button colorStyle='secondary' onClick={() => router.push('/auth/registrar')} ><span>Registrar</span></Button >
              <Button onClick={() => router.push('/auth/entrar')} ><span>Entrar</span></Button >
            </div>
          )
        }
      </div>

    </nav>

  )

}
