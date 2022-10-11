import { Box, CircularProgress } from '@mui/material';
import React from 'react';

const Loader = () => {
    return (
        <Box
        sx={{height:"100vh", display:"flex", justifyContent:"center", alignItems: "center"}}
        >
            <CircularProgress color="secondary" />
        </Box>
    );
};

export default Loader;