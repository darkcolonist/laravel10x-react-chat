import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Divider, Fab, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { blueGrey, indigo } from '@mui/material/node/colors';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const AuthorListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: indigo[900],
  borderRadius: 20,
  margin: 5
}));

const ResponderListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: blueGrey[900],
  borderRadius: 20,
  margin: 5
}));

export default function() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Item>header</Item>
        </Grid>

        <Grid item xs={12}>

          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Item>left sidebar</Item>
            </Grid>
            <Grid item xs={8}>
              <List className='messageArea' spacing={2}>
                <AuthorListItem key="1">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="09:30"></ListItemText>
                    </Grid>
                  </Grid>
                </AuthorListItem>
                <ResponderListItem key="2">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="left" secondary="09:31"></ListItemText>
                    </Grid>
                  </Grid>
                </ResponderListItem>
                <AuthorListItem key="3">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="10:30"></ListItemText>
                    </Grid>
                  </Grid>
                </AuthorListItem>
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
            <Grid item xs={2}>
              <Item>right sidebar</Item>
            </Grid>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Item>footer</Item>
        </Grid>
      </Grid>
    </Box>
  );
}