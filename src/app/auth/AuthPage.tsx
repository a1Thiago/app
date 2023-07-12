import AuthWrapper from '@/app/@authModal/(.)auth/AuthWrapper'

interface AuthPageProps {
  children: React.ReactNode
}
export default function AuthPage({ children }: AuthPageProps) {

  return (

    <section className='absolute bottom-0 inset-0 h-screen w-screen flex flex-col items-center justify-center
    bg-gradient-to-b from-theme-secondary-dark via-theme-dark to-black'>
      <div className='shadow-lg shadow-theme-primary'>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </div>
    </section>
  )
}
