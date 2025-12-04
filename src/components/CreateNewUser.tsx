import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"
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
    <Card className="w-full max-w-md mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-2xl">Crear nuevo usuário</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center gap-2 text-green-600 animate-in slide-in-from-right">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-medium">Usuário creado!</span>
              </div>
            )}

            {result === "ko" && (
              <div className="flex items-center gap-2 text-red-600 animate-in slide-in-from-right">s
                <XCircle className="h-5 w-5" />
                <span className="font-medium">Llena todos os campos!</span>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}