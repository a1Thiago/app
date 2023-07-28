import { Metadata } from 'next'

import SignUp from '@/app/(components)/SignUp'

export const metadata: Metadata = {
  title: 'Registrar-se',
}

export default function Page() {
  return (

    <SignUp />

  )
}

