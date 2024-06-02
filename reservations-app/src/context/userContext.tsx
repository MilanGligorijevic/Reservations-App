import { onAuthStateChanged } from "firebase/auth";
import { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer } from "react";
import { auth, getSingleUser } from "../firebase/config";

interface Reducer {
    user: any, //ostavljam any da bi initialUser mogao biti null zbog provere da li je user ulogovan === null, potencijalno izmeniti
    userDispatch: Dispatch<ReducerAction>
}

interface ReducerAction {
    type: string,
    payload: any,
}

const initialState = {
    currentUser: null,
}

const UserContext = createContext<Reducer | undefined>(undefined);

interface UserContextProviderProps {
    children: ReactNode,
}

export function UserContextProvider({ children }: UserContextProviderProps) {

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                async function handleUserData(user: any) {
                    const currUser = await getSingleUser(user.uid);
                    console.log(currUser)
                    dispatch({ type: 'SET_USER', payload: currUser }) //ukoliko promenimo tab ili zatvorimo browser, user ce i dalje ostati ulogovan
                }
                handleUserData(user);
                // const currUser = { userId: user.uid, userEmail: user.email, firstName: user.displayName };
            } else {
                dispatch({ type: 'SET_USER', payload: null });
            }
        });
    }, [])

    const reducer = (state: any, action: ReducerAction) => {
        switch (action.type) {
            case 'SET_USER':
                initialState.currentUser = action.payload;
                return initialState.currentUser;
            default:
                throw new Error();
        }
    }

    const [currentUser, dispatch] = useReducer(reducer, initialState.currentUser);
    return (
        <UserContext.Provider value={{ user: currentUser, userDispatch: dispatch }} >{children}</UserContext.Provider>
    )
}


export function useCurrentUser() {
    const user = useContext(UserContext);
    if (user === undefined) {
        throw new Error("User must be used within a UserProvider");
    }
    return user;
}
