import SignIn from '@/app/(components)/SignIn'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fazer Login',
}

export default function Page() {

  return (

    <SignIn />

  )
}