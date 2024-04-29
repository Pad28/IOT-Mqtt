const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:8083');

pub.on('connect', (packet) => {
    pub.publish('autenticar_cerradura', process.argv[2]);
    pub.end();
})