
import { Vehicle, VehicleType, VehicleStatus } from './Vehicle';

export class Car extends Vehicle {
  private _numDoors: number;
  private _engineType: string;
  
  constructor(
    id: string,
    model: string,
    manufacturer: string,
    year: number,
    numDoors: number = 4,
    engineType: string = "Gasolina",
    status: VehicleStatus = VehicleStatus.Available
  ) {
    super(id, model, manufacturer, year, VehicleType.Car, status);
    this._numDoors = numDoors;
    this._engineType = engineType;
  }
  
  get numDoors(): number {
    return this._numDoors;
  }
  
  get engineType(): string {
    return this._engineType;
  }
  
  set numDoors(numDoors: number) {
    this._numDoors = numDoors;
  }
  
  set engineType(engineType: string) {
    this._engineType = engineType;
  }
  
  // Sobrescrita do método polimórfico
  override displayInfo(): string {
    return `${super.displayInfo()} | ${this._numDoors} portas | Motor: ${this._engineType}`;
  }
}
