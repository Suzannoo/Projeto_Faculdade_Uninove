
export enum VehicleType {
  Car = "Carro",
  Motorcycle = "Moto",
  Utility = "Utilitário"
}

export enum VehicleStatus {
  Available = "Disponível",
  Sold = "Vendido"
}

// Base Vehicle class
export class Vehicle {
  private _id: string;
  private _model: string;
  private _manufacturer: string;
  private _year: number;
  private _type: VehicleType;
  private _status: VehicleStatus;

  constructor(
    id: string,
    model: string,
    manufacturer: string,
    year: number,
    type: VehicleType,
    status: VehicleStatus = VehicleStatus.Available
  ) {
    this._id = id;
    this._model = model;
    this._manufacturer = manufacturer;
    
    // Validação do ano
    if (year > 2025) {
      throw new Error("Ano de fabricação não pode ser maior que 2025");
    }
    this._year = year;
    
    this._type = type;
    this._status = status;
  }

  // Getters
  get id(): string {
    return this._id;
  }
  
  get model(): string {
    return this._model;
  }
  
  get manufacturer(): string {
    return this._manufacturer;
  }
  
  get year(): number {
    return this._year;
  }
  
  get type(): VehicleType {
    return this._type;
  }
  
  get status(): VehicleStatus {
    return this._status;
  }
  
  // Setters
  set model(model: string) {
    this._model = model;
  }
  
  set manufacturer(manufacturer: string) {
    this._manufacturer = manufacturer;
  }
  
  set year(year: number) {
    if (year > 2025) {
      throw new Error("Ano de fabricação não pode ser maior que 2025");
    }
    this._year = year;
  }
  
  set status(status: VehicleStatus) {
    this._status = status;
  }
  
  // Método polimórfico
  displayInfo(): string {
    return `${this._manufacturer} ${this._model} (${this._year}) - ${this._status}`;
  }
}
