import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBreedingRecords, mockAnimals } from "@/data/mockData";
import { AddBreedingRecordDialog } from "@/components/breeding/AddBreedingRecordDialog";
import { BreedingRecord } from "@/types";
import { Plus, Heart, Baby, Search as SearchIcon, Calendar } from "lucide-react";
import { format } from "date-fns";

const typeLabels = {
  heat_detection: "Heat Detection",
  insemination: "Insemination",
  pregnancy_check: "Pregnancy Check",
  calving: "Calving",
};

const typeColors = {
  heat_detection: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
  insemination: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  pregnancy_check: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  calving: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
};

export default function Breeding() {
  const [records, setRecords] = useState<BreedingRecord[]>(mockBreedingRecords);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const getAnimalName = (id: string) => {
    const animal = mockAnimals.find((a) => a.id === id);
    return animal ? `${animal.name} (${animal.tagNumber})` : "Unknown";
  };

  const handleAddRecord = (data: Omit<BreedingRecord, "id">) => {
    setRecords((prev) => [...prev, { ...data, id: String(Date.now()) }]);
  };

  return (
    <MainLayout title="Breeding & Reproduction" subtitle="Track heat cycles, insemination, and calving">
      <div className="flex justify-end mb-6">
        <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-pink-500" />
              <div>
                <p className="text-2xl font-bold">{records.filter(r => r.type === "heat_detection").length}</p>
                <p className="text-sm text-muted-foreground">Heat Detections</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <SearchIcon className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold">{records.filter(r => r.type === "insemination").length}</p>
                <p className="text-sm text-muted-foreground">Inseminations</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-500" />
              <div>
                <p className="text-2xl font-bold">{records.filter(r => r.result === "positive").length}</p>
                <p className="text-sm text-muted-foreground">Confirmed Pregnant</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Baby className="h-8 w-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold">{records.filter(r => r.type === "calving").length}</p>
                <p className="text-sm text-muted-foreground">Calvings</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Breeding Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {records.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <Badge className={typeColors[record.type]}>{typeLabels[record.type]}</Badge>
                  <div>
                    <p className="font-medium">{getAnimalName(record.animalId)}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(record.date), "PPP")}
                      {record.sireName && ` • Sire: ${record.sireName}`}
                    </p>
                  </div>
                </div>
                {record.result && (
                  <Badge variant={record.result === "positive" ? "default" : record.result === "negative" ? "destructive" : "secondary"}>
                    {record.result}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddBreedingRecordDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        animals={mockAnimals}
        onSubmit={handleAddRecord}
      />
    </MainLayout>
  );
}
