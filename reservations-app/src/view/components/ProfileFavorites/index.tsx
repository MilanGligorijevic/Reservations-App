import React from 'react'
import RestaurantPreview from '../RestaurantPreview'
import Local from '../../../types/local';

interface ProfileFavoritesProps {
    favoriteLocals: Local[],
    isOpen: boolean,
    handleClick: Function,
}

function ProfileFavorites({ favoriteLocals, isOpen, handleClick }: ProfileFavoritesProps) {
    return (
        <div className='w-9/12 p-5 shadow rounded mb-7 cursor-pointer' onClick={() => handleClick()}>
            <h1 className='text-3xl font-medium mb-3'>Favorites</h1>
            {isOpen &&
                <div>
                    <p className='text-xl mb-2'>{`${favoriteLocals.length} ${favoriteLocals.length === 1 ? 'place' : 'places'}`}</p>
                    <div className='flex gap-5'>
                        {favoriteLocals.map((local) => {
                            return <div className='w-1/4'>
                                <RestaurantPreview id={local.id} address={local.address} image={local.images[0]} name={local.name} />
                            </div>
                        })}
                    </div>
                </div>}
        </div>
    )
}

export default ProfileFavorites