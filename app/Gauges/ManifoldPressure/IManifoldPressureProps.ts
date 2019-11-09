import { IObdComponentProps } from '../../ObdComponent/IObdComponentProps';

export interface IManifoldPressureProps extends IObdComponentProps {
    maxValue: number;
    minValue: number;
    redline: number;
};
