import React from 'react'

interface ProfileInfoProps {
    userInfo: any,
    isOpen: boolean,
    handleClick: Function,
}

function ProfileInfo({ userInfo, isOpen, handleClick }: ProfileInfoProps) {
    return (
        <div className='w-9/12 p-5 shadow rounded cursor-pointer' onClick={() => handleClick()}>
            <h1 className='text-3xl font-medium mb-3'>Profile information</h1>
            {isOpen && <div>
                <p className='text-lg text-custom-orange'>Username:</p>
                <p className='text-lg mb-3'>{userInfo?.firstName} {userInfo?.lastName}</p>
                <p className='text-lg text-custom-orange'>Email:</p>
                <p className='text-lg mb-3'>{userInfo?.email}</p>
                <p className='text-lg text-custom-orange'>Phone number:</p>
                <p className='text-lg mb-1'>{userInfo?.phoneNumber}</p>
            </div>}

        </div>
    )
}

export default ProfileInfo