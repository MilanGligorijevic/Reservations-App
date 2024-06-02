import React, { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useCurrentUser } from './userContext';
import { addToFavorites, getUsersFavorites, removeFromFavorites } from '../firebase/config';
import Local from '../types/local';

interface Reducer {
    favoriteLocals: Local[],
    favoriteLocalsDispatch: Dispatch<ReducerAction>,
}

interface ReducerAction {
    type: string,
    payload: any,
}

interface FavoriteLocals {
    favoriteLocals: Local[],
}

const initialState: FavoriteLocals = {
    favoriteLocals: [],
}

const FavoriteLocalsContext = createContext<Reducer | undefined>(undefined);

interface FavoriteLocalsContextProviderProps {
    children: ReactNode;
}


export function FavoriteLocalsContextProvider({ children }: FavoriteLocalsContextProviderProps) {
    const currentUser = useCurrentUser();

    useEffect(() => {
        async function fetchFavoriteLocals() {
            if (currentUser.user !== null) {
                const favoritesData = await getUsersFavorites(currentUser.user.userId);
                dispatch({ type: 'GET_FAVORITE_LOCALS', payload: favoritesData })
            } else {
                console.log("Nema logovanog usera")
            }
        }
        fetchFavoriteLocals();
    }, [currentUser.user])

    const reducer = (state: any, action: ReducerAction) => {
        switch (action.type) {
            case 'GET_FAVORITE_LOCALS':
                initialState.favoriteLocals = action.payload;
                return initialState.favoriteLocals;
            case 'ADD_LOCAL_TO_FAVORITES':
                initialState.favoriteLocals.push(action.payload);
                console.log(currentUser.user.userId, action.payload)
                addToFavorites(currentUser.user.userId, action.payload);
                return initialState.favoriteLocals;
            case 'REMOVE_LOCAL_FROM_FAVORITES':
                initialState.favoriteLocals = initialState.favoriteLocals.filter((local) => local.id !== action.payload.id);
                removeFromFavorites(currentUser.user.userId, action.payload);
                return initialState.favoriteLocals;
            default:
                throw new Error();
        }
    }

    const [favoriteLocals, dispatch] = useReducer(reducer, initialState.favoriteLocals);

    return (
        <FavoriteLocalsContext.Provider value={{ favoriteLocals: favoriteLocals, favoriteLocalsDispatch: dispatch }}>{children}</FavoriteLocalsContext.Provider>
    )
}


export function useFavoriteLocals() {
    const favoriteLocals = useContext(FavoriteLocalsContext);
    if (favoriteLocals === undefined) {
        throw new Error("Favorite locals must be used within a FavoriteLocalsProvider");
    }
    return favoriteLocals;
}