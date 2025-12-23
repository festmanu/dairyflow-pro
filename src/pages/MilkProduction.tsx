import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { MilkChart } from "@/components/dashboard/MilkChart";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { mockMilkRecords, mockAnimals, weeklyMilkData } from "@/data/mockData";
import { Plus, Milk, TrendingUp, Droplets, FlaskConical } from "lucide-react";

export default function MilkProduction() {
  const getAnimalName = (animalId: string) => {
    const animal = mockAnimals.find((a) => a.id === animalId);
    return animal ? animal.name : "Unknown";
  };

  const totalToday = mockMilkRecords
    .filter((r) => r.date === "2024-01-20")
    .reduce((sum, r) => sum + r.totalYield, 0);

  const avgSCC =
    mockMilkRecords.filter((r) => r.scc).reduce((sum, r) => sum + (r.scc || 0), 0) /
    mockMilkRecords.filter((r) => r.scc).length;

  return (
    <MainLayout
      title="Milk Production"
      subtitle="Track daily yields and milk quality"
    >
      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Today's Total"
          value={`${totalToday.toFixed(1)}L`}
          icon={Milk}
          variant="primary"
        />
        <StatCard
          title="Avg per Cow"
          value={`${(totalToday / 3).toFixed(1)}L`}
          icon={Droplets}
          trend={{ value: 2.3, isPositive: true }}
        />
        <StatCard
          title="Avg SCC"
          value={Math.round(avgSCC)}
          subtitle="cells/mL (×1000)"
          icon={FlaskConical}
        />
        <StatCard
          title="Weekly Trend"
          value="+3.2%"
          icon={TrendingUp}
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>

      {/* Chart */}
      <div className="mt-6">
        <MilkChart data={weeklyMilkData} />
      </div>

      {/* Records Table */}
      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">
              Recent Records
            </h3>
            <p className="text-sm text-muted-foreground">
              Daily milk production logs
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Log Production
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Animal</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Morning (L)</TableHead>
              <TableHead className="text-right">Evening (L)</TableHead>
              <TableHead className="text-right">Total (L)</TableHead>
              <TableHead className="text-right">SCC</TableHead>
              <TableHead className="text-right">Fat %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockMilkRecords.slice(0, 6).map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">
                  {getAnimalName(record.animalId)}
                </TableCell>
                <TableCell>
                  {new Date(record.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">{record.morningYield}</TableCell>
                <TableCell className="text-right">{record.eveningYield}</TableCell>
                <TableCell className="text-right font-semibold">
                  {record.totalYield}
                </TableCell>
                <TableCell className="text-right">
                  {record.scc && (
                    <Badge
                      variant={record.scc < 200 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {record.scc}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {record.fatPercentage}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </MainLayout>
  );
}
