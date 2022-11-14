import { Ingredient } from './../models/ingredient.model';
import { getDocRef } from './../../../utils/base.service';
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { collectionData, docData } from 'rxfire/firestore'
import { combineLatest, map, Observable, of, switchMap } from "rxjs"
import { getCollectionRef } from "../../../utils/base.service"
import { Product, ProductJSON } from "../models/product.model"
import { getSomeIngredients } from "./ingredient.service"
import { ProductWithRefs } from '../models/productWithRefs.model';
import { generateId } from '../../../utils/helper';

const COLLECTION_NAME = 'products'

/**
 * Updates (if exists) or inserts (if not exists) a {@link Product} into the database.
 * @param product - The {@link ProductJSON} to upsert.
 * @returns a 'Promise' that resolves when the upsert is complete.
 */
export const upsertProduct = (product: ProductJSON): Promise<void> => {
  const db = getFirestore()
  product.id = product.id || generateId()
  const productRef = doc(db, 'products', product.id)
  return setDoc(productRef, product, { merge: true })
}

/**
 * Retreives all {@link ProductWithRefs} from database, (includes all their {@link Ingredient} intances).
 * @returns An array of {@link ProductWithRefs}, each with its newly initialized {@link Ingredient} intances.
 */
export const getProducts = (): Observable<ProductWithRefs[]> => {
  return collectionData(getCollectionRef<ProductJSON>(COLLECTION_NAME)).pipe(switchMap(products =>
    combineLatest(products.map(product => getProduct(product.id)))
  ))
}

/**
 * Retrieves a {@link ProductWithRefs} by id (includes all its {@link Ingredient} intances).
 * @param id - The id of the product.
 * @returns An 'Observable' of a newly initialized {@link ProductWithRefs} instance.
 */
export const getProduct = (id: string): Observable<ProductWithRefs> => {
  return getProductWithoutRefs(id).pipe(switchMap(product =>
    combineLatest([product.ingredientIds?.length ? getSomeIngredients(product.ingredientIds) : of([])])
      .pipe(map(([ingredients]) => new ProductWithRefs(product.json, ingredients)))
  ))
}

/**
 * Retrieves a {@link Product} by id without references
 * @see {@link getProduct} to retrieve {@link ProductWithRefs} instead.
 * @param id - The id of the product.
 * @returns a 'Observable' of a newly initialized {@link Product} instance.
 */
const getProductWithoutRefs = (id: string): Observable<Product> => {
  return docData(getDocRef<ProductJSON>(COLLECTION_NAME, id)).pipe(map(product => new ProductWithRefs(product)))
}