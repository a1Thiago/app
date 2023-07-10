'use client'
import SignUp from '@/app/(components)/SignUp'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function SignInModal() {

  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [rendering, setRendering] = useState<boolean>(true)

  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    setRendering(false)
    return () => { }
  }, [])

  useEffect(() => {
    setIsOpen(path === '/auth/registrar')
  }, [path])

  const toggleModal = () => {

    router.back()
  }

  return (
    <>
      {isOpen && (
        <div className='backdrop-blur-sm fixed z-50 inset-0 flex items-center justify-center '>
          <div className={`bg-white w-[600px] flex items-center justify-center mx-auto rounded shadow-lg relative desktop:p-12 tablet:p-6 mobile:p-0
        transition-all duration-500 ${rendering ? 'opacity-0 left-32' : 'opacity-100 left-0'}`
          }>
            <SignUp />
            <button
              onClick={toggleModal}
              type='button'
              className="absolute top-2 right-2 text-black"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  )
}
