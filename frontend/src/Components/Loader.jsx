import { Box, Spinner } from '@chakra-ui/react';
import React from 'react';

function Loader(props) {
    return (
        <Box q="100%" h="80vh" display="flex" justifyContent={"center"} alignItems="center" >
            <Spinner
            thickness='7px'
            speed='0.65s'
            emptyColor='gray.200'
            color='#008ECC'
            size='xl'
            />
        </Box>
    );
}

export default Loader;