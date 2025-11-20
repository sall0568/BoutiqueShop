// src/components/dashboard/RecentActivities.tsx
import Card from "../common/Card";
import { RecentActivity } from "../../types";
import { formatDateTime } from "../../utils/formatters";
import { ShoppingCart, Receipt, Package } from "lucide-react";

interface RecentActivitiesProps {
  activities: RecentActivity[];
  isLoading?: boolean;
}

export default function RecentActivities({
  activities,
  isLoading,
}: RecentActivitiesProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ShoppingCart size={16} className="text-green-600" />;
      case "expense":
        return <Receipt size={16} className="text-red-600" />;
      case "stock":
        return <Package size={16} className="text-blue-600" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <h3 className="text-lg font-semibold mb-4">Activités Récentes</h3>
      {isLoading ? (
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="p-2 bg-gray-200 rounded-full">
                {getIcon(activity.type)}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDateTime(activity.createdAt)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
