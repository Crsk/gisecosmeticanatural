import { Ingredient } from "./ingredient.model"

export interface IProduct {
  id: string
  name: string
  description: string | null
  ingredientIds: string[] | null
  photo: string | null
}

export class Product implements IProduct {
  id: string = ''
  name: string = ''
  ingredientIds: string[] | null = null
  description: string | null = null
  photo: string | null = null

  constructor(iProduct: IProduct, public ingredients: Ingredient[] | null = null) {
    Object.assign(this, iProduct)
  }

  get model(): IProduct {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      photo: this.photo,
      ingredientIds: this.ingredientIds
    }
  }
}