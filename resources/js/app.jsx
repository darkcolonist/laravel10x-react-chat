import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import ChatWidget from './widgets/ChatWidget';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ChatWidget />
    </ThemeProvider>
  );
}