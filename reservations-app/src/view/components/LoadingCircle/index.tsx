import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function LoadingCircle() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
            <CircularProgress />
        </Box>
    )
}

export default LoadingCircle