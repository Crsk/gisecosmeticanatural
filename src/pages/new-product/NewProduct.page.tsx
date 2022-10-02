import CreateNewProductForm from "./components/CreateNewProductForm.component"
import PreviewNewProduct from "./components/PreviewNewProduct.component"

function NewProduct() {
  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-32 sm:h-fit md:h-screen">
      <h1 className="text-center text-2xl my-6 text-[#734832] font-semibold">Nuevo Producto</h1>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <CreateNewProductForm />
        <PreviewNewProduct />
      </div>
    </div>
  )
}

export default NewProduct