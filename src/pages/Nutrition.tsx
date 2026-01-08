import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockFeedItems } from "@/data/mockData";
import { Wheat, AlertTriangle } from "lucide-react";

const categoryColors = {
  forage: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  grain: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  concentrate: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  supplement: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  mineral: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export default function Nutrition() {
  const lowStockItems = mockFeedItems.filter(item => item.currentStock <= item.minimumStock * 1.5);
  const totalValue = mockFeedItems.reduce((sum, item) => sum + (item.currentStock * item.costPerUnit), 0);

  return (
    <MainLayout title="Nutrition & Feed" subtitle="Manage feed inventory and rations">
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Wheat className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{mockFeedItems.length}</p>
                <p className="text-sm text-muted-foreground">Feed Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-destructive" />
              <div>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
                <p className="text-sm text-muted-foreground">Low Stock Alerts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Inventory Value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feed Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stock Level</TableHead>
                <TableHead className="text-right">Cost/Unit</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockFeedItems.map((item) => {
                const stockPercentage = (item.currentStock / (item.minimumStock * 3)) * 100;
                const isLow = item.currentStock <= item.minimumStock * 1.5;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      <Badge className={categoryColors[item.category]}>{item.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.currentStock} {item.unit}</span>
                          {isLow && <span className="text-destructive text-xs">Low Stock!</span>}
                        </div>
                        <Progress value={Math.min(stockPercentage, 100)} className={isLow ? "[&>div]:bg-destructive" : ""} />
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${item.costPerUnit.toFixed(2)}</TableCell>
                    <TableCell className="text-right font-medium">${(item.currentStock * item.costPerUnit).toFixed(2)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
