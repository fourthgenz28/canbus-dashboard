exports.make = "Honda";
exports.model = "Civic";
exports.startYear = 2006;
exports.endYear = 2012;

exports.colors = {
    background: '#000',
    foreground: '#fff',
    info: '#0a0',
    warning: '#a00'
}

// Map CANBus message Ids to component name
exports.msgIdMappings = {
    "13a": ["engine-idle-compensation","gas-pedal-position"],
    "158": ['vehicle-speed'],
    "164": ["brake-warning-light"],
    "17c": ["brake-pedal-depressed"],
    "188": ["gear-select"],
    "1dc": ["tachometer"],
    "1dd": ["oil-pressure"],
    "255": ["wheel-speed-sensor"],
    "294": ["turn-signal","wipers"],
    "305": ["drivers-seat-belt"],
    "309": ["wheel-speed-left","wheel-speed-right"],
    "324": ["coolant-temp","oil-temp"],
    "378": ["fuel-remaining"],
    "405": ["door-status"]
};

// Extract the data relevant to the component from the CANBus 8 byte hexadecimal payload
exports.valueMappings = {
    "brake-pedal-depressed": (data) => {
        if(data[5] !== 0){ return true; }
        return false;
    },
    "brake-warning-light": (data) => {
        if(data[0] === parseInt(4, 16)){ return true; } // handbrake on
        if(data[0] === 0){ return false; } // handbrake off
        return false;
    },
    "coolant-temp": (data) => {
        return data[0];
    },
    "drivers-seat-belt": (data) => {
        if(data[0] === parseInt(80, 16)){ return true; } // unbuckled
        if(data[0] === 0){ return false; } // buckled
        return false;
    },
    "gas-pedal-position": (data) => {
        return (data[1]/256) * 100;
    },
    // "gear-postion": () => {},
    "gear-select": (data) => {
        if(data[3] === parseInt(1, 16)){ return 'p'; }
        if(data[3] === parseInt(2, 16)){ return 'r'; }
        if(data[3] === parseInt(4, 16)){ return 'n'; }
        if(data[3] === parseInt(8, 16)){ return 'd'; }
        if(data[3] === parseInt(20, 16)){ return '3'; }
        if(data[3] === parseInt(40, 16)){ return '2'; }
        if(data[3] === parseInt(80, 16)){ return '1'; }
        if(data[3] === 0){ return 'unknown'; }
        return null;
    },
    "oil-pressure": (data) => {
        return data[0];
    },
    "oil-temp": (data) => {
        return data[3];
    },
    "tachometer": (data) => {
        data = data.slice(1, data.length);
        const rpm = parseInt(Buffer.from(data).toString('hex'),16);
        return rpm/250;
    },
    "throttle-plate-position": (data) => {
        return data[5];
    },
    "turn-signal": (data) => {
        return data[0];
    },
    "vehicle-speed": (data) => {
        data = data.slice(4, data.length-2);
        const speed = parseInt(Buffer.from(data).toString('hex'),16);
        return speed;
    },
    "voltage": (data) => {
        return data[0];
    },
    "wheel-speed-left": (data) => {
        return data[2];
    },
    "wheel-speed-right": (data) => {
        return data[3];
    }
}

exports.obdConfig = {
    extendedFrames: true
}

exports.obdQueries = [
    {pid: 0x01, frequency: 10000}, // MIL lamp
    {pid: 0x05, frequency: 1000},  // ECT
    {pid: 0x06, frequency: 1000},  // STFT
    {pid: 0x07, frequency: 1000},  // LTFT
    {pid: 0x0A, frequency: 1000},  // Fuel Pressure
    {pid: 0x0B, frequency: 1000},  // MAP
    {pid: 0x0D, frequency: 1000},  // Vehicle Speed
    {pid: 0x0E, frequency: 1000},  // Timing advance
    {pid: 0x0F, frequency: 2000},  // IAT
    {pid: 0x11, frequency: 1000},  // Throttle position
    {pid: 0x14, frequency: 250 },  // O2 sensor 1
    {pid: 0x15, frequency: 250 },  // O2 sensor 2
    {pid: 0x24, frequency: 100 },  // O2 sensor 1 AF Ratio
    {pid: 0x2F, frequency: 10000}, // Fuel Tank Level
    {pid: 0x42, frequency: 1000},  // Voltage
    {pid: 0x49, frequency: 250 }   // Accel Pedal Position
];
