import {  deleteUserById ,addNewUser, updateUser } from "../store/users/slice";
import type { UserId, UserWithId } from "../store/users/slice";
import { useAppDispatch } from "./store"

export const useUserActions=  ()=>{
  const dispatch = useAppDispatch()
  
  const addUser = ({name, email, github}) =>{
    dispatch(addNewUser({name, email,github}))
  }
  
  const removeUser = (id: UserId) => {
    console.log("delete id", id)
		dispatch(deleteUserById(id));
	};

  const editUser = (user: UserWithId)=> dispatch(updateUser(user))
  
  return {addUser, removeUser, editUser}
}