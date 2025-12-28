import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SavedFilters = ({ onApplyFilter }) => {
  const [showMenu, setShowMenu] = useState(false);

  const savedFilters = [
    {
      id: 'compliance_review',
      name: 'Compliance Review',
      description: 'All validation and rollback events',
      filters: { types: ['validation', 'rollback'], user: 'all' }
    },
    {
      id: 'merge_operations',
      name: 'Merge Operations',
      description: 'All merge and related events',
      filters: { types: ['merge'], user: 'system' }
    },
    {
      id: 'critical_alerts',
      name: 'Critical Alerts',
      description: 'High priority alerts only',
      filters: { types: ['alert'], user: 'all' }
    },
    {
      id: 'admin_actions',
      name: 'Admin Actions',
      description: 'All administrator activities',
      filters: { types: ['all'], user: 'admin' }
    }
  ];

  const handleApplyFilter = (filter) => {
    onApplyFilter(filter?.filters);
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        iconName="Bookmark"
        iconPosition="left"
        onClick={() => setShowMenu(!showMenu)}
      >
        Saved Filters
      </Button>
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-1050"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-80 bg-popover border border-border rounded-lg shadow-lg z-1100">
            <div className="p-4">
              <h4 className="text-sm font-heading font-semibold text-foreground mb-3">
                Saved Filter Sets
              </h4>
              <div className="space-y-2">
                {savedFilters?.map((filter) => (
                  <button
                    key={filter?.id}
                    onClick={() => handleApplyFilter(filter)}
                    className="w-full text-left p-3 rounded-md hover:bg-muted transition-smooth"
                  >
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-sm font-caption font-medium text-foreground">
                        {filter?.name}
                      </span>
                      <Icon name="ChevronRight" size={16} color="var(--color-muted-foreground)" />
                    </div>
                    <p className="text-xs text-muted-foreground">{filter?.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SavedFilters;