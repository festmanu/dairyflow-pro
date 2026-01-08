import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Animal, MilkRecord } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  animalId: z.string().min(1, "Animal is required"),
  date: z.date({ required_error: "Date is required" }),
  morningYield: z.string().min(1, "Morning yield is required"),
  eveningYield: z.string().min(1, "Evening yield is required"),
  scc: z.string().optional(),
  fatPercentage: z.string().optional(),
  proteinPercentage: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddMilkRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animals: Animal[];
  onSubmit: (data: Omit<MilkRecord, "id">) => void;
}

export function AddMilkRecordDialog({
  open,
  onOpenChange,
  animals,
  onSubmit,
}: AddMilkRecordDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: "",
      morningYield: "",
      eveningYield: "",
      scc: "",
      fatPercentage: "",
      proteinPercentage: "",
    },
  });

  const lactatingAnimals = animals.filter(
    (a) => a.gender === "female" && a.status === "active"
  );

  const handleSubmit = (data: FormValues) => {
    const morning = parseFloat(data.morningYield);
    const evening = parseFloat(data.eveningYield);
    
    onSubmit({
      animalId: data.animalId,
      date: format(data.date, "yyyy-MM-dd"),
      morningYield: morning,
      eveningYield: evening,
      totalYield: morning + evening,
      scc: data.scc ? parseInt(data.scc) : undefined,
      fatPercentage: data.fatPercentage ? parseFloat(data.fatPercentage) : undefined,
      proteinPercentage: data.proteinPercentage ? parseFloat(data.proteinPercentage) : undefined,
    });
    form.reset();
    onOpenChange(false);
    toast.success("Milk production logged successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Log Milk Production</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="animalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Animal *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select cow" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {lactatingAnimals.map((animal) => (
                          <SelectItem key={animal.id} value={animal.id}>
                            {animal.name} ({animal.tagNumber})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="morningYield"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Morning Yield (L) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="e.g., 15.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="eveningYield"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Evening Yield (L) *</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" placeholder="e.g., 14.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">Quality Metrics (Optional)</h3>
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="scc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SCC (×1000)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 120" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fatPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fat %</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 3.8" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="proteinPercentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Protein %</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 3.2" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Log Production</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
