import { Animal } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Calendar, Tag, Heart, Stethoscope } from "lucide-react";

interface AnimalDialogProps {
  animal: Animal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusColors = {
  active: "bg-primary/10 text-primary",
  dry: "bg-secondary/10 text-secondary",
  pregnant: "bg-accent text-accent-foreground",
  sold: "bg-muted text-muted-foreground",
  deceased: "bg-destructive/10 text-destructive",
};

export function AnimalDialog({ animal, open, onOpenChange }: AnimalDialogProps) {
  if (!animal) return null;

  const age = Math.floor(
    (new Date().getTime() - new Date(animal.dateOfBirth).getTime()) /
      (365.25 * 24 * 60 * 60 * 1000)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {animal.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-2xl">{animal.name}</DialogTitle>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="outline" className={cn(statusColors[animal.status])}>
                  {animal.status.charAt(0).toUpperCase() + animal.status.slice(1)}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  {animal.tagNumber}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="info" className="mt-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="rounded-lg bg-muted p-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Breed</p>
                  <p className="font-medium">{animal.breed}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="rounded-lg bg-muted p-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{age} years</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="rounded-lg bg-muted p-2">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium capitalize">{animal.gender}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <div className="rounded-lg bg-muted p-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">
                    {new Date(animal.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            {animal.notes && (
              <div className="rounded-lg border border-border p-4">
                <p className="text-sm text-muted-foreground">Notes</p>
                <p className="mt-1">{animal.notes}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="health" className="mt-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Stethoscope className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                No recent health records
              </p>
              <p className="text-sm text-muted-foreground">
                Add vaccinations, treatments, and checkups here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="production" className="mt-4">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Heart className="h-12 w-12 text-muted-foreground/50" />
              <p className="mt-4 text-muted-foreground">
                No milk production data
              </p>
              <p className="text-sm text-muted-foreground">
                Start logging daily yields to see trends
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
