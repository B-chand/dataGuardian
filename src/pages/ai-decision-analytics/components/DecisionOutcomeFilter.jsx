import React from 'react';
import Icon from '../../../components/AppIcon';

const DecisionOutcomeFilter = ({ selected, onChange }) => {
  const outcomes = [
    {
      id: 'all',
      label: 'All Decisions',
      icon: 'LayoutGrid',
      color: 'var(--color-foreground)',
      count: 1247
    },
    {
      id: 'auto-merge',
      label: 'Auto-Merged',
      icon: 'CheckCircle2',
      color: 'var(--color-success)',
      count: 892
    },
    {
      id: 'manual-review',
      label: 'Manual Review',
      icon: 'AlertCircle',
      color: 'var(--color-warning)',
      count: 284
    },
    {
      id: 'rejected',
      label: 'Rejected',
      icon: 'XCircle',
      color: 'var(--color-error)',
      count: 71
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
        Decision Outcomes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {outcomes?.map((outcome) => (
          <button
            key={outcome?.id}
            onClick={() => onChange(outcome?.id)}
            className={`
              flex flex-col items-start p-3 md:p-4 rounded-lg border-2 transition-smooth hover-lift active-press
              ${selected === outcome?.id
                ? 'border-accent bg-accent/5' :'border-border bg-background hover:bg-muted'
              }
            `}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <Icon 
                name={outcome?.icon} 
                size={20} 
                color={selected === outcome?.id ? 'var(--color-accent)' : outcome?.color} 
              />
              <span className="text-lg md:text-xl font-heading font-bold text-foreground">
                {outcome?.count}
              </span>
            </div>
            <span className={`
              text-xs md:text-sm font-caption font-medium
              ${selected === outcome?.id ? 'text-accent' : 'text-foreground'}
            `}>
              {outcome?.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DecisionOutcomeFilter;