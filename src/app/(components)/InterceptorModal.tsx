'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import CloseButton from './CloseButton'

interface InterceptorModalProps {
  url: string
  children: React.ReactNode
}

export default function InterceptorModal({ url, children }: InterceptorModalProps) {


  const [isOpen, setIsOpen] = useState<boolean>(true)
  const [rendering, setRendering] = useState<boolean>(true)

  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    setRendering(false)
    return () => { }
  }, [])

  useEffect(() => {
    setIsOpen(path === url)
  }, [path, url])

  const toggleModal = () => {
    router.back()
  }

  return (
    <>
      {isOpen && (
        <div className='backdrop-blur-sm inset-0 fixed top-0 right-0 left-0 bottom-0 w-full h-full flex items-center justify-center z-50'>
          <div className={`grid relative z-20 border-theme-primary border-2 rounded-lg shadow-sm shadow-theme-secondary bg-white w-auto h-auto
      transition-all duration-500 ${rendering ? 'opacity-0 left-32' : 'opacity-100 left-0'}`}>
            {children}
            {<CloseButton className='text-black' onClick={toggleModal} />}
          </div>
        </div>
      )}
    </>
  )
}




