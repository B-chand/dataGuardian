import React from 'react';
import Icon from '../../../components/AppIcon';

const MatchingSignalPanel = ({ signals }) => {
  const getSignalColor = (weight) => {
    if (weight >= 80) return 'var(--color-success)';
    if (weight >= 60) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm h-full">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Matching Signal Performance
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ranked by contribution weight
          </p>
        </div>
        <Icon name="BarChart3" size={20} color="var(--color-primary)" />
      </div>
      <div className="space-y-4">
        {signals?.map((signal, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-caption font-medium text-foreground">
                  {signal?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({signal?.matches} matches)
                </span>
              </div>
              <span className="text-sm font-caption font-semibold data-text" style={{ color: getSignalColor(signal?.weight) }}>
                {signal?.weight}%
              </span>
            </div>
            
            <div className="relative h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{
                  width: `${signal?.weight}%`,
                  backgroundColor: getSignalColor(signal?.weight)
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Accuracy: {signal?.accuracy}%</span>
              <span>False Positives: {signal?.falsePositives}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <button className="w-full flex items-center justify-center space-x-2 py-2 text-sm font-caption text-primary hover:bg-primary/10 rounded-md transition-smooth active-press">
          <span>View Detailed Analysis</span>
          <Icon name="ArrowRight" size={16} color="var(--color-primary)" />
        </button>
      </div>
    </div>
  );
};

export default MatchingSignalPanel;