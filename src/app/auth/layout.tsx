import { Metadata } from 'next'
import BackButton from '../(components)/BackButton'
import AuthWrapper from '../@authModal/(.)auth/AuthWrapper'



export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <section className='absolute bottom-0 inset-0 h-screen w-screen flex flex-col items-center justify-center
    bg-gradient-to-b from-theme-secondary-dark via-theme-dark to-black'>
      <span className='top-4 left-4 absolute'>
        <BackButton className='text-white h-10 w-10' />
      </span>
      <div className='shadow-md shadow-theme-primary'>
        <AuthWrapper>
          {children}
        </AuthWrapper>
      </div>
    </section>
  )
}