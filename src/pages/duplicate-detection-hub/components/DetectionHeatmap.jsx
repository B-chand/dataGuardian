import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DetectionHeatmap = ({ data }) => {
  const [selectedCell, setSelectedCell] = useState(null);

  const getHeatColor = (value) => {
    if (value >= 80) return 'bg-success/80';
    if (value >= 60) return 'bg-warning/80';
    if (value >= 40) return 'bg-error/60';
    return 'bg-muted';
  };

  const getTextColor = (value) => {
    return value >= 40 ? 'text-white' : 'text-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 space-y-3 md:space-y-0">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Field-Level Detection Patterns
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Duplicate detection accuracy across data fields
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-muted rounded-md transition-smooth active-press">
            <Icon name="Filter" size={18} color="var(--color-foreground)" />
          </button>
          <button className="p-2 hover:bg-muted rounded-md transition-smooth active-press">
            <Icon name="Download" size={18} color="var(--color-foreground)" />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-150">
          <div className="grid grid-cols-6 gap-2 mb-2">
            <div className="text-xs font-caption font-medium text-muted-foreground"></div>
            {['Name', 'Email', 'Phone', 'Address', 'SSN']?.map((field) => (
              <div key={field} className="text-xs font-caption font-medium text-center text-muted-foreground">
                {field}
              </div>
            ))}
          </div>

          {data?.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-6 gap-2 mb-2">
              <div className="text-xs font-caption font-medium text-muted-foreground flex items-center">
                {row?.source}
              </div>
              {row?.fields?.map((value, colIdx) => (
                <div
                  key={colIdx}
                  className={`
                    ${getHeatColor(value)} ${getTextColor(value)}
                    rounded-md p-3 text-center text-sm font-caption font-semibold
                    cursor-pointer transition-transform hover:scale-105 active-press
                  `}
                  onClick={() => setSelectedCell({ row: rowIdx, col: colIdx, value })}
                >
                  {value}%
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-xs font-caption">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-success/80 rounded" />
            <span className="text-muted-foreground">High (80%+)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-warning/80 rounded" />
            <span className="text-muted-foreground">Medium (60-79%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-error/60 rounded" />
            <span className="text-muted-foreground">Low (40-59%)</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-muted rounded" />
            <span className="text-muted-foreground">Very Low (&lt;40%)</span>
          </div>
        </div>

        {selectedCell && (
          <div className="text-xs text-muted-foreground">
            Selected: {data?.[selectedCell?.row]?.source} - {selectedCell?.value}%
          </div>
        )}
      </div>
    </div>
  );
};

export default DetectionHeatmap;