import { IIngredient, Ingredient } from './ingredient.model'
import { Product, IProduct } from './product.model'

export interface IProductWithRefs extends IProduct {
  iIngredients: IIngredient[] | null
}

export class ProductWithRefs extends Product {
  /**
   * Represent a {@link Product} with all of its references initialized.
   * @see {@link Ingredient} reference.
   */
  constructor(iProduct?: IProduct, public ingredients?: Ingredient[]) {
    super(iProduct)
  }

  get interfaceWithRefs(): IProductWithRefs {
    return {
      ...super.interface,
      iIngredients: this.ingredients?.map(ingredient => ingredient.interface) || null
    }
  }
}