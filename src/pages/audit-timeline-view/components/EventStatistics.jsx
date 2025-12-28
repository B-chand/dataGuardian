import React from 'react';
import Icon from '../../../components/AppIcon';

const EventStatistics = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Events',
      value: stats?.totalEvents,
      icon: 'Activity',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Validations',
      value: stats?.validations,
      icon: 'CheckCircle2',
      color: 'var(--color-success)',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Merges',
      value: stats?.merges,
      icon: 'GitMerge',
      color: 'var(--color-primary)',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Rollbacks',
      value: stats?.rollbacks,
      icon: 'RotateCcw',
      color: 'var(--color-warning)',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Alerts',
      value: stats?.alerts,
      icon: 'AlertTriangle',
      color: 'var(--color-error)',
      bgColor: 'bg-error/10'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
        Event Statistics
      </h3>
      <div className="space-y-3">
        {statItems?.map((item) => (
          <div key={item?.label} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-md ${item?.bgColor} flex items-center justify-center`}>
                <Icon name={item?.icon} size={16} color={item?.color} />
              </div>
              <span className="text-sm font-caption text-foreground">{item?.label}</span>
            </div>
            <span className="text-base font-heading font-semibold text-foreground data-text">
              {item?.value?.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventStatistics;