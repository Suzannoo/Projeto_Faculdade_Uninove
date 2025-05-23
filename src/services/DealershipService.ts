
import { Vehicle, VehicleStatus } from '../models/Vehicle';
import { Car } from '../models/Car';
import { Motorcycle } from '../models/Motorcycle';
import { UtilityVehicle } from '../models/UtilityVehicle';
import { Customer } from '../models/Customer';
import { Person } from '../models/Person';
import { Company } from '../models/Company';
import { Sale } from '../models/Sale';
import { toast } from "../components/ui/use-toast";

// Classe principal que gerencia o sistema
export class DealershipService {
  private vehicles: Vehicle[] = [];
  private customers: Customer[] = [];
  private sales: Sale[] = [];
  
  // Singleton pattern
  private static instance: DealershipService;
  
  private constructor() {}
  
  public static getInstance(): DealershipService {
    if (!DealershipService.instance) {
      DealershipService.instance = new DealershipService();
    }
    return DealershipService.instance;
  }
  
  // Métodos para veículos
  addVehicle(vehicle: Vehicle): void {
    if (this.findVehicleById(vehicle.id)) {
      throw new Error(`Veículo com ID ${vehicle.id} já existe`);
    }
    this.vehicles.push(vehicle);
  }
  
  updateVehicle(vehicle: Vehicle): void {
    const index = this.vehicles.findIndex(v => v.id === vehicle.id);
    if (index === -1) {
      throw new Error(`Veículo com ID ${vehicle.id} não encontrado`);
    }
    this.vehicles[index] = vehicle;
  }
  
  deleteVehicle(id: string): void {
    const index = this.vehicles.findIndex(v => v.id === id);
    if (index === -1) {
      throw new Error(`Veículo com ID ${id} não encontrado`);
    }
    
    // Verifica se o veículo já foi vendido
    if (this.vehicles[index].status === VehicleStatus.Sold) {
      throw new Error(`Não é possível excluir um veículo vendido`);
    }
    
    this.vehicles.splice(index, 1);
  }
  
  findVehicleById(id: string): Vehicle | undefined {
    return this.vehicles.find(v => v.id === id);
  }
  
  getAllVehicles(): Vehicle[] {
    return [...this.vehicles];
  }
  
  getAvailableVehicles(): Vehicle[] {
    return this.vehicles.filter(v => v.status === VehicleStatus.Available);
  }
  
  // Métodos para clientes
  addCustomer(customer: Customer): void {
    if (this.findCustomerById(customer.id)) {
      throw new Error(`Cliente com ID ${customer.id} já existe`);
    }
    this.customers.push(customer);
  }
  
  updateCustomer(customer: Customer): void {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index === -1) {
      throw new Error(`Cliente com ID ${customer.id} não encontrado`);
    }
    this.customers[index] = customer;
  }
  
  deleteCustomer(id: string): void {
    const index = this.customers.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error(`Cliente com ID ${id} não encontrado`);
    }
    
    // Verifica se o cliente tem vendas
    const hasSales = this.sales.some(s => s.customer.id === id);
    if (hasSales) {
      throw new Error(`Não é possível excluir um cliente com vendas registradas`);
    }
    
    this.customers.splice(index, 1);
  }
  
  findCustomerById(id: string): Customer | undefined {
    return this.customers.find(c => c.id === id);
  }
  
  getAllCustomers(): Customer[] {
    return [...this.customers];
  }
  
  // Métodos para vendas
  createSale(vehicleId: string, customerId: string, price: number): Sale {
    const vehicle = this.findVehicleById(vehicleId);
    if (!vehicle) {
      throw new Error(`Veículo com ID ${vehicleId} não encontrado`);
    }
    
    const customer = this.findCustomerById(customerId);
    if (!customer) {
      throw new Error(`Cliente com ID ${customerId} não encontrado`);
    }
    
    if (vehicle.status === VehicleStatus.Sold) {
      throw new Error(`Veículo com ID ${vehicleId} já foi vendido`);
    }
    
    const saleId = `S${this.sales.length + 1}`;
    const sale = new Sale(saleId, vehicle, customer, price);
    this.sales.push(sale);
    
    return sale;
  }
  
  getAllSales(): Sale[] {
    return [...this.sales];
  }
  
  // Métodos para inicialização de dados de exemplo
  initializeSampleData(): void {
    try {
      // Adiciona alguns veículos de exemplo
      this.addVehicle(new Car("C1", "Civic", "Honda", 2022, 4, "Flex"));
      this.addVehicle(new Car("C2", "Corolla", "Toyota", 2023, 4, "Flex"));
      this.addVehicle(new Motorcycle("M1", "CB500", "Honda", 2021, 500));
      this.addVehicle(new Motorcycle("M2", "R1", "Yamaha", 2020, 1000));
      this.addVehicle(new UtilityVehicle("U1", "Hilux", "Toyota", 2021, 1000, false));
      
      // Adiciona alguns clientes de exemplo
      this.addCustomer(new Person("P1", "João Silva", "12345678900", "(11) 98765-4321"));
      this.addCustomer(new Person("P2", "Maria Oliveira", "98765432100", "(11) 91234-5678"));
      this.addCustomer(new Company("E1", "Empresa ABC", "12345678000123", "(11) 3456-7890", "Logística"));
      
      toast({
        title: "Dados de exemplo carregados",
        description: "Veículos e clientes foram adicionados ao sistema",
      });
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro ao carregar dados de exemplo",
          description: error.message,
        });
      }
    }
  }
}
