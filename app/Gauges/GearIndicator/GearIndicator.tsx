import * as React from 'react';
import { IBaseComponentState } from '../../BaseComponent/IBaseComponentState';
import CanComponent from '../../CanComponent/CanComponent';
import { ICanComponentProps } from '../../CanComponent/ICanComponentProps';
import './GearIndicator.css';

class GearIndicator extends CanComponent<ICanComponentProps, IBaseComponentState>{

  constructor(props: any){
    super(props);

    this.state = { valueString: 'p' };
  }

  public componentDidMount() {
    super.componentDidMount();
  }

  public render() {
    return (
      <div>
        <div className={ 'gear-indicator' }>P { this.state.valueString === 'p' ? <div className='circle red' />: '' }</div>
        <div className={ 'gear-indicator' }>R { this.state.valueString === 'r' ? <div className='circle green' />: '' }</div>
        <div className={ 'gear-indicator' }>N { this.state.valueString === 'n' ? <div className='circle red' />: '' }</div>
        <div className={ 'gear-indicator' }>D { this.state.valueString === 'd' ? <div className='circle green' />: '' }</div>
        <div className={ 'gear-indicator' }>D<span className={'subscript'}>3</span>{ this.state.valueString === '3' ? <div className='circle green' />: '' }</div>
        <div className={ 'gear-indicator' }>2 { this.state.valueString === '2' ? <div className='circle green' />: '' }</div>
        <div className={ 'gear-indicator' }>1 { this.state.valueString === '1' ? <div className='circle green' />: '' }</div>
      </div>
    );
  }
  
  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState: IBaseComponentState) => {
      return { valueString: data }
    });
  }

}

export default GearIndicator;
