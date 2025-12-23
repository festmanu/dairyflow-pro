import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { mockAlerts, mockAnimals } from "@/data/mockData";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, Syringe, Heart, Bell, Check } from "lucide-react";
import { useState } from "react";
import { Alert } from "@/types";

const alertIcons = {
  vaccination: Syringe,
  calving: Heart,
  breeding: Calendar,
  health: AlertTriangle,
  general: Bell,
};

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-secondary text-secondary-foreground",
  high: "bg-destructive text-destructive-foreground",
};

export default function Alerts() {
  const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);

  const markAsRead = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.id === alertId ? { ...alert, isRead: true } : alert
      )
    );
  };

  const markAllAsRead = () => {
    setAlerts((prev) => prev.map((alert) => ({ ...alert, isRead: true })));
  };

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const getAnimalName = (animalId?: string) => {
    if (!animalId) return null;
    const animal = mockAnimals.find((a) => a.id === animalId);
    return animal ? `${animal.name} (${animal.tagNumber})` : null;
  };

  return (
    <MainLayout
      title="Alerts & Reminders"
      subtitle={`${unreadCount} unread notifications`}
    >
      {/* Header Actions */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="default" className="text-sm">
            {alerts.length} Total
          </Badge>
          <Badge variant="destructive" className="text-sm">
            {alerts.filter((a) => a.priority === "high").length} High Priority
          </Badge>
        </div>
        <Button
          variant="outline"
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className="gap-2"
        >
          <Check className="h-4 w-4" />
          Mark All Read
        </Button>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {alerts.map((alert) => {
          const Icon = alertIcons[alert.type];
          const animalName = getAnimalName(alert.animalId);

          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-sm",
                !alert.isRead && "border-l-4 border-l-primary bg-primary/5"
              )}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={alert.isRead}
                  onCheckedChange={() => markAsRead(alert.id)}
                />
                <div
                  className={cn(
                    "rounded-lg p-3",
                    alert.priority === "high"
                      ? "bg-destructive/10 text-destructive"
                      : alert.priority === "medium"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-medium text-card-foreground">
                    {alert.title}
                  </h4>
                  <Badge
                    className={cn("text-xs", priorityColors[alert.priority])}
                  >
                    {alert.priority}
                  </Badge>
                  <Badge variant="outline" className="text-xs capitalize">
                    {alert.type}
                  </Badge>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {alert.description}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm">
                  <span className="flex items-center gap-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Due: {new Date(alert.dueDate).toLocaleDateString()}
                  </span>
                  {animalName && (
                    <span className="text-primary">{animalName}</span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  View
                </Button>
                <Button size="sm">Take Action</Button>
              </div>
            </div>
          );
        })}
      </div>

      {alerts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg text-muted-foreground">
            No alerts at this time
          </p>
          <p className="text-sm text-muted-foreground">
            You're all caught up!
          </p>
        </div>
      )}
    </MainLayout>
  );
}
