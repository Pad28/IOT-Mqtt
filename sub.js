const mqtt = require('mqtt');

const sub = mqtt.connect('mqtt://localhost:9090');

sub.on('connect', () => {
    sub.subscribe('topic_test');
    sub.subscribe('topic_broker');

    sub.on('message', (topic, message) => {
        console.log(message.toString());
    });
});


