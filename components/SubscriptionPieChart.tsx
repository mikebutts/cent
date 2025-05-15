'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28BD4', '#FC5185'];

type Subscription = {
  id: string;
  name: string;
  cost: number | string;
  category: string;
};

type Props = {
  subscriptions: Subscription[];
};

export default function SubscriptionPieChart({ subscriptions }: Props) {
  if (!subscriptions || subscriptions.length === 0) {
    return <p className="mt-6 text-gray-500">No data available to chart.</p>;
  }

  const generatePieData = (subs: Subscription[]) => {
    const result: Record<string, number> = {};

    subs.forEach(sub => {
      const cost = parseFloat(sub.cost as string) || 0;
      result[sub.category] = (result[sub.category] || 0) + cost;
    });

    return Object.entries(result).map(([name, value]) => ({ name, value }));
  };

  const data = generatePieData(subscriptions);

  return (
    <div className="mt-10">
      <h3 className="text-lg font-semibold mb-4">Cost by Category</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
