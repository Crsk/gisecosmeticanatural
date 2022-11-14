import { Ingredient, IngredientJSON } from './ingredient.model'
import { Product, ProductJSON } from './product.model'

export interface ProductWithRefsJSON extends ProductJSON {
  ingredients: IngredientJSON[] | null
}

export class ProductWithRefs extends Product {
  /**
   * Represent a {@link Product} with all of its references initialized.
   * @see {@link Ingredient} reference.
   */
  constructor(product?: ProductJSON, public ingredients?: Ingredient[]) {
    super(product)
  }

  get jsonWithRefs(): ProductWithRefsJSON {
    return {
      ...super.json,
      ingredients: this.ingredients?.map(ingredient => ingredient.json) || null
    }
  }
}