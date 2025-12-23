import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface HerdPieChartProps {
  data: { name: string; value: number; color: string }[];
}

export function HerdPieChart({ data }: HerdPieChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-card-foreground">Herd Composition</h3>
        <p className="text-sm text-muted-foreground">Distribution by category</p>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-card-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
