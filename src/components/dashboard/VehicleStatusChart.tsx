
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Vehicle, VehicleStatus } from "@/models/Vehicle";

interface VehicleStatusChartProps {
  vehicles: Vehicle[];
}

export const VehicleStatusChart = ({ vehicles }: VehicleStatusChartProps) => {
  const data = useMemo(() => {
    const counts = {
      [VehicleStatus.Available]: 0,
      [VehicleStatus.Sold]: 0,
    };
    
    for (const vehicle of vehicles) {
      counts[vehicle.status]++;
    }
    
    return [
      { name: "Disponíveis", value: counts[VehicleStatus.Available], color: "#10b981" },
      { name: "Vendidos", value: counts[VehicleStatus.Sold], color: "#ef4444" },
    ];
  }, [vehicles]);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status de Veículos</CardTitle>
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
