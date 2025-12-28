import React, { useState } from 'react';
import Icon from '../AppIcon';

const TimeRangeSelector = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustom, setShowCustom] = useState(false);

  const presetRanges = [
    { label: 'Last 24 Hours', value: '24h' },
    { label: 'Last 7 Days', value: '7d' },
    { label: 'Last 30 Days', value: '30d' },
    { label: 'Last 90 Days', value: '90d' },
    { label: 'Custom Range', value: 'custom' }
  ];

  const handleRangeSelect = (rangeValue) => {
    if (rangeValue === 'custom') {
      setShowCustom(true);
    } else {
      onChange(rangeValue);
      setIsOpen(false);
      setShowCustom(false);
    }
  };

  const getCurrentLabel = () => {
    const preset = presetRanges?.find(r => r?.value === value);
    return preset ? preset?.label : 'Select Range';
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-card border border-border rounded-md hover:bg-muted transition-smooth active-press"
        aria-label="Select time range"
      >
        <Icon name="Calendar" size={18} color="var(--color-foreground)" />
        <span className="text-sm font-caption font-medium text-foreground hidden sm:inline">
          {getCurrentLabel()}
        </span>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          color="var(--color-muted-foreground)" 
        />
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-1050"
            onClick={() => {
              setIsOpen(false);
              setShowCustom(false);
            }}
          />
          <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-lg z-1100">
            {!showCustom ? (
              <div className="py-2">
                {presetRanges?.map((range) => (
                  <button
                    key={range?.value}
                    onClick={() => handleRangeSelect(range?.value)}
                    className={`
                      w-full text-left px-4 py-2 text-sm font-caption
                      transition-smooth hover:bg-muted
                      ${value === range?.value ? 'bg-muted text-primary font-medium' : 'text-popover-foreground'}
                    `}
                  >
                    {range?.label}
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-4">
                <div className="text-sm font-caption font-medium mb-3">Custom Date Range</div>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus-ring"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus-ring"
                    />
                  </div>
                  <div className="flex space-x-2 pt-2">
                    <button
                      onClick={() => setShowCustom(false)}
                      className="flex-1 px-3 py-2 text-sm font-caption bg-muted rounded-md hover:bg-muted/80 transition-smooth"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        onChange('custom');
                        setIsOpen(false);
                        setShowCustom(false);
                      }}
                      className="flex-1 px-3 py-2 text-sm font-caption bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-smooth"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeRangeSelector;