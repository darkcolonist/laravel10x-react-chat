import { blueGrey, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'dark',
    tertiary: green[200]
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          '&.sessionContainer': {
            fontFamily: 'monospace',
            color: blueGrey[300],
            fontSize: "80%"
          },
        },
      },
    },

    MuiStack: {
      styleOverrides: {
        root: {
          '&.debugLogList': {
            height: "60vh",
            overflowY: "scroll"
          },
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        root: {
          '&.debugLog': {
            fontFamily: 'monospace',
            color: green[300],
            borderLeft: `5px solid ${green[900]}`,
            paddingLeft: 5
          },
          '&.debugLogTime': {
            borderBottom: `3px solid ${green[900]}`,
            fontFamily: 'monospace',
            color: green[700],
            fontSize: "70%"
          },
          '&.debugLogTitle': {
            color: green[400]
          },
        },
      },

      variants: [
        {
          props: { variant: "time" },
          style: {
            fontSize: ".75rem",
          }
        }
      ]
    },

    MuiListItem: {
      styleOverrides:{
        root: {
          '&.authorIsMe' : {
            justifyContent: "flex-end",
            '& .statusIcon': {
              fontSize: 15
            }
          },

          '&.authorIsThem' : {
            justifyContent: "flex-start"
          }
        }
      }
    }
  },
});