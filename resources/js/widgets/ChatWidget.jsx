import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Divider, Fab, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const MeListItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-end"
}));

const OtherListItem = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start"
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
            <Grid item xs={2} sx={{
              display: {
                xs: "none",
                md: "block"
              }
            }}>
              <Item>left sidebar</Item>
            </Grid>
            <Grid item xs={12} md={8}>
              <List className='messageArea' spacing={2}>
                <ListItem key="1">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="09:30"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem key="2">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="left" secondary="09:31"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem key="3">
                  <Grid container>
                    <Grid item xs={12}>
                      <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItemText align="right" secondary="10:30"></ListItemText>
                    </Grid>
                  </Grid>
                </ListItem>


                <OtherListItem>
                  <Card>
                    <CardContent>
                      <Typography>Sure thing</Typography>
                      <Typography>10:30</Typography>
                    </CardContent>
                  </Card>
                </OtherListItem>

                <MeListItem>
                  <Card>
                    <CardContent>
                      <Typography>ayt sounds like a plan</Typography>
                      <Typography>10:31</Typography>
                    </CardContent>
                  </Card>
                </MeListItem>
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
            <Grid item xs={2} sx={{
              display: {
                xs: "none",
                md: "block"
              }
            }}>
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