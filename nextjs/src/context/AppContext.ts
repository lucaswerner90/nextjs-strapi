import { createContext } from 'react';

type TAppContext = {
	actions:any,
	state:{
		components?: {
			navigation?:any,
			buttons?:any,
			authButtons?:any
		}
	}
}
const AppContext = createContext<TAppContext>({state:{}, actions: {}});

export default AppContext;