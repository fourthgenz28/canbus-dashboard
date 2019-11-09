import * as React from 'react';
import { IOdometerProps } from './IOdometerProps';
import { IOdometerState } from './IOdometerState';
import './Odometer.css';

declare global {
  // tslint:disable-next-line
  interface Window {
    require: any;
  }
}

class Odometer extends React.Component <IOdometerProps, IOdometerState>{

  private ipcRenderer: any;

  constructor(props: any){
    super(props);

    this.state = { value: props.value || -1 };
    this.ipcRenderer = window.require("electron").ipcRenderer;
  }

  public componentDidMount() {
    this.ipcRenderer.on('canbus-odometer-message', (event: any, payload: any) => {
      this.valueIPCUpdate(payload);
    });
  }

  public render() {
    return (
      <div className={ "Odometer" }>
        { this.state.value }
      </div>
    );
  }
  
  private valueIPCUpdate = (data: any):void => {  

    this.setState((prevState) => {
      return { value: data }
    });
  }

  private mockValueIPCUpdate = ():void => {  

    this.setState((prevState) => {
      return { value: prevState.value + 1 }
    });

    setTimeout(() => {
      this.mockValueIPCUpdate();
    }, this.props.refreshRate)
  }

}

export default Odometer;
