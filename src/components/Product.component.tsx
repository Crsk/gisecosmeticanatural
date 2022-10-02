import { useState } from 'react'
import { ProductWithRefs } from '../data/product/models/productWithRefs.model'

export default function Product(props: { product: ProductWithRefs }) {
  const [products, setProducts] = useState<ProductWithRefs[]>([])
  const { product } = props

  /**
   * Toggles the card's text between ingredients and description
   * @param product - The product to toggle its section
   */
  const _toggleIngredients = (product: ProductWithRefs) => {
    product.activeOption = product.activeOption === 1 ? 2 : 1
    setProducts([...products])
  }

  return !product.name ? <></> : <div key={product.id}>
    {product.photo ? <figure><img className='w-full' src={product.photo} /></figure> : <></>}
    <div className="card-body">
      <h2 className="card-title text-[#734832]">{product.name}</h2>
      {product.activeOption === 1 ? <p className="text-[#734832]">{product.description}</p> :
        <ul className="list-disc text-[#734832]">
          {product.ingredients?.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
        </ul>
      } {product.ingredientIds?.length ? /** Hide 'Ingredients' button if none */
        <div className="card-actions justify-end">
          <button className={product.activeOption === 1 ? 'btn btn-secondary' : 'btn btn-primary'} onClick={() => _toggleIngredients(product)}>
            Ingredientes
          </button>
        </div>
        : <></>
      }
    </div>
  </div>
}