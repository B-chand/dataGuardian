import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AIExplanationPanel = () => {
  const [selectedPattern, setSelectedPattern] = useState(null);

  const reasoningPatterns = [
    {
      id: 'high-similarity',
      label: 'High Similarity Match',
      frequency: 487,
      percentage: 54.6,
      avgConfidence: 94.2,
      icon: 'Target',
      color: 'var(--color-success)',
      description: 'Records matched with &gt;90% similarity across multiple fields including name, email, and phone number.'
    },
    {
      id: 'partial-match',
      label: 'Partial Field Match',
      frequency: 203,
      percentage: 22.8,
      avgConfidence: 78.5,
      icon: 'GitMerge',
      color: 'var(--color-warning)',
      description: 'Records matched on 2-3 key fields with moderate confidence requiring additional validation.'
    },
    {
      id: 'fuzzy-match',
      label: 'Fuzzy Name Match',
      frequency: 142,
      percentage: 15.9,
      avgConfidence: 71.3,
      icon: 'Search',
      color: 'var(--color-accent)',
      description: 'Names matched using phonetic algorithms and edit distance calculations with supporting evidence.'
    },
    {
      id: 'contextual',
      label: 'Contextual Evidence',
      frequency: 60,
      percentage: 6.7,
      avgConfidence: 82.1,
      icon: 'Brain',
      color: 'var(--color-primary)',
      description: 'Matches based on employment history, location patterns, and temporal data correlations.'
    }
  ];

  const confidenceDistribution = [
    { range: '90-100%', count: 487, color: 'var(--color-success)' },
    { range: '80-89%', count: 203, color: 'var(--color-warning)' },
    { range: '70-79%', count: 142, color: 'var(--color-accent)' },
    { range: '60-69%', count: 60, color: 'var(--color-error)' }
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Lightbulb" size={20} color="var(--color-accent)" />
          </div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            AI Reasoning Patterns
          </h3>
        </div>

        <div className="space-y-3">
          {reasoningPatterns?.map((pattern) => (
            <div key={pattern?.id}>
              <button
                onClick={() => setSelectedPattern(selectedPattern === pattern?.id ? null : pattern?.id)}
                className="w-full bg-muted/50 hover:bg-muted rounded-lg p-3 md:p-4 transition-smooth active-press"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <Icon name={pattern?.icon} size={18} color={pattern?.color} />
                    <span className="text-sm md:text-base font-caption font-medium text-foreground">
                      {pattern?.label}
                    </span>
                  </div>
                  <Icon 
                    name={selectedPattern === pattern?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={16} 
                    color="var(--color-muted-foreground)" 
                  />
                </div>
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <span className="text-muted-foreground">
                    {pattern?.frequency} decisions ({pattern?.percentage}%)
                  </span>
                  <span className="text-accent font-medium">
                    Avg: {pattern?.avgConfidence}%
                  </span>
                </div>
              </button>

              {selectedPattern === pattern?.id && (
                <div className="mt-2 bg-background border border-border rounded-lg p-3 md:p-4">
                  <p className="text-xs md:text-sm text-muted-foreground" dangerouslySetInnerHTML={{ __html: pattern?.description }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-lg p-4 md:p-6">
        <div className="flex items-center space-x-3 mb-4 md:mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Confidence Distribution
          </h3>
        </div>

        <div className="space-y-4">
          {confidenceDistribution?.map((dist, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm md:text-base font-caption text-foreground">
                  {dist?.range}
                </span>
                <span className="text-sm md:text-base font-caption font-medium text-foreground">
                  {dist?.count} decisions
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 md:h-3 overflow-hidden">
                <div
                  className="h-full rounded-full transition-smooth"
                  style={{
                    width: `${(dist?.count / 892) * 100}%`,
                    backgroundColor: dist?.color
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-muted/50 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} color="var(--color-muted-foreground)" className="shrink-0 mt-0.5" />
            <p className="text-xs text-muted-foreground">
              Higher confidence scores indicate stronger evidence for merge decisions. Scores below 70% typically require manual review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIExplanationPanel;