import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react";
import { useUserActions } from '../hooks/useUserActions'
import type React from "react";


export function CreateNewUser() {

  const { addUser } = useUserActions()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      return setResult('ko')
    }
    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }


  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Create new user</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="name"
            placeholder="Name"
            className="mb-3"
            required
          />

          <Input
            name="email"
            type="email"
            placeholder="Email"
            className="mb-3"
            required
          />

          <Input
            name="github"
            placeholder="User github"
            className="mb-6"
            required
          />

          <div className="flex items-center gap-4">
            <Button type="submit">
              crear usuario
            </Button>

            {result === "ok" && (
              <Badge className="bg-green-600 text-white">
                guardado correctamente
              </Badge>
            )}

            {result === "ko" && (
              <Badge className="bg-red-600 text-white">
                error en los campos
              </Badge>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}