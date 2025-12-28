import React from 'react';
import Icon from '../../../components/AppIcon';

const SourceSystemFilter = ({ selectedSources, onSourceToggle }) => {
  const sources = [
    { id: 'all', label: 'All Sources', icon: 'Database', color: 'text-foreground' },
    { id: 'ats', label: 'ATS', icon: 'Users', color: 'text-primary' },
    { id: 'payroll', label: 'Payroll', icon: 'DollarSign', color: 'text-accent' },
    { id: 'manual', label: 'Manual Entry', icon: 'Edit', color: 'text-secondary' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {sources?.map((source) => {
        const isSelected = selectedSources?.includes(source?.id);
        return (
          <button
            key={source?.id}
            onClick={() => onSourceToggle(source?.id)}
            className={`
              flex items-center space-x-2 px-3 md:px-4 py-2 rounded-md font-caption font-medium
              transition-smooth hover-lift active-press text-sm md:text-base
              ${isSelected
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-card border border-border text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon
              name={source?.icon}
              size={16}
              color={isSelected ? 'var(--color-primary-foreground)' : 'currentColor'}
            />
            <span>{source?.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default SourceSystemFilter;