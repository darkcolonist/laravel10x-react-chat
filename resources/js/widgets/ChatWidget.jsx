import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ChatWidgetCenterThread from '../components/ChatWidgetCenterThread';
import ChatWidgetProfileCard from '../components/ChatWidgetProfileCard';
import { blue, red } from '@mui/material/colors';
import SessionHelper from '../helpers/SessionHelper';
import { Chip, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function() {

  const headerFooter = <React.Fragment>
    <Typography variant='span'>{APP_NAME}</Typography>
    <Typography variant='span'>{' '}</Typography>
    <Chip variant='outlined' className='sessionContainer' size='small' label={`session id ${SessionHelper.getSessionID()}`} />
  </React.Fragment>;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>{headerFooter}</Item>
        </Grid>

        <Grid item xs={12}>

          <Grid container spacing={2}>
            <Grid item xs={2} sx={{
              display: {
                xs: "none",
                md: "block"
              }
            }}>
              <ChatWidgetProfileCard name="FML Guy" description="The daily struggle guy" bgcolor={red[500]} />
            </Grid>

            <ChatWidgetCenterThread />

            <Grid item xs={2} sx={{
              display: {
                xs: "none",
                md: "block"
              }
            }}>
              <ChatWidgetProfileCard name="Operator" description="This is you" bgcolor={blue[300]} />
            </Grid>
          </Grid>

        </Grid>

        {/* hide footer for now */}
        {/* <Grid item xs={12}>
          <Item>{headerFooter}</Item>
        </Grid> */}
      </Grid>
    </Box>
  );
}