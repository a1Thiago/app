'use client'
import AuthWrapper from '../AuthWrapper'

import InterceptorModal from '@/app/(components)/ui/InterceptorModal'
import SignIn from '@/app/(components)/SignIn'

export default function SignInModal() {

  return (
    <InterceptorModal url='/auth/entrar'>
      <AuthWrapper>
        <SignIn />
      </AuthWrapper>
    </InterceptorModal>
  )
}
