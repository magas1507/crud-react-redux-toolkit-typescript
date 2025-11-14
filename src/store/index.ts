import {configureStore} from "@reduxjs/toolkit"

//importamos el reducer
import usersReducer  from "./users/slice";
import App from '../App';

//creamos el middleware 
const persistanceLocalStorageMiddleware = (store)=>(next)=>(action)=>{
	next(action)

	localStorage.setItem("_redux_state_",JSON.stringify(store.getState()))
}
//de esta manera ya tenemos nuestra store preparada para trabajar con los usuarios 
export const store = configureStore({
  reducer: {
    //cuando es llamado el store para usarlo, se coloca igual a como lo usas aqui 
    users: usersReducer
  },
  middleware: (getDefaultMiddleware) => {

    return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
  },
})

//Estamos diciendo que de de la función store.getState de ese type el tipo que devuelve sea RootState
//ReturnType: es el tipo que devuelve la función
// tienes que decirle de que store que esta usando tiene que recuperar el tipo
export type RootState = ReturnType<typeof store.getState>

// hacemos lo mismo con el dispatch
export type AppDispatch = typeof store.dispatch