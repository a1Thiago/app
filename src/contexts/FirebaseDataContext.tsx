'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { DocumentSnapshot, arrayRemove, doc, getDoc, setDoc } from 'firebase/firestore'
import { useFirebaseAuthContext } from './FirebaseAuthContext'
import { db } from '@/lib/firebase.config'

type Rating = {
  gameId: { value: number }
}

type UserData = {
  favorites: Array<number>
  ratings: Rating[]
}

interface FirebaseDataContextProps {
  userData: UserData | null
  setUserData: (data: UserData | null) => void
  setDataOnDatabase: (collectionName: string, data: any) => Promise<setDataOnDatabaseResult>
  getDataFromDatabase: (collectionName: string) => Promise<getDataFromDatabaseResult>
  removeItemFromDatabaseCollection: (collectionName: string, field: string, item: any) => Promise<setDataOnDatabaseResult>
}

interface FirebaseDataContextProviderProps {
  children: React.ReactNode
}
interface setDataOnDatabaseResult {
  result: void | null
  error: any
}

interface getDataFromDatabaseResult {
  result: DocumentSnapshot | null
  error: any
}

export const FirebaseDataContext = createContext<FirebaseDataContextProps>({
  userData: null,
  setUserData: () => { },
  setDataOnDatabase: () => Promise.resolve({ result: undefined, error: null }),
  getDataFromDatabase: () => Promise.resolve({ result: null, error: null }),
  removeItemFromDatabaseCollection: () => Promise.resolve({ result: undefined, error: null }),
})

export const useFirebaseDataContext = (): FirebaseDataContextProps => useContext(FirebaseDataContext)

export default function FirebaseDataContextProvider({ children }: FirebaseDataContextProviderProps) {

  const { user } = useFirebaseAuthContext()

  const [userData, setUserData] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {

    if (!user) return setUserData(null)

    const checkUserData = async () => {
      const response = await getDataFromDatabase('users')
      const favorites = response.result?.get('favorites')
      const ratings = response.result?.get('ratings')
      setUserData({ favorites, ratings })
    }

    if (user) {
      checkUserData()
    }
    setLoading(false)
  }, [user])

  async function setDataOnDatabase(collectionName: string, data: any): Promise<setDataOnDatabaseResult> {

    if (!user) return { result: null, error: null }

    let result: void | undefined
    let error: any = null

    try {
      result = await setDoc(doc(db, collectionName, user?.uid!), data, {
        merge: true,
      })

      if (result !== null) {
        const response = await getDataFromDatabase(collectionName)
        const favorites = response.result?.get('favorites')
        const ratings = response.result?.get('ratings')
        setUserData({ favorites, ratings })
      }
    } catch (e) {
      error = e
    }

    return { result, error }
  }

  async function getDataFromDatabase(collectionName: string): Promise<getDataFromDatabaseResult> {

    if (!user) return { result: null, error: null }

    const documentRef = doc(db, collectionName, user?.uid!)
    let result: DocumentSnapshot | null = null
    let error: any = null

    try {
      result = await getDoc(documentRef)
    } catch (e) {
      error = e
    }

    return { result, error }
  }

  async function removeItemFromDatabaseCollection(
    collectionName: string,
    field: string,
    item: any
  ): Promise<setDataOnDatabaseResult> {

    if (!user) return { result: null, error: null }

    let result: void | undefined
    let error: any = null

    try {
      const documentRef = doc(db, collectionName, user.uid)
      const fieldValue = arrayRemove(item)
      const data = { [field]: fieldValue }
      result = await setDoc(documentRef, data, { merge: true })

      if (result !== null) {
        const response = await getDataFromDatabase(collectionName)
        const favorites = response.result?.get('favorites')
        const ratings = response.result?.get('ratings')
        setUserData({ favorites, ratings })
      }
    } catch (e) {
      error = e
    }

    return { result, error }
  }

  return (
    <FirebaseDataContext.Provider value={{ userData, setUserData, setDataOnDatabase, getDataFromDatabase, removeItemFromDatabaseCollection }} >
      {
        // loading ? <div>Loading...</div> : 
        children}
    </FirebaseDataContext.Provider>
  )
}


// const getDataFromDatabase = useCallback(async (collectionName: string): Promise<getDataFromDatabaseResult> => {
//   if (!user) throw new Error()

//   const documentRef = doc(db, collectionName, user?.uid!)
//   let result: DocumentSnapshot | null = null
//   let error: any = null

//   try {
//     result = await getDoc(documentRef)
//   } catch (e) {
//     error = e
//   }

//   return { result, error }
// }, [user])