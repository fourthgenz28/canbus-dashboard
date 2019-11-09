import * as React from 'react';
import BaseComponent from '../BaseComponent/BaseComponent';
import { IBaseComponentState } from '../BaseComponent/IBaseComponentState';
import { IObdComponentProps } from './IObdComponentProps';

abstract class ObdComponent<P extends IObdComponentProps, S extends IBaseComponentState> extends BaseComponent<P, S> {

  protected ipcRenderer: Electron.IpcRenderer;

  constructor(props: P){
    super(props);
    this.ipcRenderer = window.require("electron").ipcRenderer;
  }

  public componentDidMount() {
    const obdChannel = 'obd-response-' + this.props.pid;
    this.ipcRenderer.on(obdChannel, (event: any, payload: any) => {
      this.setState({
        value: payload
      });
    });
  }

  public render() {
    return(
      <div>
        { this.props.label }: { this.state ? this.state.value : '-' } { this.props.unit['label'] }
      </div>
    )
  }
}

export default ObdComponent;
