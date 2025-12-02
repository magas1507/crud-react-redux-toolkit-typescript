import {configureStore, type Middleware} from "@reduxjs/toolkit"

//importamos el reducer
import usersReducer, {rollbackUser}  from "./users/slice";
import App from '../App';
import { toast } from "sonner";


//creamos el middleware 
const persistanceLocalStorageMiddleware: Middleware = (store)=>(next)=>(action)=>{
	// next(action)

	// localStorage.setItem("_redux_state_",JSON.stringify(store.getState()))
   const result = next(action);
  localStorage.setItem("_redux_state_", JSON.stringify(store.getState()));
  return result;
}
const syncWithDataBase: Middleware =(store) => (next) => (action)  => {
  //fase 1
  const { type, payload } = action;
  const previousState = store.getState()

  //fase 2
   next(action)
  
   if(type === 'users/deleteUserById'){//<--eliminando el usuario 
    const userIdToRemove = payload
		const userToRemove = previousState.users.find(user => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method:'Delete'
    })
    .then(res =>{
      if(res.ok){
        toast.success(`usuario con el ${payload} eliminado correctamente`)
      }
      throw new Error('Error delecting user')
    })
    .catch(err=>{
      toast.error(`Error deleting user ${userIdToRemove}`)
      if(userToRemove) store.dispatch(rollbackUser(userToRemove))
      console.log(err)
      console.log('Error')
    })
   }

    console.log(store.getState())
  
}
//de esta manera ya tenemos nuestra store preparada para trabajar con los usuarios 
export const store = configureStore({
  reducer: {
    //cuando es llamado el store para usarlo, se coloca igual a como lo usas aqui 
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => {

    return getDefaultMiddleware().concat(
    persistanceLocalStorageMiddleware,
    syncWithDataBase
  )
  },
})

//Estamos diciendo que de de la función store.getState de ese type el tipo que devuelve sea RootState
//ReturnType: es el tipo que devuelve la función
// tienes que decirle de que store que esta usando tiene que recuperar el tipo
export type RootState = ReturnType<typeof store.getState>

// hacemos lo mismo con el dispatch
export type AppDispatch = typeof store.dispatch