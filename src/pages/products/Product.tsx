import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import { Subject } from 'rxjs'
import { Product } from '../../data/product/models/product.model'
import { getProducts } from '../../data/product/services/product.service'

function Products() {
  const breakpointColumnsObj = { default: 4, 1536: 4, 1280: 3, 1024: 3, 768: 2, 640: 2, 540: 1 }
  const [products, setProducts] = useState<Product[]>([])
  const unsubscribe: Subject<void> = new Subject()

  useEffect(() => {
    getProducts().subscribe(products => setProducts(products))

    return () => {
      unsubscribe.next()
      unsubscribe.complete()
    }
  }, [])


  /**
   * Toggles the card's text between ingredients and description
   * @param index The card index to identify it
   */
  const _toggleIngredients = (index: number) => {
    products[index].activeOption = products[index].activeOption === 1 ? 2 : 1
    setProducts([...products])
  }

  return <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-24">
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">{
      products.sort((a, b) => (a.position || Infinity) - (b.position || Infinity)).map((item, index) => {
        return <div key={index} className="card bg-base-100">
          {item.photo ? <figure><img className='w-full' src={item.photo} alt="Shoes" /></figure> : <></>}
          <div className="card-body">
            <h2 className="card-title">{item.name}</h2>
            {item.activeOption === 1 ? <p>{item.description}</p> :
              <ul className="list-disc">
                {item.ingredients?.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
              </ul>
            }
            <div className="card-actions justify-end">
              <button className={item.activeOption === 1 ? 'btn btn-neutral' : 'btn btn-primary'} onClick={() => _toggleIngredients(index)}>
                Ingredientes
              </button>
            </div>
          </div>
        </div>
      })
    }</Masonry>
  </div>
}

export default Products