import 'canvas-gauges/gauge.min.js';
import * as React from 'react';
import CanComponent from '../../CanComponent/CanComponent';
import './DataObserver.css';
import { IDataObserverProps } from './IDataObserverProps';
import { IDataObserverState } from './IDataObserverState';

class DataObserver extends CanComponent<IDataObserverProps, IDataObserverState>{

  constructor(props: IDataObserverProps){
    super(props);

    this.state={
      value: 0
    };
  }

  public componentDidMount() {

    super.componentDidMount();
  }

  public render() {

    // const dataHighlights:object = {from: this.props.redline, to: this.props.maxValue, color: this.props.vehicleConfig.colors.warning};

    return (
      <canvas data-type="radial-gauge"
        data-width={ this.props.width }
        data-height={ this.props.height }
        data-units="Test"
        data-min-value={ 0 }
        data-start-angle={ 90 }
        data-ticks-angle={ 180 }
        data-value-box={ false }
        data-max-value={ 16 }
        data-major-ticks="0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16"
        data-minor-ticks={ 2 }
        data-stroke-ticks={ true }
        data-highlights={ '[' + JSON.stringify({}) + ']' }
        data-color-plate={ this.props.vehicleConfig.colors.background }
        data-color-major-ticks={ this.props.vehicleConfig.colors.foreground }
        data-color-minor-ticks={ this.props.vehicleConfig.colors.foreground }
        data-color-needle={ this.props.vehicleConfig.colors.foreground }
        data-color-needle-end={ this.props.vehicleConfig.colors.foreground }
        data-color-numbers={ this.props.vehicleConfig.colors.foreground }
        data-border-shadow-width={ 0 }
        data-borders={ false }
        data-needle-type="arrow"
        data-needle-width={ 2 }
        data-needle-circle-size={ 7 }
        data-needle-circle-outer={ true }
        data-needle-circle-inner={ false }
        data-animation-duration={ 250 }
        data-animation-rule={ "linear" }
        data-value={ this.state.value }
      />
    );
  }

  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState: IDataObserverState) => {
      return { value: data }
    });
  }
}

export default DataObserver;
