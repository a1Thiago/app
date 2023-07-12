'use client'
import InterceptorModal from '@/app/(components)/InterceptorModal'
import SignIn from '@/app/(components)/SignIn'

export default function SignInModal() {

  return (
    <InterceptorModal url='/auth/entrar'>
      <SignIn />
    </InterceptorModal>
  )
}
