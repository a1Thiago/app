interface AuthWrapper {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapper) {
  return (
    <section className='p-10 w-[480px] tablet:w-[400px] tablet:p-6 mobile:w-auto mobile:p-4 bg-white'>
      {children}
    </section>
  )
}
