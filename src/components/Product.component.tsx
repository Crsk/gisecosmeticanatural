import { useState } from 'react'
import { Product as ProductClass } from '../data/product/models/product.model'

export default function Product(props: { product: ProductClass }) {
  const [products, setProducts] = useState<ProductClass[]>([])
  const { product } = props

  /**
   * Toggles the card's text between ingredients and description
   * @param product - The product to toggle its section
   */
  const _toggleIngredients = (product: ProductClass) => {
    product.activeOption = product.activeOption === 1 ? 2 : 1
    setProducts([...products])
  }

  return <div key={product.id} className="card bg-base-100">
    {product.photo ? <figure><img className='w-full' src={product.photo} alt="Shoes" /></figure> : <></>}
    <div className="card-body">
      <h2 className="card-title">{product.name}</h2>
      {product.activeOption === 1 ? <p>{product.description}</p> :
        <ul className="list-disc">
          {product.ingredients?.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
        </ul>
      }
      <div className="card-actions justify-end">
        <button className={product.activeOption === 1 ? 'btn btn-neutral' : 'btn btn-primary'} onClick={() => _toggleIngredients(product)}>
          Ingredientes
        </button>
      </div>
    </div>
  </div>
}