import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "accent";
}

const variantStyles = {
  default: "bg-card",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  accent: "bg-accent text-accent-foreground",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary-foreground/20 text-primary-foreground",
  secondary: "bg-secondary-foreground/20 text-secondary-foreground",
  accent: "bg-accent-foreground/20 text-accent-foreground",
};

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border p-6 shadow-sm transition-all hover:shadow-md",
        variantStyles[variant]
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p
            className={cn(
              "text-sm font-medium",
              variant === "default" ? "text-muted-foreground" : "opacity-80"
            )}
          >
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold">{value}</p>
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-primary" : "text-destructive"
                )}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            )}
          </div>
          {subtitle && (
            <p
              className={cn(
                "text-sm",
                variant === "default" ? "text-muted-foreground" : "opacity-70"
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div
          className={cn(
            "rounded-lg p-3",
            iconStyles[variant]
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
