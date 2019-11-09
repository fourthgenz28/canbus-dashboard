import 'canvas-gauges/gauge.min.js';
import * as React from 'react';
import CanComponent from '../../CanComponent/CanComponent';
import { ITachometerProps } from './ITachometerProps';
import { ITachometerState } from './ITachometerState';
import './Tachometer.css';

class Tachometer extends CanComponent<ITachometerProps, ITachometerState>{

  // private canvas: HTMLCanvasElement | null;
  // private ctx: CanvasRenderingContext2D | null;

  constructor(props: ITachometerProps){
    super(props);

    this.state={
      value: 0
    };
  }

  public componentDidMount() {
    super.componentDidMount();

    /*
    this.canvas = document.getElementById('tachometer') as HTMLCanvasElement;
    if(this.canvas){ this.ctx = this.canvas.getContext('2d'); }

    if(this.ctx){
      this.drawArcs(this.ctx);
      this.drawTicks(this.ctx);
      this.drawNeedle(this.ctx);
    }
    else{
      const div: HTMLDivElement = document.getElementById('tachometerFallback') as HTMLDivElement;
      div.innerText = 'Canvas not supported';
    }
    */

  }

  public render() {

    const dataHighlights:object = {from: this.props.redline, to: this.props.maxValue, color: this.props.vehicleConfig.colors.warning};

    return (
      <div>
        <canvas data-type="radial-gauge"
          data-width={ this.props.width }
          data-height={ this.props.height }
          data-min-value={ 0 }
          data-start-angle={ 85 }
          data-ticks-angle={ 190 }
          data-value-box={ false }
          data-max-value={ 8 }
          data-major-ticks="0,1,2,3,4,5,6,7,8"
          data-minor-ticks={ 2 }
          data-stroke-ticks={ true }
          data-highlights={ '[' + JSON.stringify(dataHighlights) + ']' }
          data-color-plate={ this.props.vehicleConfig.colors.background }
          data-color-major-ticks={ this.props.vehicleConfig.colors.foreground }
          data-color-minor-ticks={ this.props.vehicleConfig.colors.foreground }
          data-color-needle={ this.props.vehicleConfig.colors.foreground }
          data-color-needle-end={ this.props.vehicleConfig.colors.foreground }
          data-color-numbers={ this.props.vehicleConfig.colors.foreground }
          data-color-units="#FFFFFF"
          data-color-title={ this.props.vehicleConfig.colors.foreground }
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
      </div>
    );
  }

  public render1() {
    return(
      <div>
        <canvas
          id='tachometer'
          width={ this.props.width }
          height={ this.props.height }
        />
        <div id='tachometerFallback' />
      </div>);
  }

  protected valueIPCUpdate = (data: any):void => {

    this.setState((prevState: ITachometerState) => {
      return { value: data/1000 }
    });
  }

  /*
  private drawArcs = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(255,255,255,1.0)';
    ctx.beginPath();
    ctx.arc(this.props.width/2, this.props.width/2, this.props.width/2.252, Math.PI*.96, Math.PI*1.84, false);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255,0,0,1.0)';
    ctx.beginPath();
    ctx.arc(this.props.width/2, this.props.width/2, this.props.width/2.252, 2.04*Math.PI, Math.PI*1.86, true);
    ctx.stroke();
    
    ctx.lineWidth = 10;
    ctx.strokeStyle = 'rgba(255,0,0,1.0)';
    ctx.beginPath();
    ctx.arc(this.props.width/2, this.props.width/2, this.props.width/2.1, 2.038*Math.PI, Math.PI*1.86, true);
    ctx.stroke();
  }

  private drawNeedle = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,1.0)';

    ctx.translate(this.props.width/2, this.props.width/2);
    ctx.lineWidth = 3;
    ctx.rotate(-1 * Math.PI /(1 - (this.state.value || 7000) / this.props.maxValue));

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(this.props.width/2.5, 0);
    ctx.stroke();
    
    ctx.restore();
  }

  private drawTicks = (ctx: CanvasRenderingContext2D) => {
    ctx.save();
    ctx.strokeStyle = 'rgba(101,85,183,1.0)';
    ctx.translate(this.props.width/2, this.props.width/2);
    ctx.lineWidth = 5;
    for (let i = 0; i <= 30; i++) {
      // if (i % 5!== 0) {
      ctx.beginPath();
      ctx.moveTo(this.props.width/2.15, 0);
      ctx.lineTo(this.props.width/2.0, 0);
      ctx.stroke();
      // }
      ctx.rotate(-1 * Math.PI / 30);
    }
    ctx.restore();
  }
  */
}

export default Tachometer;
