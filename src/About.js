import React from 'react';
import AppBar from './AppBar';
function About() {
  const cleanwhat = 'all';
  return (
    <div>
	<AppBar cleanwhat={cleanwhat} />
	<div>
	  app icon from <a href="https://www.flaticon.com/free-icons/chat-box" title="chat box icons">Chat box icons created by Anggara - Flaticon</a>
	</div>
    </div>
  )
}

export default About;
