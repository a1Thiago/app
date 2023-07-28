'use client'
import InterceptorModal from '@/app/(components)/ui/InterceptorModal'
import SignUp from '@/app/(components)/SignUp'
import AuthWrapper from '../AuthWrapper'

export default function SignInModal() {

  return (
    <InterceptorModal url='/auth/registrar'>
      <AuthWrapper>
        <SignUp />
      </AuthWrapper>
    </InterceptorModal>
  )
}
