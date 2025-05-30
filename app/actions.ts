"use server"

import { PrismaClient } from "./generated/prisma"
import { auth } from "../lib/auth"
import { headers } from "next/headers"

const prisma = new PrismaClient()

export async function getProducts() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session) {
      return { error: 'Not authenticated' }
    }

    const products = await prisma.product.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return { products }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { error: 'Failed to fetch products' }
  }
} 