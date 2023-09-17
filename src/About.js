import React from 'react';
import Box from '@mui/material/Box';
import AppBar from './AppBar';
import Footer from './Footer';

function About() {
  return (
    <Box sx={{ position: 'fixed',top: 0,left: 0,width:'100%' ,height:'100vh', display: 'flex',flexDirection: 'column' }}>
	  <AppBar cleanwhat={'about'} />
	  <Footer />
    </Box>
  )
}

export default About;
