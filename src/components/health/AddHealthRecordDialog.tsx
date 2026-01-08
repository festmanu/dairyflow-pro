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
import { Textarea } from "@/components/ui/textarea";
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
import { Animal, HealthRecord } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  animalId: z.string().min(1, "Animal is required"),
  date: z.date({ required_error: "Date is required" }),
  type: z.enum(["vaccination", "treatment", "checkup", "breeding"]),
  description: z.string().min(1, "Description is required"),
  medication: z.string().optional(),
  dosage: z.string().optional(),
  veterinarian: z.string().optional(),
  withdrawalPeriod: z.string().optional(),
  nextDueDate: z.date().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddHealthRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animals: Animal[];
  onSubmit: (data: Omit<HealthRecord, "id">) => void;
}

export function AddHealthRecordDialog({
  open,
  onOpenChange,
  animals,
  onSubmit,
}: AddHealthRecordDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: "",
      type: "checkup",
      description: "",
      medication: "",
      dosage: "",
      veterinarian: "",
      withdrawalPeriod: "",
      notes: "",
    },
  });

  const handleSubmit = (data: FormValues) => {
    onSubmit({
      animalId: data.animalId,
      date: format(data.date, "yyyy-MM-dd"),
      type: data.type,
      description: data.description,
      medication: data.medication || undefined,
      dosage: data.dosage || undefined,
      veterinarian: data.veterinarian || undefined,
      withdrawalPeriod: data.withdrawalPeriod ? parseInt(data.withdrawalPeriod) : undefined,
      nextDueDate: data.nextDueDate ? format(data.nextDueDate, "yyyy-MM-dd") : undefined,
      notes: data.notes || undefined,
    });
    form.reset();
    onOpenChange(false);
    toast.success("Health record added successfully!");
  };

  const recordType = form.watch("type");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Health Record</DialogTitle>
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
                          <SelectValue placeholder="Select animal" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {animals.map((animal) => (
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="vaccination">Vaccination</SelectItem>
                        <SelectItem value="treatment">Treatment</SelectItem>
                        <SelectItem value="checkup">Checkup</SelectItem>
                        <SelectItem value="breeding">Breeding</SelectItem>
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

              <FormField
                control={form.control}
                name="veterinarian"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veterinarian</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Dr. Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Annual BVD vaccination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {(recordType === "vaccination" || recordType === "treatment") && (
              <div className="grid gap-4 sm:grid-cols-3">
                <FormField
                  control={form.control}
                  name="medication"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medication</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Bovilis BVD" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dosage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dosage</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 2ml" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="withdrawalPeriod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Withdrawal Period (hours)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 72" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {recordType === "vaccination" && (
              <FormField
                control={form.control}
                name="nextDueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Next Due Date</FormLabel>
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
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional notes..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Add Record</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
