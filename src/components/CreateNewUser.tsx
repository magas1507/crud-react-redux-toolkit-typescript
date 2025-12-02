import { Button, Card, TextInput, Title } from "@tremor/react";
import { useState } from "react";
import { useUserActions } from '../hooks/useUserActions'
import type React from "react";
import { Badge } from "./Badge";


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
    <Card style={{ marginTop: '16px' }}>
      <Title> Create new user</Title>

      <form onSubmit={handleSubmit}>
        <TextInput
          name="name"
          placeholder="Name"

        />
        <TextInput
          name="email"
          placeholder="Email"

        />
        <TextInput
          name="github"
          placeholder="User github"

        />
        <div>
          <Button
            type="submit"
            style={{ marginTop: 16 }}
          >
            crear usuario
          </Button>
          <span>
            {result === 'ok' && <Badge color="green"> guardado correctamente </Badge>}
            {result === 'ko' && <Badge color="red"> error en los campos </Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}