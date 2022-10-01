import { Observable } from 'rxjs'
import { collection, CollectionReference, doc, DocumentReference, getFirestore, setDoc } from "firebase/firestore"
import { collectionData, docData } from 'rxfire/firestore'
import { User } from '../models/user.class'
import { IUser } from '../models/user.interface'

export const upsertUser = (model: IUser): Promise<void> => {
  const db = getFirestore()
  const userRef = doc(db, 'users', model.uid)
  return setDoc(userRef, model, { merge: true })
}

export const getUsers = (): Observable<User[]> => {
  const db = getFirestore()
  const usersRef: CollectionReference<User> = collection(db, 'users') as CollectionReference<User>
  return collectionData(usersRef)
}


export const getUser = (uid: string): Observable<User> => {
  const db = getFirestore()
  const docRef: DocumentReference<User> = doc(db, `users/${uid}`) as DocumentReference<User>
  return docData(docRef)
}