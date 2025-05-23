
import { Customer, CustomerType } from './Customer';

export class Person extends Customer {
  private _cpf: string;
  
  constructor(
    id: string,
    name: string,
    cpf: string,
    contact: string
  ) {
    super(id, name, contact, CustomerType.Person);
    
    // Validação do CPF
    if (!this.validateCPF(cpf)) {
      throw new Error("CPF inválido");
    }
    this._cpf = cpf;
  }
  
  get cpf(): string {
    return this._cpf;
  }
  
  set cpf(cpf: string) {
    if (!this.validateCPF(cpf)) {
      throw new Error("CPF inválido");
    }
    this._cpf = cpf;
  }
  
  // Método de validação do CPF (simplificado)
  private validateCPF(cpf: string): boolean {
    // Remove caracteres não numéricos
    const cleanCPF = cpf.replace(/\D/g, '');
    
    // Verifica se tem 11 dígitos
    if (cleanCPF.length !== 11) {
      return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCPF)) {
      return false;
    }
    
    // Aqui poderia ter a validação completa do CPF, mas por simplicidade vamos assumir que passou
    return true;
  }
  
  // Sobrescrita do método polimórfico
  override displayInfo(): string {
    return `${super.displayInfo()} | CPF: ${this.formatCPF(this._cpf)}`;
  }
  
  // Formata o CPF para exibição
  private formatCPF(cpf: string): string {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
