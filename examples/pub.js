const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:8083');

pub.on('connect', (packet) => {
    
    pub.publish('state_foco_ona', "foco");
    pub.publish('loading', "false");
    // pub.end();
    // pub.subscribe('state_foco');

})