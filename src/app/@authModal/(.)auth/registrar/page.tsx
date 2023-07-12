'use client'
import InterceptorModal from '@/app/(components)/InterceptorModal'
import SignUp from '@/app/(components)/SignUp'

export default function SignInModal() {

  return (
    <InterceptorModal url='/auth/registrar'>
      <SignUp />
    </InterceptorModal>
  )
}
