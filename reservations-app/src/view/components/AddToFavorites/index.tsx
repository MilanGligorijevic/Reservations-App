import React, { useEffect, useState } from 'react'
import { FavoritesEmpty } from '../../../assets/svg/FavoritesEmpty'
import { FavoritesFilled } from '../../../assets/svg/FavoritesFilled'
import { useCurrentUser } from '../../../context/userContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useFavoriteLocals } from '../../../context/favoriteLocalsContext';
import Local from '../../../types/local';

interface AddToFavoritesProps {
    localData: Local,
}

function AddToFavorites({ localData }: AddToFavoritesProps) {
    const favoriteLocals = useFavoriteLocals();
    const currentUser = useCurrentUser();
    const [favorite, setFavorite] = useState<boolean>();
    const navigateUser = useNavigate();

    useEffect(() => {
        function containsLocal(localId: string) {
            for (let i = 0; i < favoriteLocals.favoriteLocals.length; i++) {
                if (favoriteLocals.favoriteLocals[i].id === localId) return true;
            }
            return false;
        }

        if (localData && containsLocal(localData.id)) {
            setFavorite(true);
        } else {
            setFavorite(false);
        }
    }, [localData, favoriteLocals])

    function handleAddToFavorites() {
        if (!favorite) {
            favoriteLocals.favoriteLocalsDispatch({ type: 'ADD_LOCAL_TO_FAVORITES', payload: localData })
            setFavorite(true);
        } else {
            favoriteLocals.favoriteLocalsDispatch({ type: 'REMOVE_LOCAL_FROM_FAVORITES', payload: localData })
            setFavorite(false);
        }
    }

    function redirectToSignIn() {
        navigateUser('/signIn');
    }

    return (
        <button className='w-fit h-fit mr-3' onClick={currentUser.user ? handleAddToFavorites : redirectToSignIn} >
            {favorite ? <FavoritesFilled /> : <FavoritesEmpty />}
        </button>
    )
}

export default AddToFavorites