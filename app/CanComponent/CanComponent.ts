import BaseComponent from '../BaseComponent/BaseComponent';
import { IBaseComponentState } from '../BaseComponent/IBaseComponentState';
import { ICanComponentProps } from './ICanComponentProps';

abstract class CanComponent<P extends ICanComponentProps, S extends IBaseComponentState> extends BaseComponent<P, S> {

  protected ipcRenderer: Electron.IpcMain;

  constructor(props: P){
    super(props);
    this.ipcRenderer = window.require("electron").ipcRenderer;
  }

  public componentDidMount() {

    this.ipcRenderer.on(this.props.name, (event: any, payload: any) => {
      this.valueIPCUpdate(payload);
    });
  }
  
  protected abstract valueIPCUpdate = (data: any): void => {};
}

export default CanComponent;
