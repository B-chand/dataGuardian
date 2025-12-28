import React from 'react';
import Icon from '../../../components/AppIcon';

const KPIMetricCard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  icon, 
  iconColor,
  description 
}) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 transition-smooth hover:shadow-md">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="flex-1">
          <p className="text-sm md:text-base text-muted-foreground font-caption mb-1">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
              {value}
            </h3>
            {unit && (
              <span className="text-sm md:text-base text-muted-foreground font-caption">
                {unit}
              </span>
            )}
          </div>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
          <Icon name={icon} size={20} color={iconColor || 'var(--color-primary)'} />
        </div>
      </div>

      {description && (
        <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
          {description}
        </p>
      )}

      {trend && (
        <div className="flex items-center space-x-2">
          <Icon name={getTrendIcon()} size={16} color={getTrendColor()} />
          <span className={`text-xs md:text-sm font-caption font-medium ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs last period</span>
        </div>
      )}
    </div>
  );
};

export default KPIMetricCard;