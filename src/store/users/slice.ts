import { createSlice, type PayloadAction} from '@reduxjs/toolkit'
//podemos tener un estado global que sea un array
//usuario que guardamos en el estado

// por si en algun momento le cambiamos el tipo
export type UserId= string

export interface User{
  name: string;
  email: string;
  github:string
}

export interface UserWithId extends User{
  id: UserId;

}

const initialState: UserWithId[]=[
  {
		id: "1",
		name: "Yazman Rodriguez",
		email: "yazmanito@gmail.com",
		github: "yazmanito",
	},
	{
		id: "2",
		name: "John Doe",
		email: "leo@gmail.com",
		github: "leo",
	},
	{
		id: "3",
		name: "Haakon Dahlberg",
		email: "haakon@gmail.com",
		github: "midudev",
	},
]
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{
		// se ppuede hacer asi, pero hay una forma donde especifiques la accion
		//deleteUserByID: (state, action : {type: string, payload:string})=>{

		//react toolkit tiene payloadaction y se lo pasamos como generico, especificandole el tipo del payload
		// lo mejor cuando tenemos un reducers es exportar la accion, esta es una forma que tiene react toolkit sin tener que importar el string a la hora de decirle que accion tiene que hacer 
		//primer reducerimport { usersSlice } from './slice';

		deleteUserByID: (state, action : PayloadAction<UserId>)=>{
			const id = action.payload
			return state.filter((user) => user.id !== id )
		}
	}
})

export default usersSlice.reducer;
// exportamos la accióon 
export const { deleteUserByID } = usersSlice.actions