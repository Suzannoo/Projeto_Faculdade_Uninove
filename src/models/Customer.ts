
export enum CustomerType {
  Person = "Pessoa Física",
  Company = "Pessoa Jurídica"
}

// Base Customer class
export class Customer {
  private _id: string;
  private _name: string;
  private _contact: string;
  private _type: CustomerType;
  
  constructor(
    id: string,
    name: string,
    contact: string,
    type: CustomerType
  ) {
    this._id = id;
    this._name = name;
    this._contact = contact;
    this._type = type;
  }
  
  // Getters
  get id(): string {
    return this._id;
  }
  
  get name(): string {
    return this._name;
  }
  
  get contact(): string {
    return this._contact;
  }
  
  get type(): CustomerType {
    return this._type;
  }
  
  // Setters
  set name(name: string) {
    this._name = name;
  }
  
  set contact(contact: string) {
    this._contact = contact;
  }
  
  // Método polimórfico
  displayInfo(): string {
    return `${this._name} - ${this._type} | Contato: ${this._contact}`;
  }
}
