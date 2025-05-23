
import { Vehicle, VehicleType, VehicleStatus } from './Vehicle';

export class Motorcycle extends Vehicle {
  private _engineCapacity: number;
  
  constructor(
    id: string,
    model: string,
    manufacturer: string,
    year: number,
    engineCapacity: number,
    status: VehicleStatus = VehicleStatus.Available
  ) {
    super(id, model, manufacturer, year, VehicleType.Motorcycle, status);
    this._engineCapacity = engineCapacity;
  }
  
  get engineCapacity(): number {
    return this._engineCapacity;
  }
  
  set engineCapacity(engineCapacity: number) {
    this._engineCapacity = engineCapacity;
  }
  
  // Sobrescrita do método polimórfico
  override displayInfo(): string {
    return `${super.displayInfo()} | ${this._engineCapacity}cc`;
  }
}
