// components/ProductTable.tsx
import Link from 'next/link'
import type { Product } from '@/prisma/generated/prisma/index'

interface ProductTableProps {
  products: Product[]
}

export default function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="border rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Title','SKU','Price','Type','Inventory'].map((h) => (
              <th key={h} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map(p => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link href={`/products/${p.id}/edit`} className="text-blue-600 hover:text-blue-900">
                  {p.title}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{p.sku}</td>
              <td className="px-6 py-4 whitespace-nowrap">${p.price.toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{p.type}</td>
              <td className="px-6 py-4 whitespace-nowrap">{p.inventoryQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
