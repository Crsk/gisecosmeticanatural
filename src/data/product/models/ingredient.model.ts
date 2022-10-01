export interface IIngredient {
  id: string
  name: string
  description: string | null
  photo: string | null
  price: number | null
  type: string | null
}

export class Ingredient implements IIngredient {
  id: string = ''
  name: string = ''
  type: string = ''
  description: string | null = null
  photo: string | null = null
  price: number | null = null

  constructor(iIngredient: IIngredient) {
    Object.assign(this, iIngredient)
  }

  get model(): IIngredient {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      photo: this.photo,
      price: this.price,
      type: this.type
    }
  }
}