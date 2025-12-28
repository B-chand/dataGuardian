import React from 'react';

import Select from '../../../components/ui/Select';

const AutoRefreshControl = ({ interval, onIntervalChange, isEnabled, onToggle }) => {
  const intervalOptions = [
    { value: '5', label: '5 seconds' },
    { value: '15', label: '15 seconds' },
    { value: '30', label: '30 seconds' },
    { value: '60', label: '1 minute' }
  ];

  return (
    <div className="flex items-center space-x-3">
      <button
        onClick={onToggle}
        className={`
          flex items-center space-x-2 px-3 md:px-4 py-2 rounded-md font-caption font-medium
          transition-smooth active-press text-sm md:text-base
          ${isEnabled
            ? 'bg-success/10 text-success border border-success/20' :'bg-card border border-border text-muted-foreground hover:bg-muted'
          }
        `}
      >
        <div className={`w-2 h-2 rounded-full ${isEnabled ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
        <span className="hidden sm:inline">{isEnabled ? 'Auto-Refresh On' : 'Auto-Refresh Off'}</span>
        <span className="sm:hidden">{isEnabled ? 'On' : 'Off'}</span>
      </button>

      {isEnabled && (
        <div className="w-32 md:w-40">
          <Select
            options={intervalOptions}
            value={interval}
            onChange={onIntervalChange}
            placeholder="Interval"
          />
        </div>
      )}
    </div>
  );
};

export default AutoRefreshControl;