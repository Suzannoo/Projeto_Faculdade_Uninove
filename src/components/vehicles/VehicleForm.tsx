
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
import { VehicleType, VehicleStatus } from "@/models/Vehicle";
import { Car } from "@/models/Car";
import { Motorcycle } from "@/models/Motorcycle";
import { UtilityVehicle } from "@/models/UtilityVehicle";
import { useToast } from "@/components/ui/use-toast";

interface VehicleFormProps {
  onSave: (vehicle: Car | Motorcycle | UtilityVehicle) => void;
  onCancel: () => void;
  initialVehicle?: Car | Motorcycle | UtilityVehicle;
}

export const VehicleForm = ({ onSave, onCancel, initialVehicle }: VehicleFormProps) => {
  const { toast } = useToast();
  const [id, setId] = useState(initialVehicle?.id || "");
  const [model, setModel] = useState(initialVehicle?.model || "");
  const [manufacturer, setManufacturer] = useState(initialVehicle?.manufacturer || "");
  const [year, setYear] = useState(initialVehicle?.year.toString() || "");
  const [type, setType] = useState<VehicleType>(initialVehicle?.type || VehicleType.Car);
  const [status, setStatus] = useState<VehicleStatus>(initialVehicle?.status || VehicleStatus.Available);

  // Campos específicos para cada tipo de veículo
  const [numDoors, setNumDoors] = useState((initialVehicle as Car)?.numDoors?.toString() || "4");
  const [engineType, setEngineType] = useState((initialVehicle as Car)?.engineType || "Flex");
  const [engineCapacity, setEngineCapacity] = useState((initialVehicle as Motorcycle)?.engineCapacity?.toString() || "");
  const [loadCapacity, setLoadCapacity] = useState((initialVehicle as UtilityVehicle)?.loadCapacity?.toString() || "");
  const [hasTrailer, setHasTrailer] = useState((initialVehicle as UtilityVehicle)?.hasTrailer || false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const yearNum = parseInt(year);
      
      if (yearNum > 2025) {
        toast({
          variant: "destructive",
          title: "Erro de validação",
          description: "Ano de fabricação não pode ser maior que 2025",
        });
        return;
      }
      
      let vehicle;
      
      switch (type) {
        case VehicleType.Car:
          vehicle = new Car(
            id || `C${Date.now()}`,
            model,
            manufacturer,
            yearNum,
            parseInt(numDoors),
            engineType,
            status
          );
          break;
        case VehicleType.Motorcycle:
          if (!engineCapacity) {
            toast({
              variant: "destructive",
              title: "Erro de validação",
              description: "Cilindrada é obrigatória para motos",
            });
            return;
          }
          vehicle = new Motorcycle(
            id || `M${Date.now()}`,
            model,
            manufacturer,
            yearNum,
            parseInt(engineCapacity),
            status
          );
          break;
        case VehicleType.Utility:
          if (!loadCapacity) {
            toast({
              variant: "destructive",
              title: "Erro de validação",
              description: "Capacidade de carga é obrigatória para utilitários",
            });
            return;
          }
          vehicle = new UtilityVehicle(
            id || `U${Date.now()}`,
            model,
            manufacturer,
            yearNum,
            parseInt(loadCapacity),
            hasTrailer,
            status
          );
          break;
      }
      
      onSave(vehicle);
      
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro ao salvar veículo",
          description: error.message,
        });
      }
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{initialVehicle ? "Editar Veículo" : "Cadastrar Veículo"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer">Fabricante</Label>
              <Input
                id="manufacturer"
                value={manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="year">Ano de Fabricação</Label>
              <Input
                id="year"
                type="number"
                min="1900"
                max="2025"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as VehicleType)}
                disabled={initialVehicle !== undefined}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={VehicleType.Car}>Carro</SelectItem>
                  <SelectItem value={VehicleType.Motorcycle}>Moto</SelectItem>
                  <SelectItem value={VehicleType.Utility}>Utilitário</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as VehicleStatus)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={VehicleStatus.Available}>Disponível</SelectItem>
                <SelectItem value={VehicleStatus.Sold}>Vendido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Campos específicos para cada tipo de veículo */}
          {type === VehicleType.Car && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="numDoors">Número de Portas</Label>
                <Input
                  id="numDoors"
                  type="number"
                  min="2"
                  max="5"
                  value={numDoors}
                  onChange={(e) => setNumDoors(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineType">Tipo de Motor</Label>
                <Select
                  value={engineType}
                  onValueChange={setEngineType}
                >
                  <SelectTrigger id="engineType">
                    <SelectValue placeholder="Selecione o tipo de motor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Gasolina">Gasolina</SelectItem>
                    <SelectItem value="Etanol">Etanol</SelectItem>
                    <SelectItem value="Flex">Flex</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Elétrico">Elétrico</SelectItem>
                    <SelectItem value="Híbrido">Híbrido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {type === VehicleType.Motorcycle && (
            <div className="space-y-2">
              <Label htmlFor="engineCapacity">Cilindrada (cc)</Label>
              <Input
                id="engineCapacity"
                type="number"
                min="50"
                max="2500"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value)}
                required
              />
            </div>
          )}
          
          {type === VehicleType.Utility && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="loadCapacity">Capacidade de Carga (kg)</Label>
                <Input
                  id="loadCapacity"
                  type="number"
                  min="100"
                  value={loadCapacity}
                  onChange={(e) => setLoadCapacity(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2 flex items-end">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasTrailer}
                    onChange={(e) => setHasTrailer(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span>Possui Reboque</span>
                </label>
              </div>
            </div>
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
