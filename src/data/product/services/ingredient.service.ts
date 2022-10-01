import { doc, getFirestore, setDoc } from "firebase/firestore"
import { collectionData, docData } from "rxfire/firestore"
import { map, Observable } from "rxjs"
import { Ingredient, IIngredient } from "../models/ingredient.model"
import { getCollectionRef, getDocRef } from "../../../utils/base.service"

const COLLECTION_NAME = 'ingredients'

/**
 * Updates (if exists) or inserts (if not exists) a {@link Ingredient} into the database.
 * @param model - The {@link IIngredient} model to upsert.
 * @returns a 'Promise' that resolves when the upsert is complete.
 */
export const upsertIngredient = (model: IIngredient): Promise<void> => {
  const db = getFirestore()
  const ingredientRef = doc(db, COLLECTION_NAME, model.id)
  return setDoc(ingredientRef, model, { merge: true })
}

/**
 * Retrieves all {@link Ingredient} initialized instances.
 * @returns An 'Observable' of an array of {@link Ingredient} instances.
 */
export const getIngredients = (): Observable<Ingredient[]> => {
  return collectionData(getCollectionRef<IIngredient>(COLLECTION_NAME))
    .pipe(map(iIngredients => iIngredients.map(iIngredient => new Ingredient(iIngredient))))
}

/**
 * Retrieves all the {@link Ingredient} initialized instances according to the given ids.
 * @param ingredientIds - An array of ingredient ids.
 * @returns An 'Observable' of an array of {@link Ingredient} instances.
 */
export const getSomeIngredients = (ingredientIds: string[]): Observable<Ingredient[]> => {
  return collectionData(getCollectionRef<IIngredient>(COLLECTION_NAME))
    // Firebase supports querying by multiple ids, but they limit it to 10 (TODO use getMany with 10 at a time)
    .pipe(map(iIngredients => iIngredients.filter(iIngredient => ingredientIds.includes(iIngredient.id))
      .map(iIngredient => new Ingredient(iIngredient))
    ))
}

/**
 * Retrieves a {@link Ingredient} initialized intance.
 * @param id - The id of the ingredient.
 * @returns An 'Observable' of a newly initialized {@link Ingredient} instance.
 */
export const getIngredient = (id: string): Observable<Ingredient> => {
  return docData(getDocRef<IIngredient>(COLLECTION_NAME, id))
    .pipe(map(iIngredient => new Ingredient(iIngredient)))
}