import 'canvas-gauges/gauge.min.js';
import * as React from 'react';
import { IBaseComponentState } from '../../BaseComponent/IBaseComponentState';
import * as Obd2 from '../../OBD2/obd2';
import ObdComponent from '../../ObdComponent/ObdComponent';
import { IManifoldPressureProps } from './IManifoldPressureProps';
import './ManifoldPressure.css';

class ManifoldPressure extends ObdComponent<IManifoldPressureProps, IBaseComponentState>{

  constructor(props: any){
    super(props);

    this.state = {
      value: 0
    }
  }

  public componentDidMount() {
    super.componentDidMount();
  }

  public render() {
    
    return (
      <div>
        Manifold Pressure: { (Obd2.units.pressure.psivac.convert(this.state.value)).toFixed(2) }
      </div>
    );
  }
}

export default ManifoldPressure;
