import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ModelVersionSelector = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modelVersions = [
    {
      id: 'v3.2.1',
      label: 'Model v3.2.1',
      status: 'production',
      accuracy: '94.2%',
      deployedDate: '2025-12-15'
    },
    {
      id: 'v3.2.0',
      label: 'Model v3.2.0',
      status: 'previous',
      accuracy: '92.8%',
      deployedDate: '2025-11-20'
    },
    {
      id: 'v3.1.5',
      label: 'Model v3.1.5',
      status: 'archived',
      accuracy: '91.5%',
      deployedDate: '2025-10-10'
    }
  ];

  const selectedModel = modelVersions?.find(m => m?.id === selected);

  const getStatusColor = (status) => {
    switch (status) {
      case 'production':
        return 'text-success bg-success/10';
      case 'previous':
        return 'text-warning bg-warning/10';
      case 'archived':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-card border border-border rounded-lg p-4 md:p-6 hover:bg-muted transition-smooth active-press"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Cpu" size={20} color="var(--color-primary)" />
            </div>
            <div className="text-left">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
                {selectedModel?.label}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`text-xs font-caption px-2 py-0.5 rounded ${getStatusColor(selectedModel?.status)}`}>
                  {selectedModel?.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  Accuracy: {selectedModel?.accuracy}
                </span>
              </div>
            </div>
          </div>
          <Icon 
            name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
            color="var(--color-muted-foreground)" 
          />
        </div>
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-1050"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg z-1100 overflow-hidden">
            {modelVersions?.map((model) => (
              <button
                key={model?.id}
                onClick={() => {
                  onChange(model?.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full p-4 text-left transition-smooth hover:bg-muted
                  ${selected === model?.id ? 'bg-muted' : ''}
                `}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm md:text-base font-caption font-medium text-foreground">
                    {model?.label}
                  </span>
                  {selected === model?.id && (
                    <Icon name="Check" size={18} color="var(--color-accent)" />
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`text-xs font-caption px-2 py-0.5 rounded ${getStatusColor(model?.status)}`}>
                    {model?.status}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {model?.accuracy} accuracy
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Deployed: {model?.deployedDate}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ModelVersionSelector;