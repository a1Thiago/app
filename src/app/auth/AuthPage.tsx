import AuthWrapper from '@/app/@authModal/(.)auth/AuthWrapper'
import Link from 'next/link'
import BackButton from '../(components)/BackButton'

interface AuthPageProps {
  children: React.ReactNode
}
export default function AuthPage({ children }: AuthPageProps) {

  return (

    <section className='absolute bottom-0 inset-0 h-screen w-screen flex flex-col items-center justify-center
    bg-gradient-to-b from-theme-secondary-dark via-theme-dark to-black'>
      <span className='top-4 left-4 absolute'>
        <BackButton className='text-white' />
      </span>
      <div className='shadow-md shadow-theme-primary'>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </div>
    </section>
  )
}
