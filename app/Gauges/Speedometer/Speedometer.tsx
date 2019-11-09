import * as React from 'react';
import CanComponent from '../../CanComponent/CanComponent';
import { ISpeedometerProps } from './ISpeedometerProps';
import { ISpeedometerState } from './ISpeedometerState';
import './Speedometer.css';

class Speedometer extends CanComponent<ISpeedometerProps, ISpeedometerState>{

  constructor(props: ISpeedometerProps){
    super(props);

    this.state={
      value: 0
    };
  }

  public componentDidMount() {
    super.componentDidMount();
  }

  public render() {
    return (
      <div>
        { this.props.label }: { this.props.unit === 'mph' ? Math.round(((this.state.value || 0) / 1.609)) + ' mph' : Math.round((this.state.value || 0)) + ' kph' }
      </div>
    );
  }

  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState: ISpeedometerState) => {
      return { value: data/100 }
    });
  }
}

export default Speedometer;
