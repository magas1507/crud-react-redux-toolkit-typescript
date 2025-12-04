import { createSlice, type PayloadAction} from '@reduxjs/toolkit'
//podemos tener un estado global que sea un array
//usuario que guardamos en el estado
const DEFAULT_STATE = [
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

// let initialState: UserWithId[]= DEFAULT_STATE;
// 	const persitedState = localStorage.getItem("_redux_state_")
// 	if (persitedState) {
// 		initialState = JSON.parse(persitedState).users
// 	} 
 
const initialState: UserWithId[] = (()=>{
	const persitedState = localStorage.getItem("__redux__state__")
	return persitedState ? JSON.parse(persitedState).users : DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers:{
		// se ppuede hacer asi, pero hay una forma donde especifiques la accion
		//deleteUserByID: (state, action : {type: string, payload:string})=>{

		//react toolkit tiene payloadaction y se lo pasamos como generico, especificandole el tipo del payload
		// lo mejor cuando tenemos un reducers es exportar la accion, esta es una forma que tiene react toolkit sin tener que importar el string a la hora de decirle que accion tiene que hacer 
		//primer reducerimport { usersSlice, UserWithId } from './slice';
		addNewUser:(state, action: PayloadAction<User>)=>{
			const id = crypto.randomUUID()
			//creamos otro esta a partir del anterior 
			//puedes mutar el estado con reactToolkit
			state.push({ id, ...action.payload })
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser:(state, action: PayloadAction<UserWithId>)=>{
			const isUserAlreadyDefine = state.some(user=> user.id === action.payload.id)
			if(!isUserAlreadyDefine){
				state.push(action.payload)
			}
		},
		editUser:(state, action:PayloadAction<UserWithId>)=>{
			const updateUser = action.payload
			const userIndex = state.findIndex((user)=> user.id === updateUser
		.id)
			if (userIndex !==-1) {
				state[userIndex]= updateUser
			}
		}

	}, 

})

export default usersSlice.reducer;
// exportamos la accióon 
export const {addNewUser,  deleteUserById, rollbackUser, editUser } = usersSlice.actions