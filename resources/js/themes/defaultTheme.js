import { blueGrey } from '@mui/material/colors';
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
  },
});