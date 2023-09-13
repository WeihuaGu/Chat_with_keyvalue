import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import HomeIcon from '@mui/icons-material/Home';
import ClearIcon from '@mui/icons-material/Clear';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch ,useSelector} from 'react-redux'
import { StateClean,viewCleanTime,inCleanTime,cleanSending,cleanReceived  } from './actions/index';
import { useTranslation } from 'react-i18next';
import { delChannel } from './subscriber-publisher';

export default function ButtonAppBar({cleanwhat}) {
  const channelid = cleanwhat;
  const { t } = useTranslation();
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
    if(cleanwhat!=='all'){
	    // cleantime
      const currentDate = new Date();
      const cleantimestr = currentDate.toISOString();
      const cleantimeaction = new viewCleanTime(cleanwhat,cleantimestr);
      dispatch(cleantimeaction);
    }
    if(cleanwhat==='all'){
	    // cleantime
      delChannel(userId);
      const currentDate = new Date();
      const cleantimestr = currentDate.toISOString();
      dispatch(new cleanSending());
      dispatch(new cleanReceived());
      dispatch(new inCleanTime('public',cleantimestr));
      dispatch(new inCleanTime(userId,cleantimestr));
    }

    setAnchorEl(null);
  };
  const handleClearCompletelyClick = () => {
    // 彻底清除操作
    delChannel(userId);
    const delchannelinfo = delChannel('info-'+userId);
    delchannelinfo.then((clean)=>{
	    console.log(clean);
    });
    dispatch(new StateClean());
    localStorage.clear();
    setTimeout(() => {
            window.location.reload();
    }, 2000);
    setAnchorEl(null);
  };
  
  return (
      <AppBar position="static" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
        <Toolbar>
	  <IconButton color="inherit" component="a" href="/">
	  	<HomeIcon sx={{ marginLeft: '-10px' }}/>
          </IconButton>
	  {cleanwhat === 'all' && (
	   <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
		  {t('your')}id: {userId}
          </Typography>)}
	  {cleanwhat !== 'all' && (
	   <Typography variant="h7" component="div" sx={{ flexGrow: 1 }}>
		  {t('his')}id: {channelid}
          </Typography>)}
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
	      {t('clear')} 
          </MenuItem>
          {cleanwhat === 'all' && (
          <MenuItem onClick={handleClearCompletelyClick}>
            <ClearIcon sx={{ marginRight: 1 }} />
	      {t('clearcompletely')} 
          </MenuItem>)}
        </Menu>

        </Toolbar>
      </AppBar>
  );
}
