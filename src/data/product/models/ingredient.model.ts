export interface IngredientJSON {
  id: string
  name: string
  type: string
  description: string | null
  photo: string | null
  price: number | null
}

export class Ingredient implements IngredientJSON {
  id: string = ''
  name: string = ''
  type: string = ''
  description: string | null = null
  photo: string | null = null
  price: number | null = null

  constructor(ingredient: IngredientJSON) {
    Object.assign(this, ingredient)
  }

  get json(): IngredientJSON {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
      description: this.description,
      photo: this.photo,
      price: this.price
    }
  }
}