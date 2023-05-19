import React, { useRef } from "react";
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Divider, Fab, List, ListItem, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const maxMessages = 10;

const MeListItemStyled = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-end",
  "& .MuiCard-root": {
    // backgroundColor: theme.palette.mode === 'dark' ? theme.palette.info.dark : theme.palette.info.light,
    backgroundColor: theme.palette.info[theme.palette.mode],
  },
  "& .statusIcon": {
    fontSize: 15
  }
}));

const OtherListItemStyled = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start"
}));

const MessageCardContent = function(props){
  return (
    <CardContent>
      <Typography>{props.message}</Typography>
      <Typography title='time shows here'>{props.time}</Typography>
    </CardContent>
  )
}

const OtherListItem = function (props) {
  return <OtherListItemStyled>
    <AccountCircleIcon />
    <Card>
      <MessageCardContent {...props} />
    </Card>
  </OtherListItemStyled>
}

const MessageSentStatus = function(props){
  if(props.status === undefined)
    return;

  let content;
  if(props.status === "sent")
    content = <CheckCircleIcon className="statusIcon" color="success" />
  else
    content = <CircleIcon className="statusIcon" color="disabled" />

  return <Typography
    variant="body2" title={props.status}>{content}</Typography>
}

const MeListItem = function (props) {
  return <MeListItemStyled>
    <Card>
      <MessageCardContent {...props} />
    </Card>

    <MessageSentStatus {...props} />

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
  const [currentMessageID,setCurrentMessageID] = React.useState(1);

  React.useEffect(() => {
    setMessages(messageSamples); // for testing and development only
  },[]);

  // const updateMessage = (clientMessageID, updates) => {
  //   // Retrieve the current state array
  //   const messagesCopy = [...messages];

  //   // Find the specific item in the copied array
  //   const messageToUpdate = messagesCopy.find((message) => message.clientID === clientMessageID);

  //   console.info(messagesCopy);

  //   if (messageToUpdate) {
  //     // Update the desired property or properties of the item
  //     messageToUpdate.status = 'sent';

  //     // Set the modified array back to the state
  //     setMessages(messagesCopy);
  //   }
  // }

  const addNewMessage = (newMessage) => {
    newMessage["status"] = "sending";
    newMessage["clientID"] = currentMessageID;

    setCurrentMessageID(currentMessageID+1);

    const updatedMessages = [...messages, newMessage];

    // Check if the array length exceeds {maxMessages}
    if (updatedMessages.length > maxMessages) {
      // Remove the first item from the array
      updatedMessages.shift();
    }

    setMessages(updatedMessages);

    // below is for ajax simulation ONLY, set simulateAjax to true
    const simulateAjax = false;
    if (simulateAjax){
      console.info('SIMULATION', 'updating', newMessage, ' in a few');
      setTimeout(() => {
        const updatedMessage = { ...newMessage, status: 'sent' }; // Update the color property
        const messageIndex = updatedMessages.indexOf(newMessage);
        const updatedMessagesCopy = [...updatedMessages];
        updatedMessagesCopy[messageIndex] = updatedMessage;
        setMessages(updatedMessagesCopy);
        console.info('SIMULATION', 'updated', updatedMessage);
      }, 1000);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value;
    if(message.trim() == '')
      return;

    addNewMessage({
      type: "out",
      message,
      time: "00:00"
    });

    // TODO send message to ajax
    // console.info('attempting to send', message);

    // finally clear the textfield
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
            autoComplete="off"
            inputRef={messageRef} />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab color="primary" aria-label="add" component={Button} type="submit"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}