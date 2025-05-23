
import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sale } from "@/models/Sale";

interface SalesSummaryProps {
  sales: Sale[];
  vehicles: number;
  customers: number;
}

export const SalesSummary = ({ sales, vehicles, customers }: SalesSummaryProps) => {
  const totalSales = useMemo(() => {
    return sales.reduce((sum, sale) => sum + sale.price, 0);
  }, [sales]);
  
  const formattedTotal = useMemo(() => {
    return totalSales.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }, [totalSales]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Veículos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{vehicles}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Clientes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{customers}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Vendas Realizadas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sales.length}</div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Volume de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formattedTotal}</div>
        </CardContent>
      </Card>
    </div>
  );
};
