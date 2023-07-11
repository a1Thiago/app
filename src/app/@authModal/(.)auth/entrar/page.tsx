'use client'
import AuthModal from '@/app/(components)/AuthModal'
import SignIn from '@/app/(components)/SignIn'

export default function SignInModal() {

  return (
    <AuthModal url='/auth/entrar'>
      <SignIn />
    </AuthModal>
  )
}
