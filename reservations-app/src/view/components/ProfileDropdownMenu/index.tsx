import React from 'react'
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { ProfileIcon } from '../../../assets/svg/ProfileIcon';
import { useCurrentUser } from '../../../context/userContext';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownMenuProps {
    handleSignOut: Function
}

function ProfileDropdownMenu({ handleSignOut }: ProfileDropdownMenuProps) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    const currentUser = useCurrentUser();
    const navigateToProfile = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }

        setOpen(false);
    };

    function openProfileInfo(event: Event | React.SyntheticEvent) {
        handleClose(event);
        navigateToProfile('/userProfile', { state: { profileInfo: true, profileReservations: false, profileFavorites: false } });
    }

    function openProfileReservations(event: Event | React.SyntheticEvent) {
        handleClose(event);
        navigateToProfile('/userProfile', { state: { profileInfo: false, profileReservations: true, profileFavorites: false } });
    }

    function openProfileFavorites(event: Event | React.SyntheticEvent) {
        handleClose(event);
        navigateToProfile('/userProfile', { state: { profileInfo: false, profileReservations: false, profileFavorites: true } });
    }

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    console.log(currentUser.user)

    return (
        <Stack direction="row" spacing={2} className='ml-60'>

            <div>
                <Button
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    sx={{
                        '&:hover': {
                            backgroundColor: 'transparent',
                        },
                    }}
                    disableRipple
                >
                    <ProfileIcon />
                </Button>
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                        sx={{
                                            width: 200,
                                        }}
                                    >
                                        <div className='ml-4 mb-4 text-lg font-medium'>Hello, {currentUser.user.firstName}</div>
                                        <MenuItem sx={{ fontFamily: "Poppins" }} onClick={openProfileInfo}>Profile</MenuItem>
                                        <MenuItem sx={{ fontFamily: "Poppins" }} onClick={openProfileReservations}>My reservations</MenuItem>
                                        <MenuItem sx={{ fontFamily: "Poppins", marginBottom: 1 }} onClick={openProfileFavorites}>Favorites</MenuItem>
                                        <MenuItem sx={{ fontFamily: "Poppins" }} onClick={() => handleSignOut()}>Logout</MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    )
}

export default ProfileDropdownMenu