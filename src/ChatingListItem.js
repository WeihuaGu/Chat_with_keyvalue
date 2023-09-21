import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Dialog  from '@mui/material/Dialog';
import QuickPinchZoom, { make3dTransformValue } from "react-quick-pinch-zoom";
import Emoji from './Emoji';
import { useRef,useState,useCallback } from 'react';
import { useDispatch,useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next';
import { determineType } from './util';

export default function ChatingListItem({ sendingitem }) {
  const userId = useSelector((state)=>{return state.usrinfo.id});
  const [isFullscreen, setIsFullscreen] = useState(false);
  const time = new Date(sendingitem.time);
  let textAlignment = '';
  let listItemStyle = {};
  const text_type = determineType(sendingitem.text);
  if (sendingitem.fromid === userId) {
    textAlignment = 'right';
    listItemStyle = { paddingLeft: '50px', paddingRight: '10px',
    backgroundColor: sendingitem.msgstatus === 'sending' ? '#87CEFA' : sendingitem.msgstatus === 'sended' ? '#eaeaea' : sendingitem.msgstatus === 'failed' ? '#ffcccc' : ''};
  }else {
    textAlignment = 'left';
    listItemStyle = { paddingLeft: '10px', paddingRight: '50px' };
  }

   let pressTimer = null;
   const handleMouseDown = () => {
        pressTimer = setTimeout(() => {
        // 在长按事件触发时执行的逻辑
        handleCopyToClipboard();
    }, 1000); // 设置长按的时间阈值，单位为毫秒
   };

   const handleMouseUp = () => {
        clearTimeout(pressTimer);
   };
   const handleCopyToClipboard = () => {
     navigator.clipboard.writeText(sendingitem.text)
        .then(() => {
        console.log('Text copied to clipboard');
      // 在此处添加复制成功的逻辑
        })
        .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      // 在此处添加复制失败的逻辑
     });
   };

   const handleImageClick = () => {
    setIsFullscreen(true);
   };

   const handleCloseFullscreen = () => {
    setIsFullscreen(false);
   };
   const imgRef = useRef();
   const onUpdate = useCallback(({ x, y, scale }) => {
    const { current: img } = imgRef;

    if (img) {
      const value = make3dTransformValue({ x, y, scale });

      img.style.setProperty("transform", value);
    }
  }, []);

  return (
    <ListItem key={sendingitem.id} disablePadding style={listItemStyle}>
           {text_type === 'text' && (<ListItemButton
           disableRipple={true}
           onMouseDown={handleMouseDown}
           onMouseUp={handleMouseUp}>
             <ListItemText align={textAlignment}>
                <div style={{ display: 'block',userSelect: 'text',whiteSpace: 'pre-wrap' }}>
                <span>{sendingitem.text}</span>
                <span> </span>
                <Paper elevation={0} style={{ display: 'inline-block',padding: '5px',fontSize: '10px', color: 'gray',whiteSpace: 'nowrap' }}>
                 {time.toLocaleTimeString([],{hour: '2-digit',minute: '2-digit',hour12: false})}
                </Paper>
                </div>
             </ListItemText>
           </ListItemButton>)}
           {text_type === 'image' && (<div align={textAlignment}><img src={sendingitem.text} width={'45%'} height={'auto'} alt={sendingitem.text}onClick={handleImageClick} style={{ cursor: 'pointer' }} /></div>)}
            <Dialog width={'100%'} open={isFullscreen} onClose={handleCloseFullscreen}>
	       <QuickPinchZoom onUpdate={onUpdate}>
                <img ref={imgRef} src={sendingitem.text} alt={sendingitem.text} style={{ width: '100%', height: 'auto' }} />
	       </QuickPinchZoom>
            </Dialog>
           {text_type === 'audio' && (
           <div style={{ float: textAlignment}}>
              <audio controls>
                  <source src={sendingitem.text} type="audio/mpeg" />
                  Your browser does not support the audio element.
              </audio>
           </div>)}
           {text_type === 'emoji' && (
           <div align={textAlignment}>
		   <Emoji symbol={sendingitem.text} />
           </div>)}
    </ListItem>
  );
}
