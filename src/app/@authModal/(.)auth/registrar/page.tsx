'use client'
import AuthWrapper from '../AuthWrapper'

import InterceptorModal from '@/app/(components)/ui/InterceptorModal'
import SignUp from '@/app/(components)/SignUp'

export default function SignInModal() {

  return (
    <InterceptorModal url='/auth/registrar'>
      <AuthWrapper>
        <SignUp />
      </AuthWrapper>
    </InterceptorModal>
  )
}
