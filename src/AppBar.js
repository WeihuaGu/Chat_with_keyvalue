import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import ClearIcon from '@mui/icons-material/Clear';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux'
import { viewCleanTime,inCleanTime,cleanSending,cleanReceived  } from './actions/index';

export default function ButtonAppBar({cleanwhat}) {
  const dispatch = useDispatch();
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleClearClick = () => {
    // 处理清除操作
    if(cleanwhat!='all'){
	    // cleantime
      const currentDate = new Date();
      const cleantimestr = currentDate.toISOString();
      const cleantimeaction = new viewCleanTime(cleanwhat,cleantimestr);
      dispatch(cleantimeaction);
    }
    if(cleanwhat==='all'){
	    // cleantime
      const currentDate = new Date();
      const cleantimestr = currentDate.toISOString();
      dispatch(new inCleanTime('public',cleantimestr));
      dispatch(new inCleanTime(userId,cleantimestr));
      dispatch(new cleanSending());
      dispatch(new cleanReceived());
    }

    setAnchorEl(null);
  };
  
  return (
      <AppBar position="static">
        <Toolbar>
	  <IconButton color="inherit" component="a" href="/">
	  	<HomeIcon />
          </IconButton>
	   <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
	    你的id: {userId}
          </Typography>
	  <IconButton
          edge="end"
          color="inherit"
          aria-label="more-vert"
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuOpen}
         >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleClearClick}>
            <ClearIcon sx={{ marginRight: 1 }} />
              清除 
          </MenuItem>
        </Menu>

        </Toolbar>
      </AppBar>
  );
}
