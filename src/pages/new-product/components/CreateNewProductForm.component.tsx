import { useEffect, useState } from "react"
import { Subject, takeUntil } from "rxjs"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { Ingredient } from "../../../data/product/models/ingredient.model"
import { getIngredients } from "../../../data/product/services/ingredient.service"
import { newProduct, resetNewProduct } from "../../../features/products/newProductSlice"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { upsertProduct } from "../../../data/product/services/product.service"
import { Product } from "../../../data/product/models/product.model"
import toast from "react-hot-toast"

type SelectValue = { label: string, value: string }

export default function CreateNewProductForm() {
  const dispatch = useAppDispatch()
  const iNewProduct = useAppSelector(state => state.newProduct)
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const unsubscribe: Subject<void> = new Subject()

  const _handleNewProduct = (prop: string, value: any) => {
    dispatch(newProduct({ [prop]: value }))
  }

  const _handleSelectChange = (value: SelectValue[]) => {
    dispatch(newProduct({
      ingredientIds: value.map(x => x.value), // Used to save the ingredients on database
      iIngredients: value.map(x => ({ name: x.label })) // Used to preview the ingredients
    }))
  }

  const _handleProductCreation = async () => {
    const product = new Product(iNewProduct)
    await toast.promise(
      upsertProduct(product.interface), {
      loading: 'Creando...',
      success: <b>Listo!</b>,
      error: <b>Ups! algo anda mal...</b>
    }, { style: { borderRadius: '10px', background: '#16a085', color: '#fff' } })
    dispatch(resetNewProduct())
  }

  useEffect(() => {
    getIngredients().pipe(takeUntil(unsubscribe))
      .subscribe(ingredients => setIngredients(ingredients))

    return () => {
      unsubscribe.next()
      unsubscribe.complete()
    }
  }, [])

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
        onChange={e => _handleNewProduct('name', e.target.value)}
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
        onChange={e => _handleNewProduct('description', e.target.value)}
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
        onChange={e => _handleNewProduct('photo', e.target.value)}
      />
    </div>
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text">Ingredientes</span>
      </label>
      <Select
        placeholder=''
        closeMenuOnSelect={true}
        isMulti
        components={makeAnimated()}
        onChange={e => _handleSelectChange(e as SelectValue[])}
        options={ingredients.map(ingredient => ({ value: ingredient.id, label: ingredient.name }))}
      />
    </div>

    <br />
    <div className="w-full text-center">
      <button className="btn btn-primary mb-16 w-full" onClick={_handleProductCreation}
        disabled={!iNewProduct.name}>Crear Producto</button>
    </div>
  </div>
}