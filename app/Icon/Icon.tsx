import * as React from 'react';
import CanComponent from '../CanComponent/CanComponent';
import './Icon.css';
import { IIconProps } from './IIConProps';
import { IIconState } from './IIconState';

declare global {
  // tslint:disable-next-line
  interface Window {
    require: any;
  }
}

class Icon extends CanComponent <IIconProps, IIconState>{

  constructor(props: any){
    super(props);

    this.state = { isIlluminated: true, isFlashing: false };
  }

  public componentDidMount() {
    super.componentDidMount();

    const timer/*: NodeJS.Timeout*/ = setTimeout(() => {
      this.setState({ isIlluminated: false });
      clearTimeout(timer);
    }, 5000);
  }

  public render() {
    return (
      <div>
        { this.state.isIlluminated ? <img src={ this.props.image } height={ this.props.height } width={ this.props.width }/> : null }
      </div>
    );
  }
   
  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState) => {
      return { isIlluminated: data }
    });
  }
}

export default Icon;
