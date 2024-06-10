"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import React from "react"

type Props = {
  className?: string
  variant?: "secondary" | "destructive" | "default" | "outline" | "ghost" | "link"
  children?: React.ReactNode
}

export function LogoutButton({ className, variant = "destructive", children = "Logout" }: Props) {
  return (
    <Button className={className} onClick={() => signOut()} variant={variant}>
      {children}
    </Button>
  )
}