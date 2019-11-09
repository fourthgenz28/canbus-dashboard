import * as React from 'react';
import { IBaseComponentProps } from './IBaseComponentProps';

abstract class BaseComponent<P extends IBaseComponentProps, S> extends React.Component<P, S> {

  protected ipcRenderer: Electron.IpcMain;

  constructor(props: P){
    super(props);
    this.ipcRenderer = window.require("electron").ipcRenderer;  
  }


  
}

export default BaseComponent;
