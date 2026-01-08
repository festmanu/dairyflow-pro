import { Animal } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface PedigreeTreeProps {
  animal: Animal;
  animals: Animal[];
}

const statusColors = {
  active: "bg-primary/10 text-primary border-primary/20",
  dry: "bg-secondary/10 text-secondary border-secondary/20",
  pregnant: "bg-accent text-accent-foreground border-accent-foreground/20",
  sold: "bg-muted text-muted-foreground border-muted",
  deceased: "bg-destructive/10 text-destructive border-destructive/20",
};

interface AnimalNodeProps {
  animal: Animal | undefined;
  label: string;
  className?: string;
}

function AnimalNode({ animal, label, className }: AnimalNodeProps) {
  if (!animal) {
    return (
      <div className={cn("rounded-lg border border-dashed border-muted-foreground/30 p-3 text-center", className)}>
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">Unknown</p>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg border border-border bg-card p-3", className)}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
          {animal.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium">{animal.name}</p>
          <p className="text-xs text-muted-foreground">{animal.tagNumber}</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        <Badge variant="outline" className={cn("text-xs", statusColors[animal.status])}>
          {animal.status}
        </Badge>
        <span className="text-xs text-muted-foreground">{animal.breed}</span>
      </div>
    </div>
  );
}

export function PedigreeTree({ animal, animals }: PedigreeTreeProps) {
  const getAnimal = (id?: string) => animals.find((a) => a.id === id);
  
  const sire = getAnimal(animal.sireId);
  const dam = getAnimal(animal.damId);
  
  const paternalGrandSire = sire ? getAnimal(sire.sireId) : undefined;
  const paternalGrandDam = sire ? getAnimal(sire.damId) : undefined;
  const maternalGrandSire = dam ? getAnimal(dam.sireId) : undefined;
  const maternalGrandDam = dam ? getAnimal(dam.damId) : undefined;

  // Find offspring
  const offspring = animals.filter(
    (a) => a.sireId === animal.id || a.damId === animal.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Family Tree</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Grandparents */}
        <div className="grid grid-cols-4 gap-2">
          <AnimalNode animal={paternalGrandSire} label="Paternal Grand-Sire" />
          <AnimalNode animal={paternalGrandDam} label="Paternal Grand-Dam" />
          <AnimalNode animal={maternalGrandSire} label="Maternal Grand-Sire" />
          <AnimalNode animal={maternalGrandDam} label="Maternal Grand-Dam" />
        </div>

        {/* Connection lines */}
        <div className="flex justify-around">
          <div className="w-px h-6 bg-border mx-auto" style={{ marginLeft: '25%' }}></div>
          <div className="w-px h-6 bg-border mx-auto" style={{ marginLeft: '25%' }}></div>
        </div>

        {/* Parents */}
        <div className="grid grid-cols-2 gap-4">
          <AnimalNode animal={sire} label="Sire (Father)" />
          <AnimalNode animal={dam} label="Dam (Mother)" />
        </div>

        {/* Connection line to subject */}
        <div className="flex justify-center">
          <div className="w-px h-6 bg-border"></div>
        </div>

        {/* Subject */}
        <div className="flex justify-center">
          <div className="rounded-lg border-2 border-primary bg-primary/5 p-4 min-w-64">
            <p className="text-xs text-primary font-medium mb-1">Selected Animal</p>
            <div className="flex items-center gap-3">
              {animal.photo ? (
                <img 
                  src={animal.photo} 
                  alt={animal.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                  {animal.name.charAt(0)}
                </div>
              )}
              <div>
                <p className="font-semibold">{animal.name}</p>
                <p className="text-sm text-muted-foreground">{animal.tagNumber} • {animal.breed}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Offspring */}
        {offspring.length > 0 && (
          <>
            <div className="flex justify-center">
              <div className="w-px h-6 bg-border"></div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3 text-center">Offspring ({offspring.length})</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {offspring.map((child) => (
                  <AnimalNode 
                    key={child.id} 
                    animal={child} 
                    label={animal.id === child.sireId ? "Sired" : "Birthed"} 
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
