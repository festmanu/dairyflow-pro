import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { HealthRecordCard } from "@/components/health/HealthRecordCard";
import { AddHealthRecordDialog } from "@/components/health/AddHealthRecordDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockHealthRecords as initialRecords, mockAnimals } from "@/data/mockData";
import { HealthRecord } from "@/types";
import { Plus, Search, Filter } from "lucide-react";

export default function Health() {
  const [records, setRecords] = useState<HealthRecord[]>(initialRecords);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const getAnimalName = (animalId: string) => {
    const animal = mockAnimals.find((a) => a.id === animalId);
    return animal ? `${animal.name} (${animal.tagNumber})` : "Unknown";
  };

  const filteredRecords = records.filter((record) => {
    const animalName = getAnimalName(record.animalId).toLowerCase();
    const matchesSearch =
      animalName.includes(searchQuery.toLowerCase()) ||
      record.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || record.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAddRecord = (data: Omit<HealthRecord, "id">) => {
    setRecords((prev) => [...prev, { ...data, id: String(Date.now()) }]);
  };

  return (
    <MainLayout
      title="Health Records"
      subtitle={`${records.length} total records`}
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-44">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="vaccination">Vaccinations</SelectItem>
              <SelectItem value="treatment">Treatments</SelectItem>
              <SelectItem value="checkup">Checkups</SelectItem>
              <SelectItem value="breeding">Breeding</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <HealthRecordCard
            key={record.id}
            record={record}
            animalName={getAnimalName(record.animalId)}
          />
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-muted-foreground">No records found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      <AddHealthRecordDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        animals={mockAnimals}
        onSubmit={handleAddRecord}
      />
    </MainLayout>
  );
}
