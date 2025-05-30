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
import { authClient } from "../../lib/auth-client"

type FormType = "login" | "signup"

export function LoginForm({
    className,
    formType = "login", // default to login
    ...props
}: React.ComponentProps<"div"> & { formType?: FormType }) {
  // state to store form data
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formType === "signup") {
      try {
        const { data, error } = await authClient.signUp.email({
          email,        // user email address
          password,     // user password -> min 8 characters by default
          name,         // user display name
          callbackURL: "/" // URL to redirect after verification
        }, {
          onRequest: (ctx) => {
            // show loading indicator
          },
          onSuccess: (ctx) => {
            // redirect to the dashboard or sign in page
          },
          onError: (ctx) => {
            // display the error message
            alert(ctx.error.message)
          },
        })
      } catch (err) {
        console.error(err)
      }
    } else if (formType === 'login' ) {
      const { data, error } = await authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: false
      }, {
          //callbacks
      })
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
                <Button type="submit" className="w-full">
                  {formType === "login" ? "Login" : "Sign up"}
                </Button>
                {formType === "login" && (
                  <Button variant="outline" className="w-full">
                    Login with Google
                  </Button>
                )}
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