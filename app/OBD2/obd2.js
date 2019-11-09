// 18DB33F1#0201050000000000 - Honda Request
// 18DAF111#0341053755555555 - Honda Response 1
// 18DAF11D#0341053755555555 - Honda Response 2

exports.createRequest = function(pid, serviceId, isExtended) {
    let data = new Buffer(8);
    data[0] = 2;  // msg length
    data[1] = serviceId || 1;  // OBD mode
    data[2] = pid;  // OBD PID

    if(isExtended){
        return {data: data, id: '0x18DB33F1', ext: isExtended, rtr: false}
    }
    return {data: data, id: '0x7DF', ext: isExtended, rtr: false}
}

exports.service = function(serviceId) {
    let obj = {
        pid: pid,
        service: serviceId
    }
    obj.service = serviceId;
    return obj;
}

exports.units = {
    electrical: {
        voltage: {
            label: 'volts'
        }
    },
    pressure: {
        bar: {
            convert: function(value){return value / 100;},
            label: 'bar'
        },
        kPa: {
            convert: function(value){return value;},
            default: true,
            label: 'kPA'
        },
        psi: {
            convert: function(value){return (value - 100) / 6.895;},
            label: 'psi'
        },
        psivac: {
            convert: (value) => {
                return value >= 100 ? this.units.pressure.psi.convert(value) : this.units.pressure.vac.convert(value);
            },
            label: 'psi'
        },
        vac: {
            convert: function(value){return -1 * value * .4192;},
            label: 'vac'
        }
    },
    temperature: {
        celcius: {
            convert: function(value){return value;},
            default: true,
            label: 'C'
        },
        farenheit: {
            convert: function(value){return (value * 9/5) + 32;},
            label: 'F'
        }
    },
    velocity: {
        kmh: {
            convert: function(value){return value;},
            default: true,
            label: 'kmh'
        },
        mph: {
            convert: function(value){return value/1.609;},
            label: 'mph'
        }
    }
}

decode = function(data){
    switch (this.pid){
        case 0x05: return data[3] - 40; break;
        case 0x06: return (data[3]/1.28) - 100; break;
        case 0x07: return (data[3]/1.28) - 100; break;
        case 0x08: return (data[3]/1.28) - 100; break;
        case 0x09: return (data[3]/1.28) - 100; break;
        case 0x0A: return data[3] * 3; break;
        case 0x0B: return data[3]; break;
        case 0x0C: return (data[3] * 256 + data[4]) / 4; break;
        case 0x0D: return data[3]; break;
        case 0x0E: return (data[3] / 2) - 64; break;
        case 0x0F: return data[3] - 40; break;
        case 0x10: return (data[3] * 256 + data[4]) / 100; break;
        case 0x11: return data[3]* (100/255); break;
        case 0x24: return 0; break;
        case 0x42: return (256 * data[3] + data[4])/1000; break;
        default: return -1;
    }
}

pid = function(pid){
    let obj = {
        decode: decode
    }
    obj.pid = pid;
    return obj;
}
