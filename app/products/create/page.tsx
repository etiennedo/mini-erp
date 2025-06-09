// app/products/create/page.tsx
import PageHeader from '@/components/PageHeader'
import { CreateProductForm } from '@/components/zod-form'  // à créer, avec Zod, etc.

export default function CreateProductPage() {
  return (
    <div className="container mx-auto py-10">
      <PageHeader
        title="Create new product"
        actionLabel="Save"
        actionHref="#"  // ou gère l’event onSubmit dans ProductForm
      />
      <CreateProductForm />
    </div>
  )
}
