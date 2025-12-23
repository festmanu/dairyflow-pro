import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AnimalCard } from "@/components/herd/AnimalCard";
import { AnimalDialog } from "@/components/herd/AnimalDialog";
import { AddAnimalDialog } from "@/components/herd/AddAnimalDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockAnimals as initialAnimals } from "@/data/mockData";
import { Animal } from "@/types";
import { Plus, Search, Filter } from "lucide-react";
import { format } from "date-fns";

export default function Herd() {
  const [animals, setAnimals] = useState<Animal[]>(initialAnimals);
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAnimals = animals.filter((animal) => {
    const matchesSearch =
      animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.tagNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || animal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewAnimal = (animal: Animal) => {
    setSelectedAnimal(animal);
    setDialogOpen(true);
  };

  const handleAddAnimal = (data: {
    tagNumber: string;
    name: string;
    breed: string;
    dateOfBirth: Date;
    gender: "female" | "male";
    status: "active" | "dry" | "pregnant" | "sold" | "deceased";
    sireId?: string;
    damId?: string;
    notes?: string;
    photo?: string;
  }) => {
    const newAnimal: Animal = {
      id: String(Date.now()),
      tagNumber: data.tagNumber,
      name: data.name,
      breed: data.breed,
      dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd"),
      gender: data.gender,
      status: data.status,
      sireId: data.sireId || undefined,
      damId: data.damId || undefined,
      notes: data.notes,
      photo: data.photo,
    };
    setAnimals((prev) => [...prev, newAnimal]);
  };

  return (
    <MainLayout
      title="Herd Management"
      subtitle={`Managing ${animals.length} animals`}
    >
      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Lactating</SelectItem>
              <SelectItem value="dry">Dry</SelectItem>
              <SelectItem value="pregnant">Pregnant</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          Add Animal
        </Button>
      </div>

      {/* Animals Grid */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredAnimals.map((animal) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onView={handleViewAnimal}
          />
        ))}
      </div>

      {filteredAnimals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-lg text-muted-foreground">No animals found</p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Animal Detail Dialog */}
      <AnimalDialog
        animal={selectedAnimal}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />

      {/* Add Animal Dialog */}
      <AddAnimalDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        animals={animals}
        onSubmit={handleAddAnimal}
      />
    </MainLayout>
  );
}
