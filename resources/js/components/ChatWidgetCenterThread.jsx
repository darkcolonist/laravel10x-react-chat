import React, { useRef } from "react";
import Grid from '@mui/material/Grid';
import { Button, Card, CardContent, Collapse, Divider, Fab, List, ListItem, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SendIcon from '@mui/icons-material/Send';
import CircleIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorCircleIcon from '@mui/icons-material/ErrorOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { TransitionGroup } from "react-transition-group";
import { startFetchLatest, stopFetchLatest } from "../pollers/messagePollers";

const WELCOME_MESSAGE = `hello there, ${APP_VISITOR}. just type a message to see what happens.`;

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

const TimeTypography = styled(Typography)(({ theme }) => ({
  fontSize: "80%",
  opacity: .6
}));

const OtherListItemStyled = styled(ListItem)(({ theme }) => ({
  justifyContent: "flex-start"
}));

const MessageCardContent = function(props){
  return (
    <CardContent>
      <Typography>{props.message}</Typography>
      <TimeTypography title='time shows here'>{props.time}</TimeTypography>
    </CardContent>
  )
}

const OtherListItem = function (props) {
  return <OtherListItemStyled>
    <AccountCircleIcon
      sx={{
        display: {
          xs: "block",
          md: "none",
        }
      }}
    />
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
  else if(props.status === "error")
    content = <ErrorCircleIcon className="statusIcon" color="error" />
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

const getListHeight = () => {
  return window.innerHeight - 201;
}

export default function(){
  const messageRef = useRef('');
  const messageListRef = useRef(null);
  const audioRef = useRef(null);

  const messageSamples = [
    // /* MeListItem */    { type:"out", message: "Hey man, What's up ?", time: "09:30"},
    // /* OtherListItem */ { type:"in", message: "Hey, Iam Good! What about you ?", time: "09:31"},
    // /* MeListItem */    { type:"out", message: "Cool. i am good, let's catch up!", time: "10:30"},
    // /* OtherListItem */ { type:"in", message: "sure thing", time: "10:30"},
    // /* MeListItem */    { type:"out", message: "ayt sounds like a plan", time: "10:31"},
    { type: "out", message: "What to do?", time: PAGE_LOAD },
    { type: "in", message: WELCOME_MESSAGE, time: PAGE_LOAD },


    /* test fill-ins */
    // ...Array(20).fill().map((_, index) => ({ type: "out", message: `test ${index + 1}`, time: "-00:00" }))
  ];

  const [messages,setMessages] = React.useState([]);
  const [currentMessageID,setCurrentMessageID] = React.useState(1);
  const [listHeight, setListHeight] = React.useState(getListHeight()); // Initial height calculation
  const [isFormDisabled, setIsFormDisabled] = React.useState(true);
  const [shouldPlaySound,setShouldPlaySound] = React.useState(false);
  const [messageHistoryLoaded,setMessageHistoryLoaded] = React.useState(false);

  const scrollToBottom = () => {
    // Scroll to the bottom of the list
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }

  React.useEffect(() => {
    if(messageHistoryLoaded){
      // Start the long polling loop
      startFetchLatest(newMessageReceivedFromServer);
      setIsFormDisabled(false);
    }else{
      stopFetchLatest();
      setIsFormDisabled(true);
    }
  },[messageHistoryLoaded]);

  React.useEffect(() => {
    setMessages(messageSamples); // for testing and development only

    // Function to handle window resize event
    const handleResize = () => {
      setListHeight(getListHeight()); // Update the list height when window is resized
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    fetchMessageHistory();

    // Clean up the event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
      stopFetchLatest();
    };
  }, []);

  const fetchMessageHistory = async () => {
    const { data } = await axios.post('message/history');

    if(data){
      data.forEach((newMessage) => {
        const formattedMessage = formatMessage(newMessage);
        appendToMessages(formattedMessage);
      });

      setMessageHistoryLoaded(true);
    }
  }

  const setNewMessageSuccess = (setMessages, theMessage) => {
    setMessages((prevMessages) => {
      const updatedMessagesCopy = [...prevMessages];
      const messageIndex = updatedMessagesCopy.findIndex(
        (message) => message.clientID === theMessage.clientID
      );
      if (messageIndex !== -1) {
        // Update the status of the message
        updatedMessagesCopy[messageIndex] = {
          ...theMessage,
          status: 'sent'
        };
      }
      return updatedMessagesCopy;
    });
  }

  const setNewMessageError = (setMessages, theMessage) => {
    setMessages((prevMessages) => {
      const updatedMessagesCopy = [...prevMessages];
      const messageIndex = updatedMessagesCopy.findIndex(
        (message) => message.clientID === theMessage.clientID
      );
      if (messageIndex !== -1) {
        // Update the status of the message
        updatedMessagesCopy[messageIndex] = {
          ...theMessage,
          status: 'error'
        };
      }
      return updatedMessagesCopy;
    });
  }

  const appendToMessages = (newMessageObject) => {
    // setMessages((prevMessages) => {
    //   // Check if the array length exceeds {WIDGET_MAX_MESSAGES}
    //   if (prevMessages.length > WIDGET_MAX_MESSAGES) {
    //     // Remove the first item from the array
    //     prevMessages.shift();
    //   }
    //   return [...prevMessages, newMessageObject];
    // });

    setMessages((prevMessages) => {
      // Check if the array length exceeds {WIDGET_MAX_MESSAGES}
      if (prevMessages.length > WIDGET_MAX_MESSAGES) {
        // Calculate the number of excess items
        const numExcessItems = prevMessages.length - WIDGET_MAX_MESSAGES;

        // Remove the specified number of items from the beginning of the array
        prevMessages.splice(0, numExcessItems);
      }
      return [...prevMessages, newMessageObject];
    });

  }

  const formatMessage = (message) => {
    message.type = message.direction;
    message.time = message.timestamp;
    return message;
  }

  const newMessageReceivedFromServer = (newMessage) => {
    if (Object.keys(newMessage).length === 0) return;

    appendToMessages(formatMessage(newMessage));

    // play our sound
    playAlertSound();
  }

  const playAlertSound = () => {
    if(shouldPlaySound)
      audioRef.current.play();
  }

  const submitMessageToServer = async (newMessage) => {
    newMessage["status"] = "sending";
    newMessage["clientID"] = currentMessageID;

    setCurrentMessageID(currentMessageID+1);
    appendToMessages(newMessage);

    if (newMessage.type === "out") {
      try{
        const axiosResponse = await axios.post('message/send', newMessage);
        // console.info(axiosResponse.data.message);

        const timestamp = axiosResponse.data.timestamp;

        // change check mark of send message to green
        setNewMessageSuccess(setMessages, { ...newMessage, time: timestamp });
      }catch(e){
        console.error(e);
        setNewMessageError(setMessages, {...newMessage, time: "error"});
      }

      setIsFormDisabled(false);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isFormDisabled)
      return;

    const message = messageRef.current.value;
    if(message.trim() == '')
      return;

    setIsFormDisabled(true);

    submitMessageToServer({
      type: "out",
      message,
      time: "sending..."
    });

    // finally clear the textfield
    messageRef.current.value = '';
  }

  return (
    <Grid item xs={12} md={8}>
      <List className='messageArea' spacing={2}
        ref={messageListRef}
        sx={{
          height: listHeight,
          overflow: "auto"
        }}
      >
        <TransitionGroup>
          {messages.map((item, i) => (
            <Collapse key={i} timeout={500} onEntered={() => scrollToBottom()}>
              <MessageListItem {...item} />
            </Collapse>
          ))}
        </TransitionGroup>
      </List>

      <Divider />
      <Grid container style={{ padding: '20px' }}
        component="form" onSubmit={handleSubmit}>
        <Grid item xs={11}>
          <audio ref={audioRef}>
            <source src={`${APP_URL}/assets/sounds/ding.mp3`} type="audio/mpeg" />
          </audio>
          <TextField id="outlined-basic-message-text" label="Type Something" fullWidth
            autoComplete="off"
            inputRef={messageRef} />
        </Grid>
        <Grid item xs={1} align="right">
          <Fab disabled={isFormDisabled} color="primary"
            aria-label="add" component={Button} type="submit"><SendIcon /></Fab>
        </Grid>
      </Grid>
    </Grid>
  )
}