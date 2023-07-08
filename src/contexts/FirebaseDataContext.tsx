'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, UserCredential } from 'firebase/auth'
import { auth, db } from '@/lib/firebase.config'
import localStorageUtil from '@/lib/localStorage'
import { useFirebaseAuthContext } from './FirebaseAuthContext'
import { DocumentSnapshot, arrayRemove, doc, getDoc, setDoc } from 'firebase/firestore'

type UserData = {
  favorites: Array<number>
}
interface FirebaseDataContextProps {
  userData: UserData | null
  setUserData: (data: UserData | null) => void;
}
interface FirebaseDataContextProviderProps {
  children: React.ReactNode
}

interface setDataOnDatabaseResult {
  result: void | undefined
  error: any
}

interface getDataFromDatabaseResult {
  result: DocumentSnapshot | null
  error: any
}

export const FirebaseDataContext = createContext<FirebaseDataContextProps>(
  {
    userData: null,
    setUserData: () => { }
  })

export const useFirebaseDataContext = (): FirebaseDataContextProps => useContext(FirebaseDataContext)

export default function FirebaseDataContextProvider({ children }: FirebaseDataContextProviderProps) {


  const { user } = useFirebaseAuthContext()

  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    const checkUserData = async () => {

      const response = await getDataFromDatabase('users', user?.uid!)

      const favorites = response.result?.get('favorites')

      setUserData({ favorites })

    }
    if (user) {
      checkUserData()
    }
    setLoading(false)
  }, [user])


  async function setDataOnDatabase(collectionName: string, documentId: string, data: any): Promise<setDataOnDatabaseResult> {

    let result: void | undefined
    let error: any = null

    try {
      result = await setDoc(doc(db, collectionName, documentId), data, {
        merge: true,
      })


    } catch (e) {
      error = e
    }

    return { result, error }
  }

  async function getDataFromDatabase(collectionName: string, documentId: string): Promise<getDataFromDatabaseResult> {

    const documentRef = doc(db, collectionName, documentId)

    let result: DocumentSnapshot | null = null
    let error: any = null

    try {
      result = await getDoc(documentRef)
    } catch (e) {
      error = e
    }

    return { result, error }
  }

  async function removeItemFromDatabaseCollection(collectionName: string, documentId: string, field: string, item: any): Promise<setDataOnDatabaseResult> {
    let result: void | undefined
    let error: any = null

    try {
      const documentRef = doc(db, collectionName, documentId)
      const fieldValue = arrayRemove(item)
      const data = { [field]: fieldValue }
      result = await setDoc(documentRef, data, { merge: true })
    } catch (e) {
      error = e
    }

    return { result, error }
  }

  return (
    <FirebaseDataContext.Provider value={{ userData, setUserData }}>
      {loading ? <div>Loading...</div> : (children)}
    </FirebaseDataContext.Provider>
  )
}
