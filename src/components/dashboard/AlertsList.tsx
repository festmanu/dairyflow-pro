import { Alert } from "@/types";
import { cn } from "@/lib/utils";
import { AlertTriangle, Calendar, Syringe, Heart, Bell } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AlertsListProps {
  alerts: Alert[];
}

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

export function AlertsList({ alerts }: AlertsListProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Alerts</h3>
        <Badge variant="secondary">{alerts.filter(a => !a.isRead).length} new</Badge>
      </div>
      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-3">
          {alerts.map((alert) => {
            const Icon = alertIcons[alert.type];
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50",
                  !alert.isRead && "bg-muted/30"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg p-2",
                    alert.priority === "high"
                      ? "bg-destructive/10 text-destructive"
                      : alert.priority === "medium"
                      ? "bg-secondary/10 text-secondary"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-card-foreground">{alert.title}</p>
                    <Badge className={cn("text-xs", priorityColors[alert.priority])}>
                      {alert.priority}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                  <p className="text-xs text-muted-foreground">
                    Due: {new Date(alert.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
