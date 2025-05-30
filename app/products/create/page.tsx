import { ProductForm } from "@/components/zod-form"

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Create New Product</h1>
      <ProductForm formType="create" />
    </div>
  )
} 