import { ReactNode } from "react";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";
import { useUIStore } from "../store/uiStore";
import { Alert, AlertDescription } from "../components/common/Alert";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { notification } = useUIStore();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
        {/* TopBar */}
        <TopBar />

        {/* Notifications */}
        {notification && (
          <div className="p-4 bg-white border-b border-gray-200">
            <Alert variant={notification.type}>
              <AlertDescription>{notification.message}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
