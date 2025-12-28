import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterPanel = ({ filters, onFilterChange }) => {
  const dataSourceOptions = [
    { value: 'all', label: 'All Sources' },
    { value: 'ats', label: 'ATS System' },
    { value: 'payroll', label: 'Payroll System' },
    { value: 'manual', label: 'Manual Entry' }
  ];

  const algorithmOptions = [
    { value: 'fuzzy', label: 'Fuzzy Matching' },
    { value: 'phonetic', label: 'Phonetic Algorithm' },
    { value: 'ml', label: 'ML-Based Detection' },
    { value: 'hybrid', label: 'Hybrid Approach' }
  ];

  const recordTypeOptions = [
    { value: 'all', label: 'All Record Types' },
    { value: 'employee', label: 'Employee Records' },
    { value: 'candidate', label: 'Candidate Records' },
    { value: 'contractor', label: 'Contractor Records' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Filter" size={20} color="var(--color-primary)" />
        <h3 className="text-lg font-heading font-semibold text-foreground">
          Detection Filters
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select
          label="Data Source"
          options={dataSourceOptions}
          value={filters?.dataSource}
          onChange={(value) => onFilterChange('dataSource', value)}
        />

        <Select
          label="Algorithm Type"
          options={algorithmOptions}
          value={filters?.algorithm}
          onChange={(value) => onFilterChange('algorithm', value)}
        />

        <Select
          label="Record Type"
          options={recordTypeOptions}
          value={filters?.recordType}
          onChange={(value) => onFilterChange('recordType', value)}
        />

        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Similarity Threshold
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="100"
              value={filters?.threshold}
              onChange={(e) => onFilterChange('threshold', e?.target?.value)}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span className="text-sm font-semibold text-primary data-text">
                {filters?.threshold}%
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <button className="flex items-center space-x-2 px-4 py-2 text-sm font-caption text-muted-foreground hover:text-foreground transition-smooth active-press">
          <Icon name="RotateCcw" size={16} />
          <span>Reset Filters</span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2 px-3 py-1.5 bg-muted rounded-md">
            <Icon name="Clock" size={14} color="var(--color-muted-foreground)" />
            <span className="text-xs text-muted-foreground">
              Last updated: 2 min ago
            </span>
          </div>
          <button className="p-2 hover:bg-muted rounded-md transition-smooth active-press">
            <Icon name="RefreshCw" size={16} color="var(--color-foreground)" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;