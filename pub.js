const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:9090');

pub.on('connect', (packet) => {
    pub.publish('topic_test', 'Publicacion test');
    pub.end();
})