const mqtt = require('mqtt');

const pub = mqtt.connect('mqtt://localhost:8083');

pub.on('connect', (packet) => {
    // pub.publish('cerradura_on', "foco");
    
    pub.publish('autenticar_cerradura', "foco");
    // pub.publish('loading', "false");
    pub.end();
    // pub.subscribe('state_foco');

})