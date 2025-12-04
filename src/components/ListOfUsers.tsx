import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
//importamos la store
import { useAppSelector } from '../hooks/store'
import { useUserActions } from '../hooks/useUserActions';
import { EditUser } from "./EditUser"



export function ListOfUsers() {

  const users = useAppSelector((state) => state.users)
  const { removeUser } = useUserActions()
  const [userToEdit, setUserToEdit] = useState<UserWithId | null>(null)
  //recuperamos la acción con el dispatch
  //esta no es la manera más adecuada, lo mejor es separarlo, porque tienes que estar llamandolo en todos 
  //const dispatch = useDispatch()

  // const handleRemoveUser = (id: User) => {
  //   dispatch(deleteUserByID(id))
  // }
  return (
    <>
      <Card className="max-w-5xl mx-auto mt-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl font-bold">Usuários</CardTitle>
            <Badge variant="secondary" className="text-lg px-3 py-1">
              {users.length}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Avatar</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((item) => (
                  <TableRow key={item.id} className="hover:bg-muted/50">
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={`https://unavatar.io/github/${item.github}`}
                          alt={item.name}
                        />
                        <AvatarFallback>
                          {item.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setUserToEdit(item)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                          </svg>
                        </button>
                        <button onClick={() => removeUser(item.id)} type="button">
                          <svg
                            aria-label='Remove element'
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {userToEdit && (
        <EditUser
          user={userToEdit}
          open={true}
          onOpenChange={(open) => {
            if (!open) setUserToEdit(null)
          }}
        />
      )}
    </>
  )
}