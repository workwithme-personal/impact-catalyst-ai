import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { YearlyProgress } from "@/types/simulation";

interface SDGProgressChartProps {
  data: YearlyProgress[];
}

export const SDGProgressChart = ({ data }: SDGProgressChartProps) => {
  return (
    <div className="animate-fade-in">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="year" 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="literacy" 
            stroke="hsl(var(--chart-1))" 
            strokeWidth={2}
            name="Literacy (%)"
          />
          <Line 
            type="monotone" 
            dataKey="cleanWater" 
            stroke="hsl(var(--chart-2))" 
            strokeWidth={2}
            name="Clean Water (%)"
          />
          <Line 
            type="monotone" 
            dataKey="renewableEnergy" 
            stroke="hsl(var(--chart-3))" 
            strokeWidth={2}
            name="Renewable Energy (%)"
          />
          <Line 
            type="monotone" 
            dataKey="co2Reduction" 
            stroke="hsl(var(--chart-4))" 
            strokeWidth={2}
            name="CO₂ Reduction (%)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
