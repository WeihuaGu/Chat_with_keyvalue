import React from 'react'; 
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import App from './App';
import ChatSurface from './ChatSurface';
function router(){
return (
<Router>
<Routes>
    <Route path="/" element={<App />} />
    <Route path="/chat/:channelid" element={<ChatSurface />} />
</Routes>
</Router>);
}

export default router;
