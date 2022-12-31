import { Box, Heading } from '@chakra-ui/react';
import React from 'react';

function PlayerList(props) {
    return (
        <Box>
          <Heading mb="10px" fontWeight="600" fontSize="21px">Players joined:- (Total {props.data.length})</Heading>  
          {props.data && props.data.map((el,i)=>{
            return <Heading key={i} mb="7px" fontWeight="500" fontSize="18px" textTransform={"uppercase"}>- {el}</Heading>  
          })}
        </Box>
    );
}

export default PlayerList;