import React from "react";
import Grid from '@mui/material/Grid';
import { Card, CardContent, Divider, Fab, List, ListItem, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const MeListItemStyled = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-end",
  "& .MuiCard-root": {
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.info.dark : theme.palette.info.light,
    backgroundColor: theme.palette.info[theme.palette.mode],
  },
}));

const OtherListItemStyled = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start"
}));

const OtherListItem = function (props) {
  return <OtherListItemStyled>
    <Card>
      <CardContent>
        <Typography>{props.message}</Typography>
        <Typography>{props.time}</Typography>
      </CardContent>
    </Card>
  </OtherListItemStyled>
}

const MeListItem = function (props) {
  return <MeListItemStyled>
    <Card>
      <CardContent>
        <Typography>{props.message}</Typography>
        <Typography>{props.time}</Typography>
      </CardContent>
    </Card>
  </MeListItemStyled>
}

export default function(){
  return (
    <Grid item xs={12} md={8}>
      <List className='messageArea' spacing={2}>
        <MeListItem message="Hey man, What's up ?" time="09:30" />
        <OtherListItem message="Hey, Iam Good! What about you ?" time="09:31" />
        <MeListItem message="Cool. i am good, let's catch up!" time="10:30" />
        <OtherListItem message='sure thing' time='10:30' />
        <MeListItem message='ayt sounds like a plan' time='10:31' />
      </List>

      <Divider />
      <Grid container style={{ padding: '20px' }}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-email" label="Type Something" fullWidth />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab color="primary" aria-label="add"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}