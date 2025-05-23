
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Vehicle, VehicleType } from "@/models/Vehicle";

interface VehicleTypesChartProps {
  vehicles: Vehicle[];
}

export const VehicleTypesChart = ({ vehicles }: VehicleTypesChartProps) => {
  const data = useMemo(() => {
    const counts = {
      [VehicleType.Car]: 0,
      [VehicleType.Motorcycle]: 0,
      [VehicleType.Utility]: 0,
    };
    
    for (const vehicle of vehicles) {
      counts[vehicle.type]++;
    }
    
    return [
      { name: "Carros", value: counts[VehicleType.Car], color: "#1a56db" },
      { name: "Motos", value: counts[VehicleType.Motorcycle], color: "#7c3aed" },
      { name: "Utilitários", value: counts[VehicleType.Utility], color: "#2563eb" },
    ];
  }, [vehicles]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tipos de Veículos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => 
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} veículos`, "Quantidade"]} />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
