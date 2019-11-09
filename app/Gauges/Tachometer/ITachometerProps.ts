import { ICanComponentProps } from '../../CanComponent/ICanComponentProps';

export interface ITachometerProps extends ICanComponentProps {
    maxValue: number;
    minValue: number;
    redline: number;
};
