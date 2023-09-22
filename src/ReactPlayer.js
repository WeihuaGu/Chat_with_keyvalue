import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ url }) {
  return (
    <div>
	  <ReactPlayer width={'100%'} url={url} controls />
    </div>
  );
}
export default VideoPlayer;
