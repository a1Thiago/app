
import { DocumentSnapshot, arrayRemove, doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from './firebase.config'

interface setDataOnDatabaseResult {
  result: void | undefined
  error: any
}

interface getDataFromDatabaseResult {
  result: DocumentSnapshot | null
  error: any
}

// export async function setDataOnDatabase(collectionName: string, documentId: string, data: any): Promise<setDataOnDatabaseResult> {

//   let result: void | undefined
//   let error: any = null

//   try {
//     result = await setDoc(doc(db, collectionName, documentId), data, {
//       merge: true,
//     })


//   } catch (e) {
//     error = e
//   }

//   return { result, error }
// }

// export async function getDataFromDatabase(collectionName: string, documentId: string): Promise<getDataFromDatabaseResult> {

//   const documentRef = doc(db, collectionName, documentId)

//   let result: DocumentSnapshot | null = null
//   let error: any = null

//   try {
//     result = await getDoc(documentRef)
//   } catch (e) {
//     error = e
//   }

//   return { result, error }
// }

// export async function removeItemFromDatabaseCollection(collectionName: string, documentId: string, field: string, item: any): Promise<setDataOnDatabaseResult> {
//   let result: void | undefined
//   let error: any = null

//   try {
//     const documentRef = doc(db, collectionName, documentId)
//     const fieldValue = arrayRemove(item)
//     const data = { [field]: fieldValue }
//     result = await setDoc(documentRef, data, { merge: true })
//   } catch (e) {
//     error = e
//   }

//   return { result, error }
// }
