var interfacesandp = require('./Interface_subscriber-publisher');
var publishe = interfacesandp.publisheChannel;
publishe("my-channel", "my-event", {
  message: "hello world"
});

