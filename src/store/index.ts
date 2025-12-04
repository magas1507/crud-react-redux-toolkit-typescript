import {configureStore, type Middleware} from "@reduxjs/toolkit"

//importamos el reducer
import usersReducer, {rollbackUser, deleteUserById}  from "./users/slice";
import { UserWithId } from "@/store/users/slice";
import { toast } from "sonner";


//creamos el middleware 
const persistanceLocalStorageMiddleware: Middleware = (store)=>(next)=>(action)=>{
	// next(action)

	// localStorage.setItem("_redux_state_",JSON.stringify(store.getState()))
   const result = next(action);
  localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
  return result;
}
const syncWithDataBase: Middleware =(store) => (next) => (action:unknown)  => {
  //fase 1
  const previousState = store.getState()

  //fase 2
   next(action)
  
   if(deleteUserById.match(action)){//<--eliminando el usuario 

    const userIdToRemove = action.payload
    const userToRemove = previousState.users.find((user: UserWithId) => user.id === userIdToRemove)
    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method:'DELETE'
    })
    .then(res => {
      if (res.ok) {
        toast.success(`Usuário eliminado com sucesso!`)
        
      }
    })
    .catch(err => {
      toast.error(`Error deleting user ${userIdToRemove}`)
      if (userToRemove) {
        store.dispatch(rollbackUser(userToRemove))
        console.error(err)
      }
    })
   }  
}
//de esta manera ya tenemos nuestra store preparada para trabajar con los usuarios 
export const store = configureStore({
  reducer: {
    //cuando es llamado el store para usarlo, se coloca igual a como lo usas aqui 
    users: usersReducer
  },
 middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(persistanceLocalStorageMiddleware)
      .concat(syncWithDataBase)
})

//Estamos diciendo que de de la función store.getState de ese type el tipo que devuelve sea RootState
//ReturnType: es el tipo que devuelve la función
// tienes que decirle de que store que esta usando tiene que recuperar el tipo
export type RootState = ReturnType<typeof store.getState>

// hacemos lo mismo con el dispatch
export type AppDispatch = typeof store.dispatch