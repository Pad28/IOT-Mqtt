const mqtt = require('mqtt');

const sub = mqtt.connect('mqtt://localhost:8083');

sub.on('connect', () => {
    sub.subscribe('state_foco');

    sub.on('message', (topic, message) => {
        console.log(message.toString());
    });
});


