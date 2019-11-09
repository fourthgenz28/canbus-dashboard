import * as React from 'react';
import CanComponent from '../../CanComponent/CanComponent';
import './CoolantTemperature.css';
import { ICoolantTemperatureProps } from './ICoolantTemperatureProps';
import { ICoolantTemperatureState } from './ICoolantTemperatureState';

class CoolantTemperature extends CanComponent<ICoolantTemperatureProps, ICoolantTemperatureState>{

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
        Coolant Temp: { this.state.value }
      </div>
    );
  }

  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState: ICoolantTemperatureState) => {
      return { value: data }
    });
  }
}

export default CoolantTemperature;
