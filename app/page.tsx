import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

export default async function Home() {
  const session = await auth.api.getSession({ headers: await headers() })

  if (!session) {
    // pas connecté → page login
    redirect('/auth/login')
  }

  // connecté → on bascule vers /products
  redirect('/products')
}
