import React, { useState, useEffect } from 'react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const generateInitialData = () => {
  const data = [];
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000);
    data.push({
      time: time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      throughput: Math.floor(Math.random() * 300) + 700,
      confidence: Math.floor(Math.random() * 15) + 85,
      validations: Math.floor(Math.random() * 250) + 650
    });
  }
  return data;
};

const ChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-md shadow-lg p-3">
        <p className="text-sm font-caption font-medium mb-2">{payload[0]?.payload?.time}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center justify-between space-x-4 text-xs">
            <span className="text-muted-foreground">{entry?.name}:</span>
            <span className="font-medium" style={{ color: entry?.color }}>
              {entry?.name === 'Confidence' ? `${entry?.value}%` : entry?.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const ValidationChart = ({ autoRefreshInterval }) => {
  const [chartData, setChartData] = useState(() => generateInitialData());
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLive) return;
      setChartData(prevData => {
        const next = prevData.slice(1);
        const now = new Date();
        next.push({
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          throughput: Math.floor(Math.random() * 300) + 700,
          confidence: Math.floor(Math.random() * 15) + 85,
          validations: Math.floor(Math.random() * 250) + 650
        });
        return next;
      });
    }, autoRefreshInterval * 1000);

    return () => clearInterval(interval);
  }, [isLive, autoRefreshInterval]);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 md:mb-6 space-y-2 sm:space-y-0">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Real-Time Validation Throughput
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground font-caption mt-1">
            Live streaming data with confidence score overlay
          </p>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-smooth active-press ${
            isLive ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
          <span className="text-xs md:text-sm font-caption font-medium">
            {isLive ? 'Live' : 'Paused'}
          </span>
        </button>
      </div>

      <div className="w-full h-64 md:h-80 lg:h-96" aria-label="Real-time validation throughput chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="throughputGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="confidenceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="time" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis 
              yAxisId="left"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
              tick={{ fill: 'var(--color-muted-foreground)' }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', fontFamily: 'var(--font-caption)' }}
              iconType="circle"
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="throughput"
              stroke="var(--color-primary)"
              fill="url(#throughputGradient)"
              strokeWidth={2}
              name="Throughput"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="confidence"
              stroke="var(--color-accent)"
              strokeWidth={2}
              dot={false}
              name="Confidence"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ValidationChart;