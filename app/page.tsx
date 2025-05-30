import { getProducts } from "./actions"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Product } from "../app/generated/prisma/index"

export default async function Home() {
  const { products, error } = await getProducts()

  if (error === 'Not authenticated') {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Product Management</h1>
          <p className="mb-6">Please log in to view and manage your products.</p>
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
            <Link href="/auth/signup">
              <Button variant="outline">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/create">
          <Button>Create Product</Button>
        </Link>
      </div>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="border rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products?.map((product: Product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link href={`/products/${product.id}/edit`} className="text-blue-600 hover:text-blue-900">
                      {product.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.sku}</td>
                  <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{product.inventoryQuantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
