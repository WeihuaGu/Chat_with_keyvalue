import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useTranslation } from 'react-i18next';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary"
        sx={{
          bottom: '-10px',
        }}>
      {'App Icon from by Anggara - Flaticon© '}
      <Link color="inherit" href="https://www.flaticon.com/free-icons/chat-box" title="chat box icons">
      </Link>{' '}
      {'Other icon from mui icons'}
      <Link color="inherit" href="https://mui.com/">
      </Link>{' '}
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer() {
  const { t } = useTranslation();
  const str_features = t('features');
  const featurelistItems = str_features.split('\n').map(item => (<ListItem><h5>{item}</h5></ListItem>));
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <CssBaseline />
        <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
          <Typography variant="h3" component="h1" gutterBottom>
	  {t('app')}
          </Typography>
          <div>
	  <List>{featurelistItems}</List>
          </div>
        </Container>
        <Box
          component="footer"
          sx={{
            py: 9,
            px: 3,
            mt: 'auto',
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
