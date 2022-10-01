import { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import { Subject } from 'rxjs'
import Product from '../../components/Product.component'
import { getProducts } from '../../data/product/services/product.service'
import { Product as ProductClass } from '../../data/product/models/product.model'

function Products() {
  const breakpointColumnsObj = { default: 4, 1536: 4, 1280: 3, 1024: 3, 768: 2, 640: 2, 540: 1 }
  const [products, setProducts] = useState<ProductClass[]>([])  
  const unsubscribe: Subject<void> = new Subject()

  useEffect(() => {
    getProducts().subscribe(products => setProducts(products))

    return () => {
      unsubscribe.next()
      unsubscribe.complete()
    }
  }, [])

  return <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-24">
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">{
      products.sort((a, b) => (a.position || Infinity) - (b.position || Infinity)).map(product => {
        return <Product product={product} />
      })
    }</Masonry>
  </div>
}

export default Products