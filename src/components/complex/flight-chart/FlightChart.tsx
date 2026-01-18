import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import cs from './FlightChart.module.scss';

const chartConfig = {
  price: {
    label: 'Price',
    color: '#2563eb',
  },
} satisfies ChartConfig;

export function FlightChart({ data }: { data: any[] }) {
  if (!data?.length) return null;
  const currency = data[0]?.currency || 'USD';

  return (
    <div className={cs.chartWrapper}>
      <div className={cs.header}>
        <h3 className={cs.title}>Price Analysis</h3>
        <p className={cs.subtitle}>All flight offers in {currency}</p>
      </div>

      <ChartContainer config={chartConfig} className={cs.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }} // Negative left to recover YAxis space
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="rgba(0,0,0,0.05)"
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              fontSize={11}
              tickMargin={8}
              tickFormatter={(value) =>
                `${currency === 'USD' ? '$' : ''}${value}`
              }
              width={60}
              domain={['dataMin - 50', 'auto']}
              hide={typeof window !== 'undefined' && window.innerWidth < 400}
            />

            <XAxis
              dataKey="airline"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              fontSize={10}
              fontWeight={600}
              interval="preserveStartEnd"
            />

            <ChartTooltip
              cursor={{ fill: 'rgba(255,255,255,0.4)' }}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar
              dataKey="price"
              radius={[6, 6, 0, 0]}
              barSize={data.length > 10 ? undefined : 32}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#10b981' : '#3b82f6'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
}
