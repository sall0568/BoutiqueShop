import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ReceiptText,
  Boxes,
  Users,
  Settings,
  LogOut,
  Menu,
  FolderOpen,
} from "lucide-react";
import { useUIStore } from "../../store/uiStore";
import { useAuthStore } from "../../store/authStore";
import { clsx } from "clsx";

export default function Sidebar() {
  const location = useLocation();
  const { sidebarOpen, toggleSidebar } = useUIStore();
  const { logout, user } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { label: "Tableau de bord", path: "/", icon: LayoutDashboard },
    { label: "Produits", path: "/products", icon: Package },
    { label: "Catégories", path: "/categories", icon: FolderOpen },
    { label: "Ventes", path: "/sales", icon: ShoppingCart },
    { label: "Dépenses", path: "/expenses", icon: ReceiptText },
    { label: "Stock", path: "/stock", icon: Boxes },
    ...(user?.role === "ADMIN"
      ? [{ label: "Utilisateurs", path: "/users", icon: Users }]
      : []),
    ...(user?.role === "ADMIN"
      ? [{ label: "Paramètres", path: "/settings", icon: Settings }]
      : []),
  ];

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-500 text-white p-2 rounded-lg"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40",
          "transition-transform duration-300 ease-in-out",
          "w-64",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-blue-600">SaaS Gestion</h1>
            <p className="text-xs text-gray-500 mt-1">
              Boutiques & Petits Commerce
            </p>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => sidebarOpen && toggleSidebar()}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            <Link
              to="/settings"
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Settings size={20} />
              <span>Paramètres</span>
            </Link>
            <button
              onClick={() => {
                logout();
                window.location.href = "/login";
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={20} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content margin */}
      <div className="md:ml-64" />
    </>
  );
}
