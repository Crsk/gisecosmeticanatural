import { Ingredient } from './../models/ingredient.model';
import { getDocRef } from './../../../utils/base.service';
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { collectionData, docData } from 'rxfire/firestore'
import { combineLatest, map, Observable, of, switchMap } from "rxjs"
import { getCollectionRef } from "../../../utils/base.service"
import { Product, IProduct } from "../models/product.model"
import { getSomeIngredients } from "./ingredient.service"

const COLLECTION_NAME = 'products'

/**
 * Updates (if exists) or inserts (if not exists) a {@link Product} into the database.
 * @param model - The {@link IProduct} model to upsert.
 * @returns a 'Promise' that resolves when the upsert is complete.
 */
export const upsertProduct = (model: IProduct): Promise<void> => {
  const db = getFirestore()
  const productRef = doc(db, 'products', model.id)
  return setDoc(productRef, model, { merge: true })
}

/**
 * Retreives all products, and also each {@link Product} {@link Ingredient} instances.
 * @returns An array of products, each with its newly initialized {@link Ingredient} intances.
 */
export const getProducts = (): Observable<Product[]> => {
  return collectionData(getCollectionRef<IProduct>(COLLECTION_NAME)).pipe(switchMap(iProducts =>
    combineLatest(iProducts.map(iProduct => getProduct(iProduct.id)))
  ))
}

/**
 * Retrieves a {@link Product} by id, and also each {@link Ingredient} instances.
 * @param id - The id of the product.
 * @returns An 'Observable' of a newly initialized {@link Product} instance, also with all its {@link Ingredient} intances.
 */
export const getProduct = (id: string): Observable<Product> => {
  return _getProduct(id).pipe(switchMap(product =>
    combineLatest([product.ingredientIds?.length ? getSomeIngredients(product.ingredientIds) : of([])])
      .pipe(map(([ingredients]) => new Product(product.model, ingredients)))
  ))
}

/**
 * Retrieves a {@link Product} by id
 * Note: This does not retrieve the ingredients for the product,
 * if you need the ingredients, use {@link getProduct} instead.
 * @private
 * @param id - The id of the product.
 * @returns a 'Observable' of a newly initialized {@link Product} instance.
 */
const _getProduct = (id: string): Observable<Product> => {
  return docData(getDocRef<IProduct>(COLLECTION_NAME, id)).pipe(map(iProduct => new Product(iProduct)))
}