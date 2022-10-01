import { useEffect } from 'react'
import Masonry from 'react-masonry-css'
import { Subject } from 'rxjs'
import Product from '../../components/Product.component'
import { getProducts } from '../../data/product/services/product.service'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setProducts } from '../../features/products/productsSlice'
import { Ingredient } from '../../data/product/models/ingredient.model'
import { ProductWithRefs } from '../../data/product/models/productWithRefs.model'

function Products() {
  const breakpointColumnsObj = { default: 4, 1536: 4, 1280: 3, 1024: 3, 768: 2, 640: 2, 540: 1 }
  const unsubscribe: Subject<void> = new Subject()
  const dispatch = useAppDispatch()
  const products = useAppSelector(state => state.products).map(iProduct =>
    new ProductWithRefs(iProduct, iProduct.iIngredients?.map(iIngredient => new Ingredient(iIngredient)))
  )

  useEffect(() => {
    getProducts().subscribe(products =>
      dispatch(setProducts(products.map(product => product.interfaceWithRefs)))
    )

    return () => {
      unsubscribe.next()
      unsubscribe.complete()
    }
  }, [])

  return <div className="mx-4 md:mx-8 lg:mx-12 xl:mx-24">
    <Masonry breakpointCols={breakpointColumnsObj} className="my-masonry-grid" columnClassName="my-masonry-grid_column">{
      products.sort((a, b) => (a.position || Infinity) - (b.position || Infinity)).map(product => {
        return <Product key={product.id} product={product} />
      })
    }</Masonry>
  </div>
}

export default Products