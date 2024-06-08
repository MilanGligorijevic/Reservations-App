import React from 'react'

interface ProfileInfoProps {
    userInfo: any,
    isOpen: boolean,
    handleClick: Function,
}

function ProfileInfo({ userInfo, isOpen, handleClick }: ProfileInfoProps) {
    return (
        <div className='w-9/12 p-5 shadow rounded cursor-pointer md:w-10/12' onClick={() => handleClick()}>
            <h1 className='text-3xl font-medium mb-3 sm:text-2xl'>Profile information</h1>
            {isOpen && <div>
                <p className='text-lg text-custom-orange sm:text-base'>Username:</p>
                <p className='text-lg mb-3 sm:text-base'>{userInfo?.firstName} {userInfo?.lastName}</p>
                <p className='text-lg text-custom-orange sm:text-base'>Email:</p>
                <p className='text-lg mb-3 sm:text-base'>{userInfo?.email}</p>
                <p className='text-lg text-custom-orange sm:text-base'>Phone number:</p>
                <p className='text-lg mb-1 sm:text-base'>{userInfo?.phoneNumber}</p>
            </div>}

        </div>
    )
}

export default ProfileInfo