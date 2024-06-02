import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import Local from '../types/local';
import { getAllLocals } from '../firebase/config';

const LocalsContext = createContext<Array<Local> | undefined>(undefined);

interface LocalsContextProviderProps {
    children: ReactNode,
}

export function LocalsContextProvider({ children }: LocalsContextProviderProps) {
    const [locals, setLocals] = useState<Array<Local>>([]);

    //handle getting locals from firestore 
    useEffect(() => {
        async function fetchAllLocals() {
            const localsArray = await getAllLocals()
            setLocals(localsArray);
        }
        fetchAllLocals();
    }, [])

    return (
        <LocalsContext.Provider value={locals}> {children} </LocalsContext.Provider>
    )
}

export function useLocals() {
    const locals = useContext(LocalsContext);
    if (locals === undefined) {
        throw new Error("Locals must be used within a LocalsProvider");
    }
    return locals;
}