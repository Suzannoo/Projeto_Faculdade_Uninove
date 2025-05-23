
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Sale } from "@/models/Sale";
import { Plus, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SaleListProps {
  sales: Sale[];
  onAddSale: () => void;
  onRefresh: () => void;
}

export const SaleList = ({
  sales,
  onAddSale,
  onRefresh,
}: SaleListProps) => {
  // Formatar data
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  // Formatar valor
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Vendas Realizadas</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={onRefresh} title="Atualizar">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button onClick={onAddSale}>
            <Plus className="h-4 w-4 mr-2" /> Nova Venda
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {sales.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma venda registrada.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Veículo</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-mono">{sale.id}</TableCell>
                    <TableCell>
                      {sale.vehicle.manufacturer} {sale.vehicle.model} ({sale.vehicle.year})
                    </TableCell>
                    <TableCell>{sale.customer.name}</TableCell>
                    <TableCell>{formatDate(sale.date)}</TableCell>
                    <TableCell className="font-medium">{formatPrice(sale.price)}</TableCell>
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
