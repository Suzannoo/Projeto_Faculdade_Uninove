
import { Customer } from './Customer';
import { Vehicle, VehicleStatus } from './Vehicle';

export class Sale {
  private _id: string;
  private _vehicle: Vehicle;
  private _customer: Customer;
  private _date: Date;
  private _price: number;
  
  constructor(
    id: string,
    vehicle: Vehicle,
    customer: Customer,
    price: number,
    date: Date = new Date()
  ) {
    this._id = id;
    this._vehicle = vehicle;
    
    // Verifica se o veículo está disponível
    if (vehicle.status === VehicleStatus.Sold) {
      throw new Error("Veículo já foi vendido");
    }
    
    // Atualiza o status do veículo para vendido
    vehicle.status = VehicleStatus.Sold;
    
    this._customer = customer;
    this._date = date;
    this._price = price;
  }
  
  // Getters
  get id(): string {
    return this._id;
  }
  
  get vehicle(): Vehicle {
    return this._vehicle;
  }
  
  get customer(): Customer {
    return this._customer;
  }
  
  get date(): Date {
    return this._date;
  }
  
  get price(): number {
    return this._price;
  }
  
  // Setters
  set price(price: number) {
    this._price = price;
  }
  
  set date(date: Date) {
    this._date = date;
  }
  
  // Método para exibir informações da venda
  displayInfo(): string {
    return `Venda #${this._id} | ${this._vehicle.displayInfo()} | Cliente: ${this._customer.name} | Data: ${this.formatDate(this._date)} | Valor: R$ ${this._price.toFixed(2)}`;
  }
  
  // Formata a data para exibição
  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }
}
