import React, { Dispatch, ReactNode, createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useCurrentUser } from './userContext';
import { addUsersReservation, getUsersReservations } from '../firebase/config';
import UserReservation from '../types/UsersReservation';



interface Reducer {
    reservations: UserReservation[],
    reservationsDispatch: Dispatch<ReducerAction>,
}

interface ReducerAction {
    type: string,
    payload: any,
}

interface Reservations {
    reservations: UserReservation[],
}

const initialState: Reservations = {
    reservations: [],
}

const UserReservationsContext = createContext<Reducer | undefined>(undefined);

interface UserReservationsContextProviderProps {
    children: ReactNode;
}


export function UserReservationsContextProvider({ children }: UserReservationsContextProviderProps) {
    const currentUser = useCurrentUser();

    useEffect(() => {
        async function fetchUsersReservations() {
            if (currentUser.user !== null) {
                const reservationsData = await getUsersReservations(currentUser.user.userId);
                dispatch({ type: 'GET_USER_RESERVATIONS', payload: reservationsData })
            } else {
                console.log("Nema logovanog usera")
            }
        }
        fetchUsersReservations();
    }, [currentUser.user])

    const reducer = (state: any, action: ReducerAction) => {
        switch (action.type) {
            case 'GET_USER_RESERVATIONS':
                initialState.reservations = action.payload;
                return initialState.reservations;
            case 'ADD_USER_RESERVATION':
                const newReservation: UserReservation = {
                    localId: action.payload.localId,
                    localName: action.payload.localName,
                    reservationDate: action.payload.reservationData.reservationDate,
                    reservationTime: action.payload.reservationData.reservationTime,
                    numberOfGuests: action.payload.reservationData.numberOfGuests
                }
                initialState.reservations.push(newReservation);
                addUsersReservation(currentUser.user.userId, newReservation);
                return initialState.reservations;
            // case 'REMOVE_USER_RESERVATION':
            //     initialState.favoriteLocals = initialState.favoriteLocals.filter((local) => local !== action.payload);
            //     removeFromFavorites(currentUser.user.userId, action.payload);
            //     return initialState.favoriteLocals;
            default:
                throw new Error();
        }
    }

    const [reservations, dispatch] = useReducer(reducer, initialState.reservations);


    return (
        <UserReservationsContext.Provider value={{ reservations: reservations, reservationsDispatch: dispatch }}>{children}</UserReservationsContext.Provider>
    )
}


export function useUserReservations() {
    const reservations = useContext(UserReservationsContext);
    if (reservations === undefined) {
        throw new Error("User reservations must be used within a UserReservationsProvider");
    }
    return reservations;
}