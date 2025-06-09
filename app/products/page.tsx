import PageHeader from '@/components/PageHeader'
import ProductTable from '@/components/ProductTable'
import { getProducts } from '../actions'

export default async function ProductsPage() {
  const { products, error } = await getProducts()

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <div className="container mx-auto py-10">
      <PageHeader
        title="Products"
        actionLabel="Create Product"
        actionHref="/products/create"
      />
      <ProductTable products={products ?? []} />
    </div>
  )
}
