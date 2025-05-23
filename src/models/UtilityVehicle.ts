
import { Vehicle, VehicleType, VehicleStatus } from './Vehicle';

export class UtilityVehicle extends Vehicle {
  private _loadCapacity: number;
  private _hasTrailer: boolean;
  
  constructor(
    id: string,
    model: string,
    manufacturer: string,
    year: number,
    loadCapacity: number,
    hasTrailer: boolean = false,
    status: VehicleStatus = VehicleStatus.Available
  ) {
    super(id, model, manufacturer, year, VehicleType.Utility, status);
    this._loadCapacity = loadCapacity;
    this._hasTrailer = hasTrailer;
  }
  
  get loadCapacity(): number {
    return this._loadCapacity;
  }
  
  get hasTrailer(): boolean {
    return this._hasTrailer;
  }
  
  set loadCapacity(loadCapacity: number) {
    this._loadCapacity = loadCapacity;
  }
  
  set hasTrailer(hasTrailer: boolean) {
    this._hasTrailer = hasTrailer;
  }
  
  // Sobrescrita do método polimórfico
  override displayInfo(): string {
    return `${super.displayInfo()} | Capacidade: ${this._loadCapacity}kg | ${this._hasTrailer ? 'Com reboque' : 'Sem reboque'}`;
  }
}
