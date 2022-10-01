export interface IProduct {
  id: string
  name: string
  description: string | null
  ingredientIds: string[] | null
  photo: string | null
  position: number | null
}

export class Product implements IProduct {
  id: string = ''
  name: string = ''
  ingredientIds: string[] | null = null
  description: string | null = null
  photo: string | null = null
  position: number | null = null
  /**
   * Local-only property used to determine which option is active
   */
  activeOption: number = 1


  constructor(iProduct: IProduct) {
    Object.assign(this, iProduct)
  }

  get interface(): IProduct {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      photo: this.photo,
      ingredientIds: this.ingredientIds,
      position: this.position
    }
  }
}