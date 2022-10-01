import { collection, CollectionReference, doc, DocumentReference, getFirestore, query } from "firebase/firestore"

/**
 * Gets a reference to a collection.
 * @param collectionNane - The name of the collection.
 * @returns A 'CollectionReference' of the given collection name.
 */
export const getCollectionRef = <T>(collectionNane: string) => {
  const db = getFirestore()
  return query(collection(db, collectionNane) as CollectionReference<T>)
}

/**
 * Gets a reference to a document.
 * @param collectionNane - The name of the collection.
 * @param id - The id of the document.
 * @returns A 'DocumentReference' of the given collection name and document id.
 */
export const getDocRef = <T>(collectionNane: string, id: string): DocumentReference<T> => {
  const db = getFirestore()
  return doc(db, `${collectionNane}/${id}`) as DocumentReference<T>
}