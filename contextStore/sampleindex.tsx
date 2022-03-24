import { createContext, useReducer } from "react";
//import { createInterface } from "readline";
//import { types } from 'util';
​
export const MyContext = createContext<string | any>("")
​
interface ILoading  {
	after: number,
	loading: boolean,
	more: boolean,
	data: any
}
​
const allData = new Array(25).fill(0).map((_val, i) => i + 1);
    const perPage = 10;
    const types = {
    start: "START",
    loaded: "LOADED"
    };
​
const reducer = (state: ILoading, action) => {
	switch (action.type) {
	  case types.start:
		return { ...state, loading: true };
	  case types.loaded:
		return {
		  ...state,
		  loading: false,
		  data: [...state.data, ...action.newData],
		  more: action.newData.length === perPage,
		  after: state.after + action.newData.length
		};
	  default:
		throw new Error("Don't understand action");
	}
};
​
export const ContextWrapper = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, {
        loading: false,
        more: true,
        data: [],
        after: 0
	})
	const { loading, data, after, more } = state;
​
	const load = () => {
        dispatch({ type: types.start });
    
        setTimeout(() => {
            const newData = allData.slice(after, after * perPage);
            dispatch({ type: types.loaded, newData });
            
        }, 300);
    }
	return (
		<MyContext.Provider value={{ loading, data, more, load }}>{children}</MyContext.Provider>
	);
};