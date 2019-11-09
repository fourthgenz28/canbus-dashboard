interface IVehicleConfigColors{
    background: string;
    foreground: string;
    info: string;
    warning: string;
}

export default interface IVehicleConfig {
    colors: IVehicleConfigColors;
    endYear: number;
    make: string;
    msgIdMappings: object;
    model: string;
    startYear: number;
    valueMappings: object;
}