import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ConfidenceThresholdControl = ({ value, onChange }) => {
  const [localValue, setLocalValue] = useState(value);
  const [isEditing, setIsEditing] = useState(false);

  const handleSliderChange = (e) => {
    const newValue = parseInt(e?.target?.value);
    setLocalValue(newValue);
  };

  const handleApply = () => {
    onChange(localValue);
    setIsEditing(false);
  };

  const handleReset = () => {
    setLocalValue(value);
    setIsEditing(false);
  };

  const getThresholdColor = () => {
    if (localValue >= 90) return 'text-success';
    if (localValue >= 70) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Sliders" size={20} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-base md:text-lg font-heading font-semibold text-foreground">
              Confidence Threshold
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              Minimum score for auto-merge
            </p>
          </div>
        </div>
        <div className={`text-2xl md:text-3xl font-heading font-bold ${getThresholdColor()}`}>
          {localValue}%
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input
            type="range"
            min="50"
            max="100"
            step="5"
            value={localValue}
            onChange={handleSliderChange}
            onInput={() => setIsEditing(true)}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-accent"
            style={{
              background: `linear-gradient(to right, var(--color-accent) 0%, var(--color-accent) ${localValue}%, var(--color-muted) ${localValue}%, var(--color-muted) 100%)`
            }}
          />
          <div className="flex justify-between mt-2">
            <span className="text-xs text-muted-foreground">50%</span>
            <span className="text-xs text-muted-foreground">75%</span>
            <span className="text-xs text-muted-foreground">100%</span>
          </div>
        </div>

        {isEditing && (
          <div className="flex space-x-2">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 text-sm font-caption bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth active-press"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="flex-1 px-4 py-2 text-sm font-caption bg-accent text-accent-foreground rounded-md hover:bg-accent/90 transition-smooth active-press"
            >
              Apply Changes
            </button>
          </div>
        )}

        <div className="bg-muted/50 rounded-md p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Higher thresholds increase accuracy but require more manual reviews. Current setting: {localValue >= 90 ? 'Conservative' : localValue >= 70 ? 'Balanced' : 'Aggressive'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceThresholdControl;