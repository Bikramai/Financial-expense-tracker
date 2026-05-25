import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

const CATEGORY_COLORS = {
  food:          '#fbbf24',
  housing:       '#60a5fa',
  utilities:     '#a78bfa',
  transport:     '#22d3ee',
  entertainment: '#f472b6',
  salary:        '#34d399',
  other:         '#9ca3af',
};

const DEFAULT_COLOR = '#6366f1';

export default function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="spending-chart">
        <p className="section-label">Spending by Category</p>
        <p className="chart-empty">No expenses to display.</p>
      </div>
    );
  }

  return (
    <div className="spending-chart">
      <p className="section-label">Spending by Category</p>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />
          <XAxis
            dataKey="name"
            tick={{ fill: '#475569', fontSize: 12, fontFamily: 'Outfit, sans-serif' }}
            axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${v}`}
            tick={{ fill: '#475569', fontSize: 11, fontFamily: 'JetBrains Mono, monospace' }}
            axisLine={false}
            tickLine={false}
            width={58}
          />
          <Tooltip
            formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
            contentStyle={{
              background: '#1e293b',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '13px',
              color: '#e2e8f0',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
            }}
            labelStyle={{ color: '#94a3b8', marginBottom: 4 }}
            cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          />
          <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={56}>
            {data.map((entry, index) => (
              <Cell key={index} fill={CATEGORY_COLORS[entry.name] || DEFAULT_COLOR} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
