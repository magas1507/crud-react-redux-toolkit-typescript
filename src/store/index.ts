import {configureStore} from "@reduxjs/toolkit"

//importamos el reducer
import usersReducer  from "./users/slice";

//de esta manera ya tenemos nuestra store preparada para trabajar con los usuarios 
export const store = configureStore({
  reducer: {
    //cuando es llamado el store para usarlo, se coloca igual a como lo usas aqui 
    users: usersReducer
  },
})