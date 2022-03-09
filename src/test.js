var interfacesandp = require('./Interface_subscriber-publisher');
var subscribe = interfacesandp.subscribeChannel;
subscribe('my-channel').bind('my-event', function(data) {
      console.log(JSON.stringify(data));
    });

