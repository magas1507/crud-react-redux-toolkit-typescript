import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { fromTheme } from "tailwind-merge";
import { UserWithId } from "@/store/users/slice";
import { useUserActions } from "@/hooks/useUserActions";

interface Props {
  user: UserWithId
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditUser({ user, open, onOpenChange }: Props) {
  const { editUser } = useUserActions()

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [github, setGithub] = useState(user.github)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    editUser({ id: user.id, name, email, github })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar usuário</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="github">GitHub username</Label>
            <Input
              id="github"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar alterações</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}