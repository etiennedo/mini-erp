"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const productCreationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  price: z.number({ invalid_type_error: "Price must be a number" }),
  type: z.string().min(1, { message: "Type is required" }),
  inventoryQuantity: z.number({ invalid_type_error: "Inventory quantity must be a number" }),
  minQuantity: z.number({ invalid_type_error: "Min quantity must be a number" }),
})

const productUpdateSchema = z.object({
  id: z.number({ invalid_type_error: "ID must be a number" }),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  sku: z.string().min(1).optional(),
  price: z.number().optional(),
  type: z.string().min(1).optional(),
  inventoryQuantity: z.number().optional(),
  minQuantity: z.number().optional(),
})

export function CreateProductForm() {
  const form = useForm<z.infer<typeof productCreationSchema>>({
    resolver: zodResolver(productCreationSchema),
    defaultValues: {
      title: "",
      description: "",
      sku: "",
      price: 0,
      type: "",
      inventoryQuantity: 0,
      minQuantity: 0,
    },
  })

  function onSubmit(values: z.infer<typeof productCreationSchema>) {
    console.log("Creating product:", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormDescription>This is the product name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Short description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>SKU</FormLabel>
              <FormControl>
                <Input placeholder="SKU code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" placeholder="0.00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Input placeholder="Product type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="inventoryQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inventory Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="minQuantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Min Quantity</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Product</Button>
      </form>
    </Form>
  )
}

export function UpdateProductForm() {
  const form = useForm<z.infer<typeof productUpdateSchema>>({
    resolver: zodResolver(productUpdateSchema),
    defaultValues: {
      id: 0,
      title: "",
      description: "",
      sku: "",
      price: 0,
      type: "",
      inventoryQuantity: 0,
      minQuantity: 0,
    },
  })

  function onSubmit(values: z.infer<typeof productUpdateSchema>) {
    console.log("Updating product:", values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Reuse same fields as creation */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Product title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ...description, sku, price, type, inventoryQuantity, minQuantity fields omitted for brevity */}
        <Button type="submit">Update Product</Button>
      </form>
    </Form>
  )
}

export type ProductFormType = "create" | "update"
interface ProductFormProps {
  formType: ProductFormType
}

export function ProductForm({ formType }: ProductFormProps) {
  return formType === "create" ? <CreateProductForm /> : <UpdateProductForm />
}
