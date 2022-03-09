module.exports.pushMessage = (text) => {
  const action = { 
  type: 'PUSH_MESSAGE',
  time: new Date().toLocaleTimeString(),
  text
  }
  return action
}
module.exports.subscribeChannel  = (channel) => {
  const action = { 
  type: 'Subscribe_Channel ',
  time: new Date().toLocaleTimeString(),
  channel
  }
  return action
}




