import React, { useRef } from "react";
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Divider, Fab, List, ListItem, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';

const maxMessages = 3;

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

const MessageListItem = function (props){
  let OurComponent;
  if(props.type === "in")
    OurComponent = OtherListItem;
    else
    OurComponent = MeListItem;

  return <OurComponent {...props} />
}

export default function(){
  const messageRef = useRef('');

  const messageSamples = [
    /* MeListItem */    { type:"out", message: "Hey man, What's up ?", time: "09:30"},
    /* OtherListItem */ { type:"in", message: "Hey, Iam Good! What about you ?", time: "09:31"},
    /* MeListItem */    { type:"out", message: "Cool. i am good, let's catch up!", time: "10:30"},
    /* OtherListItem */ { type:"in", message: "sure thing", time: "10:30"},
    /* MeListItem */    { type:"out", message: "ayt sounds like a plan", time: "10:31"},
  ];

  const [messages,setMessages] = React.useState([]);

  React.useEffect(() => {
    setMessages(messageSamples); // for testing only
  },[]);

  const addNewMessage = (newMessage) => {
    const updatedMessages = [...messages, newMessage];

    // Check if the array length exceeds {maxMessages}
    if (updatedMessages.length > maxMessages) {
      // Remove the first item from the array
      updatedMessages.shift();
    }

    setMessages(updatedMessages);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value;
    if(message.trim() == '')
      return;

    // console.info('attempting to send', message);
    addNewMessage({
      type: "out",
      message,
      time: "00:00"
    });

    messageRef.current.value = '';
  }

  return (
    <Grid item xs={12} md={8}>
      <List className='messageArea' spacing={2}>
        {messages.map((item, i) =>
          <MessageListItem key={i} {...item} />
        )}
      </List>

      <Divider />
      <Grid container style={{ padding: '20px' }}
        component="form" onSubmit={handleSubmit}>
        <Grid item xs={11}>
          <TextField id="outlined-basic-message-text" label="Type Something" fullWidth
            inputRef={messageRef} />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab color="primary" aria-label="add" component={Button} type="submit"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}