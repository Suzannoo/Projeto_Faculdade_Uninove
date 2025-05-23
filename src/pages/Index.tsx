
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { VehicleList } from "@/components/vehicles/VehicleList";
import { VehicleForm } from "@/components/vehicles/VehicleForm";
import { CustomerList } from "@/components/customers/CustomerList";
import { CustomerForm } from "@/components/customers/CustomerForm";
import { SaleList } from "@/components/sales/SaleList";
import { SaleForm } from "@/components/sales/SaleForm";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Car } from "@/models/Car";
import { Motorcycle } from "@/models/Motorcycle";
import { UtilityVehicle } from "@/models/UtilityVehicle";
import { Person } from "@/models/Person";
import { Company } from "@/models/Company";
import { DealershipService } from "@/services/DealershipService";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Index = () => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [vehicles, setVehicles] = useState<(Car | Motorcycle | UtilityVehicle)[]>([]);
  const [customers, setCustomers] = useState<(Person | Company)[]>([]);
  const [sales, setSales] = useState<any[]>([]);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [showSaleForm, setShowSaleForm] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Car | Motorcycle | UtilityVehicle | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<Person | Company | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ open: boolean; id: string; type: 'vehicle' | 'customer' }>({
    open: false,
    id: "",
    type: 'vehicle'
  });
  
  const { toast } = useToast();
  const dealershipService = DealershipService.getInstance();
  
  // Inicializa com dados de exemplo
  useEffect(() => {
    dealershipService.initializeSampleData();
    refreshData();
  }, []);
  
  // Atualiza os dados da UI
  const refreshData = () => {
    setVehicles(dealershipService.getAllVehicles() as (Car | Motorcycle | UtilityVehicle)[]);
    setCustomers(dealershipService.getAllCustomers() as (Person | Company)[]);
    setSales(dealershipService.getAllSales());
  };
  
  // Gerenciamento de veículos
  const handleAddVehicle = () => {
    setEditingVehicle(null);
    setShowVehicleForm(true);
  };
  
  const handleEditVehicle = (vehicle: Car | Motorcycle | UtilityVehicle) => {
    setEditingVehicle(vehicle);
    setShowVehicleForm(true);
  };
  
  const handleSaveVehicle = (vehicle: Car | Motorcycle | UtilityVehicle) => {
    try {
      if (editingVehicle) {
        dealershipService.updateVehicle(vehicle);
        toast({
          title: "Veículo atualizado",
          description: `${vehicle.manufacturer} ${vehicle.model} foi atualizado com sucesso`,
        });
      } else {
        dealershipService.addVehicle(vehicle);
        toast({
          title: "Veículo adicionado",
          description: `${vehicle.manufacturer} ${vehicle.model} foi adicionado com sucesso`,
        });
      }
      setShowVehicleForm(false);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message,
        });
      }
    }
  };
  
  const handleDeleteVehicle = (id: string) => {
    setDeleteConfirm({
      open: true,
      id,
      type: 'vehicle'
    });
  };
  
  const confirmDeleteVehicle = () => {
    try {
      dealershipService.deleteVehicle(deleteConfirm.id);
      toast({
        title: "Veículo excluído",
        description: "Veículo foi removido com sucesso",
      });
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro ao excluir",
          description: error.message,
        });
      }
    } finally {
      setDeleteConfirm({ open: false, id: "", type: 'vehicle' });
    }
  };
  
  // Gerenciamento de clientes
  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowCustomerForm(true);
  };
  
  const handleEditCustomer = (customer: Person | Company) => {
    setEditingCustomer(customer);
    setShowCustomerForm(true);
  };
  
  const handleSaveCustomer = (customer: Person | Company) => {
    try {
      if (editingCustomer) {
        dealershipService.updateCustomer(customer);
        toast({
          title: "Cliente atualizado",
          description: `${customer.name} foi atualizado com sucesso`,
        });
      } else {
        dealershipService.addCustomer(customer);
        toast({
          title: "Cliente adicionado",
          description: `${customer.name} foi adicionado com sucesso`,
        });
      }
      setShowCustomerForm(false);
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro",
          description: error.message,
        });
      }
    }
  };
  
  const handleDeleteCustomer = (id: string) => {
    setDeleteConfirm({
      open: true,
      id,
      type: 'customer'
    });
  };
  
  const confirmDeleteCustomer = () => {
    try {
      dealershipService.deleteCustomer(deleteConfirm.id);
      toast({
        title: "Cliente excluído",
        description: "Cliente foi removido com sucesso",
      });
      refreshData();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "Erro ao excluir",
          description: error.message,
        });
      }
    } finally {
      setDeleteConfirm({ open: false, id: "", type: 'customer' });
    }
  };
  
  // Gerenciamento de vendas
  const handleAddSale = () => {
    setShowSaleForm(true);
  };
  
  const handleSaveSale = (vehicleId: string, customerId: string, price: number) => {
    try {
      const sale = dealershipService.createSale(vehicleId, customerId, price);
      toast({
        title: "Venda registrada",
        description: `Venda registrada com sucesso: ${sale.vehicle.manufacturer} ${sale.vehicle.model} para ${sale.customer.name}`,
      });
      setShowSaleForm(false);
      refreshData();
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
  
  // Renderização condicional baseada no menu ativo
  const renderContent = () => {
    if (showVehicleForm) {
      return (
        <VehicleForm
          onSave={handleSaveVehicle}
          onCancel={() => setShowVehicleForm(false)}
          initialVehicle={editingVehicle || undefined}
        />
      );
    }
    
    if (showCustomerForm) {
      return (
        <CustomerForm
          onSave={handleSaveCustomer}
          onCancel={() => setShowCustomerForm(false)}
          initialCustomer={editingCustomer || undefined}
        />
      );
    }
    
    if (showSaleForm) {
      return (
        <SaleForm
          vehicles={vehicles}
          customers={customers}
          onSave={handleSaveSale}
          onCancel={() => setShowSaleForm(false)}
        />
      );
    }
    
    switch (activeMenu) {
      case "home":
        return <Dashboard vehicles={vehicles} customers={customers} sales={sales} />;
      case "vehicles":
        return (
          <VehicleList
            vehicles={vehicles}
            onAddVehicle={handleAddVehicle}
            onEditVehicle={handleEditVehicle}
            onDeleteVehicle={handleDeleteVehicle}
            onRefresh={refreshData}
          />
        );
      case "customers":
        return (
          <CustomerList
            customers={customers}
            onAddCustomer={handleAddCustomer}
            onEditCustomer={handleEditCustomer}
            onDeleteCustomer={handleDeleteCustomer}
            onRefresh={refreshData}
          />
        );
      case "sales":
        return (
          <SaleList
            sales={sales}
            onAddSale={handleAddSale}
            onRefresh={refreshData}
          />
        );
      case "history":
        return (
          <SaleList
            sales={sales}
            onAddSale={handleAddSale}
            onRefresh={refreshData}
          />
        );
      default:
        return <div>Selecione uma opção no menu</div>;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar onMenuSelect={setActiveMenu} activeMenu={activeMenu} />
      
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
      
      <AlertDialog open={deleteConfirm.open} onOpenChange={(open) => !open && setDeleteConfirm({ ...deleteConfirm, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteConfirm.type === 'vehicle' 
                ? "Tem certeza de que deseja excluir este veículo? Esta ação não pode ser desfeita."
                : "Tem certeza de que deseja excluir este cliente? Esta ação não pode ser desfeita."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={deleteConfirm.type === 'vehicle' ? confirmDeleteVehicle : confirmDeleteCustomer}>
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
