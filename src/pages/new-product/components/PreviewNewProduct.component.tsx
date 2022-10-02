import { useAppSelector } from "../../../app/hooks";

export default function PreviewNewProduct() {
  const iNewProduct = useAppSelector(state => state.newProduct)

  return <div className="bg-blue">
    <div className="flex justify-center flex-col mx-0 md:mx-10 lg:mx-20 mb-20">
      <div className="card bg-base-200 justify-self-center w-full">
        {iNewProduct.photo
          ? <figure><img className='w-full' src={iNewProduct.photo} /></figure>
          : <></>
        }
        <div className="card-body">
          <h2 className="card-title">{iNewProduct.name}</h2>
          <p>{iNewProduct.description}</p>
        </div>
      </div>
      <br />
      <div className="card bg-base-200 justify-self-center w-full">
        <div className="card-body">
          <ul className="list-disc">
            {iNewProduct.iIngredients?.map((iIngredient, i) =>
              <li key={i}>{iIngredient.name}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  </div>
}