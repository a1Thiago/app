'use client'

import { useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Page() {

  const { user } = useFirebaseAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (user == null) router.push('/')
  }, [user, router])

  return (<h1>Only logged in users can view this page</h1>)
}

export default Page