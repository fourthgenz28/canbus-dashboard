import IVehicleConfig from '../Vehicles/IVehicleConfig';

export interface IBaseComponentProps {
    height: number;
    label: string;
    name: string;
    refreshRate: number;
    unit: string;
    vehicleConfig: IVehicleConfig;
    width: number;
};
