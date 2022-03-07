module.exports.pushMessage = (text) => {
  const action = { 
  type: 'PUSH_MESSAGE',
  time: new Date().toLocaleTimeString(),
  text
  }
  return action
}


