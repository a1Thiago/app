'use client'
import AuthModal from '@/app/(components)/AuthModal'
import SignUp from '@/app/(components)/SignUp'

export default function SignInModal() {

  return (
    <AuthModal url='/auth/registrar'>
      <SignUp />
    </AuthModal>
  )
}
