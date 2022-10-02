import CreateNewProductForm from "./components/CreateNewProductForm.component"
import PreviewNewProduct from "./components/PreviewNewProduct.component"

function NewProduct() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32">
      <h1 className="text-center text-2xl my-6">Nuevo Producto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <CreateNewProductForm />
        <PreviewNewProduct />
      </div>
    </div>
  )
}

export default NewProduct