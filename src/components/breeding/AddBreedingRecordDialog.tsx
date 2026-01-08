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
import { Animal, BreedingRecord } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  animalId: z.string().min(1, "Animal is required"),
  date: z.date({ required_error: "Date is required" }),
  type: z.enum(["heat_detection", "insemination", "pregnancy_check", "calving"]),
  sireId: z.string().optional(),
  technician: z.string().optional(),
  result: z.enum(["positive", "negative", "pending"]).optional(),
  expectedCalvingDate: z.date().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface AddBreedingRecordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  animals: Animal[];
  onSubmit: (data: Omit<BreedingRecord, "id">) => void;
}

export function AddBreedingRecordDialog({
  open,
  onOpenChange,
  animals,
  onSubmit,
}: AddBreedingRecordDialogProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: "",
      type: "heat_detection",
      sireId: "none",
      technician: "",
      notes: "",
    },
  });

  const femaleAnimals = animals.filter((a) => a.gender === "female");
  const maleAnimals = animals.filter((a) => a.gender === "male");
  const recordType = form.watch("type");

  const handleSubmit = (data: FormValues) => {
    const sire = maleAnimals.find((a) => a.id === data.sireId);
    onSubmit({
      animalId: data.animalId,
      date: format(data.date, "yyyy-MM-dd"),
      type: data.type,
      sireId: data.sireId === "none" ? undefined : data.sireId,
      sireName: sire?.name,
      technician: data.technician || undefined,
      result: data.result,
      expectedCalvingDate: data.expectedCalvingDate 
        ? format(data.expectedCalvingDate, "yyyy-MM-dd") 
        : undefined,
      notes: data.notes || undefined,
    });
    form.reset();
    onOpenChange(false);
    toast.success("Breeding record added successfully!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Breeding Record</DialogTitle>
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
                        {femaleAnimals.map((animal) => (
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
                        <SelectItem value="heat_detection">Heat Detection</SelectItem>
                        <SelectItem value="insemination">Insemination</SelectItem>
                        <SelectItem value="pregnancy_check">Pregnancy Check</SelectItem>
                        <SelectItem value="calving">Calving</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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

            {recordType === "insemination" && (
              <>
                <FormField
                  control={form.control}
                  name="sireId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sire</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select sire" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None / Unknown</SelectItem>
                          {maleAnimals.map((animal) => (
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
                  name="technician"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technician</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {recordType === "pregnancy_check" && (
              <>
                <FormField
                  control={form.control}
                  name="result"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Result</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select result" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="positive">Positive (Pregnant)</SelectItem>
                          <SelectItem value="negative">Negative</SelectItem>
                          <SelectItem value="pending">Pending / Recheck</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("result") === "positive" && (
                  <FormField
                    control={form.control}
                    name="expectedCalvingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Expected Calving Date</FormLabel>
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
              </>
            )}

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Additional observations..."
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
