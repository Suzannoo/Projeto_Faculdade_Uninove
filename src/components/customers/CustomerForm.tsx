
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomerType } from "@/models/Customer";
import { Person } from "@/models/Person";
import { Company } from "@/models/Company";
import { useToast } from "@/components/ui/use-toast";

interface CustomerFormProps {
  onSave: (customer: Person | Company) => void;
  onCancel: () => void;
  initialCustomer?: Person | Company;
}

export const CustomerForm = ({ onSave, onCancel, initialCustomer }: CustomerFormProps) => {
  const { toast } = useToast();
  const [id, setId] = useState(initialCustomer?.id || "");
  const [name, setName] = useState(initialCustomer?.name || "");
  const [contact, setContact] = useState(initialCustomer?.contact || "");
  const [type, setType] = useState<CustomerType>(initialCustomer?.type || CustomerType.Person);
  
  // Campos específicos para pessoa física
  const [cpf, setCpf] = useState((initialCustomer as Person)?.cpf || "");
  
  // Campos específicos para pessoa jurídica
  const [cnpj, setCnpj] = useState((initialCustomer as Company)?.cnpj || "");
  const [businessType, setBusinessType] = useState((initialCustomer as Company)?.businessType || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let customer;
      
      if (type === CustomerType.Person) {
        customer = new Person(
          id || `P${Date.now()}`,
          name,
          cpf,
          contact
        );
      } else {
        customer = new Company(
          id || `E${Date.now()}`,
          name,
          cnpj,
          contact,
          businessType
        );
      }
      
      onSave(customer);
      
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro ao salvar cliente",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialCustomer ? "Editar Cliente" : "Cadastrar Cliente"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contact">Contato</Label>
              <Input
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as CustomerType)}
                disabled={initialCustomer !== undefined}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={CustomerType.Person}>Pessoa Física</SelectItem>
                  <SelectItem value={CustomerType.Company}>Pessoa Jurídica</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Campos específicos para cada tipo de cliente */}
          {type === CustomerType.Person && (
            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                maxLength={14}
                placeholder="123.456.789-00"
              />
            </div>
          )}
          
          {type === CustomerType.Company && (
            <>
              <div className="space-y-2">
                <Label htmlFor="cnpj">CNPJ</Label>
                <Input
                  id="cnpj"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value)}
                  required
                  maxLength={18}
                  placeholder="12.345.678/0001-90"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Ramo de Atividade</Label>
                <Input
                  id="businessType"
                  value={businessType}
                  onChange={(e) => setBusinessType(e.target.value)}
                  required
                />
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Salvar</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
