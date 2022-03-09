import React from 'react'; 
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

import ChatSurface from './ChatSurface';
function router(){
return (
<Router>
<Routes>
    <Route path="/chat/:channelid" component={ChatSurface} />
</Routes>
</Router>);
}

export default router;
