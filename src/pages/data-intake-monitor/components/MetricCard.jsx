import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ title, value, subtitle, trend, trendValue, status, icon }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'error':
        return 'text-error';
      default:
        return 'text-foreground';
    }
  };

  const getStatusBg = () => {
    switch (status) {
      case 'success':
        return 'bg-success/10';
      case 'warning':
        return 'bg-warning/10';
      case 'error':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up' && status === 'success') return 'text-success';
    if (trend === 'down' && status === 'error') return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm hover-lift transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 ${getStatusBg()} rounded-lg flex items-center justify-center`}>
          <Icon name={icon} size={20} color={`var(--color-${status === 'success' ? 'success' : status === 'warning' ? 'warning' : status === 'error' ? 'error' : 'foreground'})`} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
            <Icon name={getTrendIcon()} size={16} />
            <span className="text-xs md:text-sm font-caption font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-xs md:text-sm text-muted-foreground font-caption">{title}</p>
        <p className={`text-2xl md:text-3xl lg:text-4xl font-heading font-semibold ${getStatusColor()}`}>
          {value}
        </p>
        {subtitle && (
          <p className="text-xs md:text-sm text-muted-foreground font-caption">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;