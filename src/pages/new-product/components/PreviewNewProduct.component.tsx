import { useAppSelector } from "../../../app/hooks";

export default function PreviewNewProduct() {
  const iNewProduct = useAppSelector(state => state.newProduct)

  return <div className="flex justify-center flex-col mx-0 md:mx-10 lg:mx-20 mb-20">
    <div className="card bg-[#e3cec4] justify-self-center w-full">
      {iNewProduct.photo
        ? <figure><img className='w-full' src={iNewProduct.photo} /></figure>
        : <></>
      }
      <div className="card-body">
        <h2 className="card-title text-[#734832]">{iNewProduct.name}</h2>
        <p className="text-[#734832]">{iNewProduct.description}</p>
      </div>
    </div>
    <br />
    <div className="card bg-[#e3cec4] justify-self-center w-full">
      <div className="card-body">
        <ul className="list-disc text-[#734832]">
          {iNewProduct.iIngredients?.map((iIngredient, i) =>
            <li key={i}>{iIngredient.name}</li>
          )}
        </ul>
      </div>
    </div>
  </div>
}