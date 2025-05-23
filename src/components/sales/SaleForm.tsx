
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
import { VehicleStatus } from "@/models/Vehicle";
import { Vehicle } from "@/models/Vehicle";
import { Customer } from "@/models/Customer";
import { useToast } from "@/components/ui/use-toast";

interface SaleFormProps {
  vehicles: Vehicle[];
  customers: Customer[];
  onSave: (vehicleId: string, customerId: string, price: number) => void;
  onCancel: () => void;
}

export const SaleForm = ({ vehicles, customers, onSave, onCancel }: SaleFormProps) => {
  const { toast } = useToast();
  const [vehicleId, setVehicleId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [price, setPrice] = useState("");
  
  const availableVehicles = vehicles.filter(v => v.status === VehicleStatus.Available);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!vehicleId) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "Selecione um veículo",
        });
        return;
      }
      
      if (!customerId) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "Selecione um cliente",
        });
        return;
      }
      
      if (!price || parseFloat(price) <= 0) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "Informe um valor válido para a venda",
        });
        return;
      }
      
      onSave(vehicleId, customerId, parseFloat(price));
      
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro ao registrar venda",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Registrar Venda</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Veículo</Label>
            <Select
              value={vehicleId}
              onValueChange={setVehicleId}
            >
              <SelectTrigger id="vehicle">
                <SelectValue placeholder="Selecione um veículo" />
              </SelectTrigger>
              <SelectContent>
                {availableVehicles.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Não há veículos disponíveis
                  </SelectItem>
                ) : (
                  availableVehicles.map((vehicle) => (
                    <SelectItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.manufacturer} {vehicle.model} ({vehicle.year})
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customer">Cliente</Label>
            <Select
              value={customerId}
              onValueChange={setCustomerId}
            >
              <SelectTrigger id="customer">
                <SelectValue placeholder="Selecione um cliente" />
              </SelectTrigger>
              <SelectContent>
                {customers.length === 0 ? (
                  <SelectItem value="none" disabled>
                    Não há clientes cadastrados
                  </SelectItem>
                ) : (
                  customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="price">Valor da Venda (R$)</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">Registrar Venda</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
