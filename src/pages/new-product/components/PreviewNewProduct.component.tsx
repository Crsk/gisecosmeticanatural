import { IProductWithRefs, ProductWithRefs } from "../../../data/product/models/productWithRefs.model";

export default function PreviewNewProduct() {
  const iNewProduct: IProductWithRefs = (new ProductWithRefs()).interfaceWithRefs

  return <div className="bg-blue">
    <div className="flex justify-center flex-col mx-0 md:mx-10 lg:mx-20 mb-20">
      <div className="card bg-base-200 justify-self-center w-full">
        {iNewProduct.photo ? <figure><img className='w-full' src={iNewProduct.photo} /></figure> : <></>}
        <div className="card-body">
          <h2 className="card-title">{iNewProduct.name}</h2>
          <p>{iNewProduct.description}</p>
        </div>
      </div>
      <br />
      <div className="card bg-base-200 justify-self-center w-full">
        <div className="card-body">
          <ul className="list-disc">
            {[{ id: 1, name: 'Ingrediente 1' }, { id: 2, name: 'Ingrediente 2' }, { id: 3, name: 'Ingrediente 3' }].map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
          </ul>
        </div>
      </div>
    </div>
  </div>
}