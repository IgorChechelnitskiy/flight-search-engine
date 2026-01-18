import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartConfig = {
  price: {
    label: 'Price',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export function FlightChart({ data }: { data: any[] }) {
  const currency = data[0]?.currency || 'USD';

  return (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm mb-8">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900">Price Analysis</h3>
        <p className="text-sm text-slate-500">
          All flight offers in {currency}
        </p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <BarChart
          data={data}
          margin={{ top: 20, right: 10, left: 10, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#f1f5f9"
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickMargin={10}
            tickFormatter={(value) =>
              `${currency === 'USD' ? '$' : currency} ${value}`
            }
            width={80}
            domain={['dataMin - 50', 'auto']}
          />

          <XAxis
            dataKey="airline"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            fontSize={11}
            fontWeight={600}
          />

          <ChartTooltip
            cursor={{ fill: '#f8fafc' }}
            content={<ChartTooltipContent hideLabel />}
          />

          <Bar
            dataKey="price"
            radius={[4, 4, 0, 0]}
            barSize={data.length > 20 ? undefined : 40}
          >
            {data.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === 0 ? '#10b981' : '#2563eb'}
                fillOpacity={0.9}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
}
