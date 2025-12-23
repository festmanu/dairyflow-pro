import { HealthRecord } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Syringe, Stethoscope, HeartPulse, Baby } from "lucide-react";

interface HealthRecordCardProps {
  record: HealthRecord;
  animalName?: string;
}

const typeIcons = {
  vaccination: Syringe,
  treatment: HeartPulse,
  checkup: Stethoscope,
  breeding: Baby,
};

const typeColors = {
  vaccination: "bg-primary/10 text-primary",
  treatment: "bg-destructive/10 text-destructive",
  checkup: "bg-accent text-accent-foreground",
  breeding: "bg-secondary/10 text-secondary",
};

const typeLabels = {
  vaccination: "Vaccination",
  treatment: "Treatment",
  checkup: "Checkup",
  breeding: "Breeding",
};

export function HealthRecordCard({ record, animalName }: HealthRecordCardProps) {
  const Icon = typeIcons[record.type];

  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:shadow-sm">
      <div className={cn("rounded-lg p-3", typeColors[record.type])}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="font-medium text-card-foreground">{record.description}</h4>
          <Badge variant="outline" className={cn("text-xs", typeColors[record.type])}>
            {typeLabels[record.type]}
          </Badge>
        </div>

        {animalName && (
          <p className="text-sm text-muted-foreground mt-1">Animal: {animalName}</p>
        )}

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span>Date: {new Date(record.date).toLocaleDateString()}</span>
          {record.medication && <span>Medication: {record.medication}</span>}
          {record.veterinarian && <span>Vet: {record.veterinarian}</span>}
        </div>

        {record.withdrawalPeriod && (
          <div className="mt-2">
            <Badge variant="destructive" className="text-xs">
              Withdrawal: {record.withdrawalPeriod}h
            </Badge>
          </div>
        )}

        {record.nextDueDate && (
          <p className="mt-2 text-sm text-primary">
            Next due: {new Date(record.nextDueDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
