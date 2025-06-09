"use client"

import React, { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

type FormType = "login" | "signup"

export function LoginForm({
    className,
    formType = "login",
    ...props
}: React.ComponentProps<"div"> & { formType?: FormType }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setErrorMessage(null)

  try {
    if (formType === "signup") {
      const { data, error } = await authClient.signUp.email({
        email,
        password,
        name,
        callbackURL: "/"
      }, {
        onRequest: (ctx) => {},
        onSuccess: (ctx) => {},
        onError: (ctx) => {
          setErrorMessage(ctx.error?.message || "An unknown error occurred.")
        },
      })
      if (error) setErrorMessage(error?.message || "An unknown error occurred.")
    } else if (formType === 'login') {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
        rememberMe: false
      }, {
        onError: (ctx) => {
          setErrorMessage(ctx.error?.message || "An unknown error occurred.")
        }
      })
      if (error) setErrorMessage(error?.message || "An unknown error occurred.")
    }
  } catch (err) {
    setErrorMessage("An unknown error occurred.")
    console.error(err)
  } finally {
    setLoading(false)
  }
}

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>
            {formType === "login" ? "Login to your account" : "Sign up for an account"}
          </CardTitle>
          <CardDescription>
            {formType === "login"
              ? "Enter your email below to login to your account"
              : "Enter your email below to create a new account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {errorMessage && (
                <div className="text-red-600 text-sm mb-4 text-center">
                  {errorMessage}
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {formType === "signup" && (
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Your Name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              )}
              <div className="grid gap-3">
                {formType === "login" && (
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                )}
                {formType === "signup" && (
                  <Label htmlFor="password">Create a Password</Label>
                )}
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                      </svg>
                      Loading...
                    </span>
                  ) : (
                    formType === "login" ? "Login" : "Sign up"
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              {formType === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <a href="/auth/signup" className="underline underline-offset-4">
                    Sign up
                  </a>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <a href="/auth/login" className="underline underline-offset-4">
                    Login
                  </a>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}