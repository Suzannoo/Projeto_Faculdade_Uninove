
import { useState } from "react";
import { Car, Users, ShoppingCart, History, Home } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onMenuSelect: (menu: string) => void;
  activeMenu: string;
}

export const Sidebar = ({ onMenuSelect, activeMenu }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { id: "home", label: "Dashboard", icon: <Home className="h-5 w-5" /> },
    { id: "vehicles", label: "Veículos", icon: <Car className="h-5 w-5" /> },
    { id: "customers", label: "Clientes", icon: <Users className="h-5 w-5" /> },
  ];

  return (
    <div 
      className={cn(
        "bg-dealership-dark text-white h-screen flex flex-col transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-dealership-light/20">
        {!collapsed && (
          <div className="text-xl font-bold">concessionária Uni</div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto p-1 rounded-full hover:bg-dealership/20"
        >
          {collapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onMenuSelect(item.id)}
                className={cn(
                  "w-full flex items-center p-3 rounded-lg transition-colors",
                  activeMenu === item.id 
                    ? "bg-dealership text-white" 
                    : "text-white/70 hover:bg-dealership/40 hover:text-white"
                )}
              >
                <div className="flex items-center">
                  {item.icon}
                  {!collapsed && <span className="ml-3">{item.label}</span>}
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-dealership-light/20">
        {!collapsed && (
          <div className="text-sm text-white/50">Projeto Uninove V3.4</div>
        )}
      </div>
    </div>
  );
};
