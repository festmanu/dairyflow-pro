import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { AlertsList } from "@/components/dashboard/AlertsList";
import { MilkChart } from "@/components/dashboard/MilkChart";
import { HerdPieChart } from "@/components/dashboard/HerdPieChart";
import {
  mockDashboardStats,
  mockAlerts,
  weeklyMilkData,
  herdComposition,
} from "@/data/mockData";
import { Milk, Users, Droplets, Bell, TrendingUp, Baby } from "lucide-react";

export default function Dashboard() {
  return (
    <MainLayout title="Dashboard" subtitle="Welcome back, John! Here's your farm overview.">
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Herd"
          value={mockDashboardStats.totalHerd}
          subtitle="Animals"
          icon={Users}
          trend={{ value: 4.2, isPositive: true }}
        />
        <StatCard
          title="Today's Milk"
          value={`${mockDashboardStats.todayMilkYield}L`}
          subtitle={`Avg ${mockDashboardStats.avgMilkPerCow}L/cow`}
          icon={Milk}
          trend={{ value: 2.1, isPositive: true }}
          variant="primary"
        />
        <StatCard
          title="Lactating Cows"
          value={mockDashboardStats.lactatingCows}
          subtitle={`${mockDashboardStats.dryCows} dry`}
          icon={Droplets}
        />
        <StatCard
          title="Pending Alerts"
          value={mockDashboardStats.pendingAlerts}
          subtitle="Action required"
          icon={Bell}
          variant="secondary"
        />
      </div>

      {/* Secondary Stats */}
      <div className="mt-4 grid gap-4 md:grid-cols-3">
        <StatCard
          title="Heifers"
          value={mockDashboardStats.heifers}
          icon={Baby}
        />
        <StatCard
          title="Bulls"
          value={mockDashboardStats.bulls}
          icon={TrendingUp}
        />
        <StatCard
          title="Avg Yield/Cow"
          value={`${mockDashboardStats.avgMilkPerCow}L`}
          icon={Milk}
          trend={{ value: 1.5, isPositive: true }}
        />
      </div>

      {/* Charts and Alerts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <MilkChart data={weeklyMilkData} />
        <HerdPieChart data={herdComposition} />
      </div>

      {/* Alerts */}
      <div className="mt-6">
        <AlertsList alerts={mockAlerts} />
      </div>
    </MainLayout>
  );
}
