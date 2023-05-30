import { Typography } from "@mui/material";
import moment from "moment";
import React from "react";

export const FORMAT_FROMNOW = 'fromNow';

export default function Moment({children, format}){
  const [timeDisplay,setTimeDisplay] = React.useState(null);
  const [fullTimeDisplay,setFullTimeDisplay] = React.useState(null);

  React.useEffect(() => {
    switch(format){
      case FORMAT_FROMNOW:
        setTimeDisplay(moment(children).fromNow());
        break;
      default:
        setTimeDisplay(moment(children).format(format));
    }
    setFullTimeDisplay(moment(children).toLocaleString());
  },[]);

  return <Typography variant="span" title={fullTimeDisplay}>
    {timeDisplay}
  </Typography>;
}