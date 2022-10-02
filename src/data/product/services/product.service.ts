import { Ingredient } from './../models/ingredient.model';
import { getDocRef } from './../../../utils/base.service';
import { doc, getFirestore, setDoc } from "firebase/firestore"
import { collectionData, docData } from 'rxfire/firestore'
import { combineLatest, map, Observable, of, switchMap } from "rxjs"
import { getCollectionRef } from "../../../utils/base.service"
import { Product, IProduct } from "../models/product.model"
import { getSomeIngredients } from "./ingredient.service"
import { ProductWithRefs } from '../models/productWithRefs.model';
import { generateId } from '../../../utils/helper';

const COLLECTION_NAME = 'products'

/**
 * Updates (if exists) or inserts (if not exists) a {@link Product} into the database.
 * @param model - The {@link IProduct} model to upsert.
 * @returns a 'Promise' that resolves when the upsert is complete.
 */
export const upsertProduct = (model: IProduct): Promise<void> => {
  const db = getFirestore()
  model.id = model.id || generateId()
  const productRef = doc(db, 'products', model.id)
  return setDoc(productRef, model, { merge: true })
}

/**
 * Retreives all {@link ProductWithRefs} from database, (includes all their {@link Ingredient} intances).
 * @returns An array of {@link ProductWithRefs}, each with its newly initialized {@link Ingredient} intances.
 */
export const getProducts = (): Observable<ProductWithRefs[]> => {
  return collectionData(getCollectionRef<IProduct>(COLLECTION_NAME)).pipe(switchMap(iProducts =>
    combineLatest(iProducts.map(iProduct => getProduct(iProduct.id)))
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
      .pipe(map(([ingredients]) => new ProductWithRefs(product.interface, ingredients)))
  ))
}

/**
 * Retrieves a {@link Product} by id without references
 * @see {@link getProduct} to retrieve {@link ProductWithRefs} instead.
 * @param id - The id of the product.
 * @returns a 'Observable' of a newly initialized {@link Product} instance.
 */
const getProductWithoutRefs = (id: string): Observable<Product> => {
  return docData(getDocRef<IProduct>(COLLECTION_NAME, id)).pipe(map(iProduct => new ProductWithRefs(iProduct)))
}