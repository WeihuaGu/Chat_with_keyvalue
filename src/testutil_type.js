function determineType(str) {
  // 匹配图片资源的网址
  var imageRegex = /\.(png|jpg|jpeg|gif|bmp|svg)(\?.*)?$/i;
  // 匹配声音的网址
  var audioRegex = /\.(mp3|wav|ogg)(\?.*)?$/i;

  if (imageRegex.test(str)) {
    return 'image';
  } else if (audioRegex.test(str)) {
    return 'audio';
  } else {
    return 'text';
  }
}

console.log(determineType('https://example.com/image.png'));  // 输出: image
console.log(determineType('https://example.com/audio.mp3'));  // 输出: audio
console.log(determineType('你好，我的天使'));  // 输出: text
