import { deleteUserByID } from "../store/users/slice";
import type { UserId } from "../store/users/slice";
import { useAppDispatch } from "./store"

export const useUserActions=  ()=>{
  const dispatch = useAppDispatch();

  const removeUser = (id: UserId) => {
    dispatch(deleteUserByID(id))
  }

  return {removeUser}
}