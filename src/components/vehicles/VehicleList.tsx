
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Car } from "@/models/Car";
import { Motorcycle } from "@/models/Motorcycle";
import { UtilityVehicle } from "@/models/UtilityVehicle";
import { VehicleStatus, VehicleType } from "@/models/Vehicle";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VehicleListProps {
  vehicles: (Car | Motorcycle | UtilityVehicle)[];
  onAddVehicle: () => void;
  onEditVehicle: (vehicle: Car | Motorcycle | UtilityVehicle) => void;
  onDeleteVehicle: (vehicleId: string) => void;
  onRefresh: () => void;
}

export const VehicleList = ({
  vehicles,
  onAddVehicle,
  onEditVehicle,
  onDeleteVehicle,
  onRefresh,
}: VehicleListProps) => {
  const [filter, setFilter] = useState<VehicleStatus | "all">("all");
  
  const filteredVehicles = filter === "all" 
    ? vehicles 
    : vehicles.filter(v => v.status === filter);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Lista de Veículos</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={() => setFilter("all")}>
            Todos
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilter(VehicleStatus.Available)}
            className={filter === VehicleStatus.Available ? "bg-dealership text-white" : ""}
          >
            Disponíveis
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setFilter(VehicleStatus.Sold)}
            className={filter === VehicleStatus.Sold ? "bg-dealership text-white" : ""}
          >
            Vendidos
          </Button>
          <Button variant="outline" size="sm" onClick={onRefresh} title="Atualizar">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={onAddVehicle}>
            <Plus className="h-4 w-4 mr-2" /> Adicionar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {filteredVehicles.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum veículo encontrado.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Modelo</TableHead>
                  <TableHead>Fabricante</TableHead>
                  <TableHead>Ano</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-mono">{vehicle.id}</TableCell>
                    <TableCell className="font-medium">{vehicle.model}</TableCell>
                    <TableCell>{vehicle.manufacturer}</TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{vehicle.type}</TableCell>
                    <TableCell>
                      {vehicle.type === VehicleType.Car && (
                        <>
                          {(vehicle as Car).numDoors} portas | 
                          Motor: {(vehicle as Car).engineType}
                        </>
                      )}
                      {vehicle.type === VehicleType.Motorcycle && (
                        <>{(vehicle as Motorcycle).engineCapacity}cc</>
                      )}
                      {vehicle.type === VehicleType.Utility && (
                        <>
                          {(vehicle as UtilityVehicle).loadCapacity}kg | 
                          {(vehicle as UtilityVehicle).hasTrailer ? " Com reboque" : " Sem reboque"}
                        </>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          vehicle.status === VehicleStatus.Available
                            ? "bg-dealership-available text-white"
                            : "bg-dealership-sold text-white"
                        }
                      >
                        {vehicle.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onEditVehicle(vehicle)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => onDeleteVehicle(vehicle.id)}
                          disabled={vehicle.status === VehicleStatus.Sold}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
