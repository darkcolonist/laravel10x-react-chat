import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Paper, Stack } from '@mui/material';
import { green } from '@mui/material/colors';

export default function({
  log
}) {
  return (
    <Stack spacing={0}>
      {log.map((logitem, index) =>
        <Box key={index}>
          <Typography className='debugLogTime' variant='span'>{logitem.timestamp}</Typography>
          {' '}
          <Typography className='debugLog' variant='span'>{logitem.log}</Typography>
        </Box>)}
    </Stack>
  );
}