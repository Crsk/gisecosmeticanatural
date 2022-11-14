import { doc, getFirestore, setDoc } from "firebase/firestore"
import { collectionData, docData } from "rxfire/firestore"
import { map, Observable } from "rxjs"
import { Ingredient, IngredientJSON } from "../models/ingredient.model"
import { getCollectionRef, getDocRef } from "../../../utils/base.service"

const COLLECTION_NAME = 'ingredients'

/**
 * Updates (if exists) or inserts (if not exists) a {@link Ingredient} into the database.
 * @param json - The {@link IngredientJSON} to upsert.
 * @returns a 'Promise' that resolves when the upsert is complete.
 */
export const upsertIngredient = (json: IngredientJSON): Promise<void> => {
  const db = getFirestore()
  const ingredientRef = doc(db, COLLECTION_NAME, json.id)
  return setDoc(ingredientRef, json, { merge: true })
}

/**
 * Retrieves all {@link Ingredient} initialized instances.
 * @returns An 'Observable' of an array of {@link Ingredient} instances.
 */
export const getIngredients = (): Observable<Ingredient[]> => {
  return collectionData(getCollectionRef<IngredientJSON>(COLLECTION_NAME))
    .pipe(map(ingredients => ingredients.map(ingredient => new Ingredient(ingredient))))
}

/**
 * Retrieves all the {@link Ingredient} initialized instances according to the given ids.
 * @param ingredientIds - An array of ingredient ids.
 * @returns An 'Observable' of an array of {@link Ingredient} instances.
 */
export const getSomeIngredients = (ingredientIds: string[]): Observable<Ingredient[]> => {
  return collectionData(getCollectionRef<IngredientJSON>(COLLECTION_NAME))
    // Firebase supports querying by multiple ids, but they limit it to 10 (TODO use getMany with 10 at a time)
    .pipe(map(ingredients => ingredients.filter(ingredient => ingredientIds.includes(ingredient.id))
      .map(ingredient => new Ingredient(ingredient))
    ))
}

/**
 * Retrieves a {@link Ingredient} initialized intance.
 * @param id - The id of the ingredient.
 * @returns An 'Observable' of a newly initialized {@link Ingredient} instance.
 */
export const getIngredient = (id: string): Observable<Ingredient> => {
  return docData(getDocRef<IngredientJSON>(COLLECTION_NAME, id))
    .pipe(map(ingredient => new Ingredient(ingredient)))
}