import React from 'react';
import emojiDictionary from 'emoji-dictionary';

const Emoji = ({ symbol }) => {
  const emoji = emojiDictionary.getUnicode(symbol);
  return <span>{emoji}</span>;
};

export default Emoji;
