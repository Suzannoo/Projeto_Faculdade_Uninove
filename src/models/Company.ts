
import { Customer, CustomerType } from './Customer';

export class Company extends Customer {
  private _cnpj: string;
  private _businessType: string;
  
  constructor(
    id: string,
    name: string,
    cnpj: string,
    contact: string,
    businessType: string
  ) {
    super(id, name, contact, CustomerType.Company);
    
    // Validação do CNPJ
    if (!this.validateCNPJ(cnpj)) {
      throw new Error("CNPJ inválido");
    }
    this._cnpj = cnpj;
    this._businessType = businessType;
  }
  
  get cnpj(): string {
    return this._cnpj;
  }
  
  get businessType(): string {
    return this._businessType;
  }
  
  set cnpj(cnpj: string) {
    if (!this.validateCNPJ(cnpj)) {
      throw new Error("CNPJ inválido");
    }
    this._cnpj = cnpj;
  }
  
  set businessType(businessType: string) {
    this._businessType = businessType;
  }
  
  // Método de validação do CNPJ (simplificado)
  private validateCNPJ(cnpj: string): boolean {
    // Remove caracteres não numéricos
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    
    // Verifica se tem 14 dígitos
    if (cleanCNPJ.length !== 14) {
      return false;
    }
    
    // Verifica se todos os dígitos são iguais
    if (/^(\d)\1+$/.test(cleanCNPJ)) {
      return false;
    }
    
    // Aqui poderia ter a validação completa do CNPJ, mas por simplicidade vamos assumir que passou
    return true;
  }
  
  // Sobrescrita do método polimórfico
  override displayInfo(): string {
    return `${super.displayInfo()} | CNPJ: ${this.formatCNPJ(this._cnpj)} | Tipo: ${this._businessType}`;
  }
  
  // Formata o CNPJ para exibição
  private formatCNPJ(cnpj: string): string {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  }
}
