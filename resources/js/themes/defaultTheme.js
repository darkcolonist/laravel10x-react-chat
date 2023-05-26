import { blueGrey, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'dark',
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

    MuiTypography: {
      styleOverrides: {
        root: {
          '&.debugLog': {
            fontFamily: 'monospace',
            color: green[300]
          },
          '&.debugLogTime': {
            fontFamily: 'monospace',
            color: green[700],
            fontSize: "70%"
          },
        },
      },
    },
  },
});