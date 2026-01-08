import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTransactions, monthlyFinancialData } from "@/data/mockData";
import { AddTransactionDialog } from "@/components/finance/AddTransactionDialog";
import { Transaction } from "@/types";
import { Plus, DollarSign, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { format } from "date-fns";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function Finance() {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [addDialogOpen, setAddDialogOpen] = useState(false);

  const totalIncome = transactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const netProfit = totalIncome - totalExpenses;

  const handleAddTransaction = (data: Omit<Transaction, "id">) => {
    setTransactions((prev) => [{ ...data, id: String(Date.now()) }, ...prev]);
  };

  return (
    <MainLayout title="Financial Management" subtitle="Track income, expenses, and profitability">
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <StatCard title="Total Income" value={`$${totalIncome.toLocaleString()}`} icon={TrendingUp} variant="primary" />
        <StatCard title="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} icon={TrendingDown} />
        <StatCard title="Net Profit" value={`$${netProfit.toLocaleString()}`} icon={Wallet} trend={{ value: 12, isPositive: netProfit > 0 }} />
        <StatCard title="Profit Margin" value={`${totalIncome > 0 ? ((netProfit / totalIncome) * 100).toFixed(1) : 0}%`} icon={DollarSign} />
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Monthly Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFinancialData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }} />
                <Legend />
                <Area type="monotone" dataKey="income" stackId="1" stroke="hsl(var(--chart-1))" fill="hsl(var(--chart-1))" fillOpacity={0.6} name="Income" />
                <Area type="monotone" dataKey="expenses" stackId="2" stroke="hsl(var(--chart-2))" fill="hsl(var(--chart-2))" fillOpacity={0.6} name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <Button className="gap-2" onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Transaction
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>{format(new Date(t.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge variant={t.type === "income" ? "default" : "secondary"}>
                      {t.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{t.category}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell className={`text-right font-medium ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <AddTransactionDialog open={addDialogOpen} onOpenChange={setAddDialogOpen} onSubmit={handleAddTransaction} />
    </MainLayout>
  );
}
