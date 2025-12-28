import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, change, trend, icon, iconColor }) => {
  const isPositive = change >= 0;
  const trendColor = trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm hover-lift transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground font-caption mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground data-text">
            {value}
          </h3>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${iconColor}15` }}>
          <Icon name={icon} size={20} color={iconColor} />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <div className={`flex items-center space-x-1 ${isPositive ? 'text-success' : 'text-error'}`}>
          <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={16} />
          <span className="text-sm font-caption font-medium">{Math.abs(change)}%</span>
        </div>
        <span className="text-xs text-muted-foreground">vs last period</span>
      </div>
      <div className="mt-3 h-12 flex items-end space-x-1">
        {[65, 72, 68, 75, 82, 78, 85, 88, 92, 87, 90, 95]?.map((height, idx) => (
          <div
            key={idx}
            className={`flex-1 rounded-t ${trendColor} opacity-60`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default MetricsCard;