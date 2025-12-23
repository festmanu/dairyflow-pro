import { Animal } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AnimalCardProps {
  animal: Animal;
  onView: (animal: Animal) => void;
}

const statusColors = {
  active: "bg-primary/10 text-primary border-primary/20",
  dry: "bg-secondary/10 text-secondary border-secondary/20",
  pregnant: "bg-accent text-accent-foreground border-accent-foreground/20",
  sold: "bg-muted text-muted-foreground border-muted",
  deceased: "bg-destructive/10 text-destructive border-destructive/20",
};

const statusLabels = {
  active: "Lactating",
  dry: "Dry",
  pregnant: "Pregnant",
  sold: "Sold",
  deceased: "Deceased",
};

export function AnimalCard({ animal, onView }: AnimalCardProps) {
  const age = Math.floor(
    (new Date().getTime() - new Date(animal.dateOfBirth).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xl font-bold text-primary">
          {animal.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-card-foreground truncate">
              {animal.name}
            </h3>
            <Badge
              variant="outline"
              className={cn("text-xs", statusColors[animal.status])}
            >
              {statusLabels[animal.status]}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Tag: {animal.tagNumber}
          </p>
          <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
            <span className="rounded-md bg-muted px-2 py-1">{animal.breed}</span>
            <span className="rounded-md bg-muted px-2 py-1">{age} yrs old</span>
            <span className="rounded-md bg-muted px-2 py-1 capitalize">
              {animal.gender}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onView(animal)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Add Health Record</DropdownMenuItem>
              <DropdownMenuItem>Log Milk Production</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
