export interface IIngredient {
  id: string
  name: string
  type: string
  description: string | null
  photo: string | null
  price: number | null
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

  get interface(): IIngredient {
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