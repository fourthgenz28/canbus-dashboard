import * as React from 'react';
import CanComponent from '../../CanComponent/CanComponent';
import './GasPedalPosition.css';
import { IGasPedalPositionProps } from './IGasPedalPositionProps';
import { IGasPedalPositionState } from './IGasPedalPositionState';

class GasPedalPosition extends CanComponent<IGasPedalPositionProps, IGasPedalPositionState>{

  constructor(props: IGasPedalPositionProps){
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
        { this.props.label }: { (this.state.value || 0) }
      </div>
    );
  }

  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState: IGasPedalPositionState) => {
      return { value: parseInt(data, 16) }
    });
  }
}

export default GasPedalPosition;
