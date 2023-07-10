'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import { auth } from '@/lib/firebase.config'
import localStorageUtil from '@/lib/localStorage'
import { useRouter } from 'next/navigation'
export interface SignInResult {
  result: UserCredential | null
  error: any
}
export interface SignUpResult {
  result: UserCredential | null
  error: any
}
interface FirebaseAuthContextProviderProps {
  children: React.ReactNode
}
interface FirebaseAuthContextProps {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<SignInResult>
  signUp: (email: string, password: string) => Promise<SignUpResult>
  logOut: () => void
}

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>(
  {
    user: null,
    loading: true,
    signIn: () => Promise.resolve({ result: null, error: null }),
    signUp: () => Promise.resolve({ result: null, error: null }),
    logOut: () => { },
  })

export const useFirebaseAuthContext = (): FirebaseAuthContextProps => useContext(FirebaseAuthContext)

export default function FirebaseAuthContextProvider({ children }: FirebaseAuthContextProviderProps) {

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {

    const userFromStorage: User = localStorageUtil.getItem('user')!

    const checkAuthentication = async () => {
      if (userFromStorage) {
        try {
          const authenticatedUser = await checkFirebaseAuthentication()
          if (authenticatedUser) {
            setUser(authenticatedUser)
          } else {
            localStorageUtil.deleteItem('user')
          }
        } catch (error) {
          console.error('Error occurred while checking authentication:', error)
        }
      } else {
        localStorageUtil.deleteItem('user') //todo Handle json.parse errors
      }
      setLoading(false)
    }
    checkAuthentication()
  }, [])

  const signIn = async (email: string, password: string): Promise<SignInResult> => {
    let result: UserCredential | null = null
    let error: any = null
    try {
      result = await signInWithEmailAndPassword(auth, email, password)
      localStorageUtil.setItem('user', result.user)
      setUser(result.user)
    } catch (e) {
      error = e
    }
    return { result, error }
  }

  const signUp = async (email: string, password: string): Promise<SignUpResult> => {
    let result: UserCredential | null = null
    let error: any = null
    try {
      result = await createUserWithEmailAndPassword(auth, email, password)
      localStorageUtil.setItem('user', result.user)
      setUser(result.user)
    } catch (e) {
      error = e
    }
    return { result, error }
  }

  const logOut = async () => {
    if (user) {
      await signOut(auth)
      localStorageUtil.deleteItem('user')
      setUser(null)
      router.push('/')
    }
  }

  return (
    <FirebaseAuthContext.Provider value={{ user, loading, signIn, signUp, logOut }}>
      {
        // loading ? <div><LoadingCircle /></div> :
        children}
    </FirebaseAuthContext.Provider>
  )
}

const checkFirebaseAuthentication = async (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}