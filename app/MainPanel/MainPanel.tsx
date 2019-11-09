import * as React from 'react';
import CoolantTemperature from '../Gauges/CoolantTemperature/CoolantTemperature';
import GasPedalPosition from '../Gauges/GasPedalPosition/GasPedalPosition';
import GearIndicator from '../Gauges/GearIndicator/GearIndicator';
import ManifoldPressure from '../Gauges/ManifoldPressure/ManifoldPressure';
import Odometer from '../Gauges/Odometer/Odometer';
import Speedometer from '../Gauges/Speedometer/Speedometer';
import Tachometer from '../Gauges/Tachometer/Tachometer';
import Tripmeter from '../Gauges/Tripmeter/Tripmeter';
import Icon from '../Icon/Icon';
import brake from '../icons/brake-warning-light.jpg';
import checkEngine from '../icons/check-engine-light.jpg';
import oilPressure from '../icons/oil-pressure-warning-light.jpg';
import seatbelt from '../icons/seatbelt-warning-light.jpg';
import tpms from '../icons/tpms-warning-light.jpg';
import voltage from '../icons/voltage-warning-light.jpg';
import * as Obd2 from '../OBD2/obd2';
import ObdComponent from '../ObdComponent/ObdComponent';
import * as Vehicle from '../Vehicles/honda-civic-gen8';
import { IMainPanelState } from './IMainPanelState';
import './MainPanel.css';


declare global {
  // tslint:disable-next-line
  interface Window {
    require: any;
  }
}

class MainPanel extends React.Component <{},IMainPanelState>{

  private ipcRenderer: any;
  private refreshRate: number;

  constructor(props: any){
    super(props);

    this.ipcRenderer = window.require("electron").ipcRenderer;
    this.refreshRate = 250;
    this.state={
      errors: [],
      messages: [],
      obdData: []
    };
  }

  public componentDidMount() {

    this.ipcRenderer.on('canbus-message', (event: any, payload: any) => {
      // tslint:disable-next-line
      console.log(payload);
    });

    this.ipcRenderer.on('canbus-channel-null', (event: any, payload: any) => {
      const error = new Error('Failed to create a channel to the canbus');
      // tslint:disable-next-line
      console.log(error);

      this.setState((prevState) => {
        const errors = prevState.errors || [];
        errors.push(error);
        return{
          errors
        }
      });
    });
  }

  public render() {
    const errors = this.state.errors && this.state.errors.length > 0 ? <div className="error">{ this.state.errors[0].message }</div> : null;

    return (
      <div className="MainPanel">
        { errors }
        
        <div style={ {position: "absolute", top: 80, left: (400 - 300/2), zIndex: 5,} }>
          <Tachometer
            height={ 300 }
            label={ 'Tachometer'}
            maxValue={ 8 }
            minValue={ 0 }
            name={ 'tachometer' }
            redline={ 6.8 }
            refreshRate={ this.refreshRate }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 300 }
          />
          <div style={ {position: "absolute", top: 80, left: 110} }>x1000 r/min</div>
        </div>
        <div style={ {position: "absolute", top: 140, left: 600} }>
          <GearIndicator
            height={ 100 }
            label={ 'Gear Selector'}
            name={ 'gear-select' }
            refreshRate={ this.refreshRate }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 100 }
          />
        </div>
        <div style={ {position: "absolute", top: 300, left: 55} }>
          <Icon
            height={ 30 }
            image={ oilPressure }
            label={ 'Oil Pressure'}
            name={'oil-pressure'}
            refreshRate={ 1000 }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 45 }
          />
        </div>
        <div style={ {position: "absolute", top: 300, left: 105} }>
          <Icon
            height={ 30 }
            image={ voltage }
            label={ 'Voltage'}
            name={'voltage'}
            refreshRate={ 1000 }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 45 }
          />
        </div>
        <div style={ {position: "absolute", top: 300, left: 155} }>
          <Icon
            height={ 30 }
            image={ checkEngine }
            label={ 'Check Engine'}
            name={'check-engine'}
            refreshRate={ 1000 }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 45 }
          />
        </div>
        <div style={ {position: "absolute", top: 80, left: 625} }>
          <Icon
            height={ 35 }
            image={ tpms }
            label={ 'Tire Pressure'}
            name={'tpms'}
            refreshRate={ 1000 }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 45 }
          />
        </div>
        <div style={ {position: "absolute", top: 120, left: 725} }>
          <Icon
            height={ 25 }
            image={ seatbelt }
            label={ 'Seatbelt'}
            name={'drivers-seat-belt'}
            refreshRate={ 1000 }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 25 }
          />
        </div>
        <div style={ {position: "absolute", top: 120, left: 685} }>
          <Icon
            height={ 25 }
            image={ brake }
            label={ 'Handbrake'}
            name={'brake-warning-light'}
            refreshRate={ 1000 }
            unit={ '' }
            vehicleConfig={ Vehicle }
            width={ 25*(1013/675) }
          />
        </div>
        <div style={ {position: "absolute", top: 275, left: 300} }>
          <Odometer
            height={ 25 }
            refreshRate={ 1000 }
            value={ NaN }
            width={ 75 }
          />
        </div>
        <div style={ {position: "absolute", top: 275, left: 425} }>
          <Tripmeter
            height={ 25 }
            refreshRate={ 1000 }
            width={ 75 }
          />
        </div>
        <div style={ {position: "absolute", top: 280, left: 10} }>
          <ObdComponent
            height={ 100 }
            label={ 'Voltage'}
            name={ 'voltageECU' }
            pid={ 42 }
            refreshRate={ 250 }
            unit={ Obd2.units.electrical.voltage }
            vehicleConfig={ Vehicle }
            width={ 100 }
          />
        </div>
        <div style={ {position: "absolute", top: 300, left: 10} }>
          <ManifoldPressure
            height={ 100 }
            label={ 'Manifold Pressure'}
            maxValue={ 20 }
            minValue={ -30 }
            name={ 'manifoldPressure' }
            pid={ 11 }
            redline={ 10 }
            refreshRate={ 250 }
            unit={ Obd2.units.pressure.psivac }
            vehicleConfig={ Vehicle }
            width={ 100 }
          />
        </div>
        <div style={ {position: "absolute", top: 320, left: 10} }>
          <Speedometer
            height={ 50 }
            label={ 'Speed' }
            name={ 'vehicle-speed' }
            refreshRate={ this.refreshRate }
            vehicleConfig={ Vehicle }
            width={ 100 }
            unit={ 'kph' }
          />
        </div>
        <div style={ {position: "absolute", top: 340, left: 10} }>
          <GasPedalPosition
            height={ 100 }
            label={ 'Throttle' }
            name={ 'throttle-plate-position' }
            refreshRate={ 500 }
            unit={ '%' }
            vehicleConfig={ Vehicle }
            width={ 100 }
          />
        </div>
        <div style={ {position: "absolute", top: 360, left: 10} }>
          <CoolantTemperature
            height={ 100 }
            label={ 'Coolant Temp.'}
            name={ 'coolant-temp' }
            refreshRate={ 5000 }
            unit={ 'F' }
            vehicleConfig={ Vehicle }
            width={ 100 }
          />
        </div>
        <div style={ {position: "absolute", top: 380, left: 10} }>
          <GasPedalPosition
            height={ 100 }
            label={ 'Accelerator Pedal' }
            name={ 'gas-pedal-position' }
            refreshRate={ 500 }
            unit={ '%' }
            vehicleConfig={ Vehicle }
            width={ 100 }
          />
        </div>
        <div style={ {position: "absolute", top: 400, left: 10} }>
          <Speedometer
            height={ 50 }
            label={ 'Speed (L)' }
            name={ 'wheel-speed-left' }
            refreshRate={ this.refreshRate }
            vehicleConfig={ Vehicle }
            width={ 100 }
            unit={ 'mph' }
          />
        </div>
        <div style={ {position: "absolute", top: 420, left: 10} }>
          <Speedometer
            height={ 50 }
            label={ 'Speed (R)' }
            name={ 'wheel-speed-right' }
            refreshRate={ this.refreshRate }
            vehicleConfig={ Vehicle }
            width={ 100 }
            unit={ 'mph' }
          />
        </div>
      </div>
    );
  }
}

export default MainPanel;
