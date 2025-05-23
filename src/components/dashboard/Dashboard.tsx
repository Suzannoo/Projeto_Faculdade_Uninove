
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SalesSummary } from "./SalesSummary";
import { VehicleTypesChart } from "./VehicleTypesChart";
import { VehicleStatusChart } from "./VehicleStatusChart";
import { Vehicle } from "@/models/Vehicle";
import { Customer } from "@/models/Customer";
import { Sale } from "@/models/Sale";

interface DashboardProps {
  vehicles: Vehicle[];
  customers: Customer[];
  sales: Sale[];
}

export const Dashboard = ({ vehicles, customers, sales }: DashboardProps) => {
  return (
    <div className="space-y-6">
      <SalesSummary
        sales={sales}
        vehicles={vehicles.length}
        customers={customers.length}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VehicleTypesChart vehicles={vehicles} />
        <VehicleStatusChart vehicles={vehicles} />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Sobre o Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            O sistema é completo para gerenciamento de concessionárias, 
            permitindo o cadastro de veículos, clientes e o registro de vendas. 
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
