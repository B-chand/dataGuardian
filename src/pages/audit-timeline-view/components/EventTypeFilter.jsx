import React from 'react';
import Icon from '../../../components/AppIcon';

const EventTypeFilter = ({ selectedTypes, onChange }) => {
  const eventTypes = [
    { value: 'all', label: 'All Events', icon: 'List', color: 'var(--color-foreground)' },
    { value: 'validation', label: 'Validation', icon: 'CheckCircle2', color: 'var(--color-success)' },
    { value: 'merge', label: 'Merge', icon: 'GitMerge', color: 'var(--color-primary)' },
    { value: 'rollback', label: 'Rollback', icon: 'RotateCcw', color: 'var(--color-warning)' },
    { value: 'alert', label: 'Alert', icon: 'AlertTriangle', color: 'var(--color-error)' }
  ];

  const handleTypeToggle = (type) => {
    if (type === 'all') {
      onChange(['all']);
    } else {
      const newTypes = selectedTypes?.includes(type)
        ? selectedTypes?.filter(t => t !== type)
        : [...(selectedTypes ?? []).filter(t => t !== 'all'), type];
      onChange(newTypes?.length === 0 ? ['all'] : newTypes);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {eventTypes?.map((type) => {
        const isSelected = selectedTypes?.includes(type?.value) || 
                          (type?.value === 'all' && selectedTypes?.includes('all'));
        
        return (
          <button
            key={type?.value}
            onClick={() => handleTypeToggle(type?.value)}
            className={`
              flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-caption font-medium
              transition-smooth hover-lift active-press
              ${isSelected 
                ? 'bg-primary text-primary-foreground shadow-sm' 
                : 'bg-card border border-border text-foreground hover:bg-muted'
              }
            `}
          >
            <Icon 
              name={type?.icon} 
              size={16} 
              color={isSelected ? 'var(--color-primary-foreground)' : type?.color} 
            />
            <span>{type?.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default EventTypeFilter;