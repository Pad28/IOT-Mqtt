const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:9090');

pub.on('connect', (packet) => {
    pub.publish('state_foco', `Estado del foco: ${ process.argv[2] }`);
    pub.end();
})