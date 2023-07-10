'use client'

import { useFirebaseAuthContext } from '@/contexts/FirebaseAuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Page() {

  const { user, loading } = useFirebaseAuthContext()

  const router = useRouter()

  useEffect(() => {
    if (user == null && !loading) router.push('/')
  }, [user, router, loading])

  return (<h1>Only logged in users can view this page</h1>)
}

export default Page