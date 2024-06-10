"use client"

import { useEffect, useState } from "react"

type User = {
  id: string
  first_name: string
  last_name: string
  email: string
  role: string
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/user")
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {
        loading ? <p>Loading...</p> : <pre>{JSON.stringify(users, null, 2)}</pre>
      }
    </div>
  )
}