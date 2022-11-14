export interface ProductJSON {
  id: string
  name: string
  description: string | null
  ingredientIds: string[] | null
  photo: string | null
  position: number | null
}

export class Product implements ProductJSON {
  id: string = ''
  name: string = ''
  ingredientIds: string[] | null = null
  description: string | null = null
  photo: string | null = null
  position: number | null = null
  /**
   * temporary property (don't persist it) used to determine which option is active
   */
  activeOption: 'DESCRIPTION' | 'INGREDIENTS' = 'DESCRIPTION'


  constructor(product?: ProductJSON) {
    Object.assign(this, product)
  }

  get json(): ProductJSON {
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