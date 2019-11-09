import * as React from 'react';
import { ITripmeterProps } from './ITripmeterProps';
import { ITripmeterState } from './ITripmeterState';
import './Tripmeter.css';

declare global {
  // tslint:disable-next-line
  interface Window {
    require: any;
  }
}

class Tripmeter extends React.Component <ITripmeterProps, ITripmeterState>{

  constructor(props: any){
    super(props);

    this.state = { value: -1 };
  }

  public componentDidMount() {
    this.mockValueIPCUpdate();
  }

  public render() {
    return (
      <div className={ "Tripmeter" }>
        { this.state.value }
      </div>
    );
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

export default Tripmeter;
