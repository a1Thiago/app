'use client'
import InterceptorModal from '@/app/(components)/ui/InterceptorModal'
import SignIn from '@/app/(components)/SignIn'
import AuthWrapper from '../AuthWrapper'

export default function SignInModal() {

  return (
    <InterceptorModal url='/auth/entrar'>
      <AuthWrapper>
        <SignIn />
      </AuthWrapper>
    </InterceptorModal>
  )
}
