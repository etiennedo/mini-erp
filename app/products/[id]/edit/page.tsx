import { ProductForm } from "@/components/zod-form"

export default function EditProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <ProductForm formType="update" />
    </div>
  )
} 