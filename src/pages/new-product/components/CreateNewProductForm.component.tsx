import { IProductWithRefs, ProductWithRefs } from "../../../data/product/models/productWithRefs.model"

export default function CreateNewProductForm() {
  const iNewProduct: IProductWithRefs = (new ProductWithRefs()).interfaceWithRefs

  const handleNewProduct = (prop: string, value: any) => {
    // TODO    
  }

  return <div className="flex justify-center flex-col mx-0 md:mx-10 lg:mx-20">
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Nombre</span>
      </label>
      <input
        type="text"
        placeholder="Nombre"
        className="input input-bordered"
        value={iNewProduct.name}
        onChange={e => handleNewProduct('name', e.target.value)}
      />
    </div>

    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Descripción</span>
      </label>
      <textarea
        placeholder="Descripción"
        className="textarea textarea-bordered h-24"
        value={iNewProduct.description || ''}
        onChange={e => handleNewProduct('description', e.target.value)}
      ></textarea>
    </div>
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Foto</span>
      </label>
      <input
        type="text"
        placeholder="Foto"
        className="input input-bordered"
        value={iNewProduct.photo || ''}
        onChange={e => handleNewProduct('photo', e.target.value)}
      />
    </div>
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Ingredientes</span>
      </label>
      <select multiple className="select select-bordered !h-[200px]">
        <option value="1">Opcipon 1</option>
        <option value="2">Opcipon 2</option>
        <option value="3">Opcipon 3</option>
        <option value="4">Opcipon 4</option>
        <option value="5">Opcipon 5</option>
        <option value="6">Opcipon 6</option>
        <option value="7">Opcipon 7</option>
        <option value="8">Opcipon 8</option>
        <option value="9">Opcipon 9</option>
        <option value="10">Opcipon 10</option>
      </select>
    </div>

    <br />
    <div className="w-full text-center">
      <div className="btn btn-primary mb-16 w-full"> Crear Producto</div>
    </div>
  </div>
}