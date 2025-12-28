import React from 'react';
import Icon from '../../../components/AppIcon';

const DecisionFlowDiagram = () => {
  const flowStages = [
    {
      id: 'intake',
      label: 'Data Intake',
      volume: 1247,
      icon: 'Database',
      color: 'var(--color-primary)'
    },
    {
      id: 'validation',
      label: 'AI Validation',
      volume: 1247,
      successRate: '98.2%',
      icon: 'Shield',
      color: 'var(--color-accent)'
    },
    {
      id: 'confidence',
      label: 'Confidence Scoring',
      volume: 1224,
      avgScore: '87.3%',
      icon: 'Target',
      color: 'var(--color-success)'
    },
    {
      id: 'decision',
      label: 'Decision Point',
      autoMerge: 892,
      manualReview: 284,
      rejected: 71,
      icon: 'GitBranch',
      color: 'var(--color-warning)'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Decision Flow Analysis
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
          <span className="text-xs md:text-sm text-muted-foreground font-caption">
            Live Processing
          </span>
        </div>
      </div>
      <div className="space-y-6 md:space-y-8">
        {flowStages?.map((stage, index) => (
          <div key={stage?.id}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0 lg:w-1/3">
                <div 
                  className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${stage?.color}15` }}
                >
                  <Icon name={stage?.icon} size={24} color={stage?.color} />
                </div>
                <div>
                  <h4 className="text-sm md:text-base font-heading font-semibold text-foreground">
                    {stage?.label}
                  </h4>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Stage {index + 1}
                  </p>
                </div>
              </div>

              <div className="flex-1 lg:w-2/3">
                {stage?.id === 'decision' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-success font-caption">Auto-Merge</span>
                        <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                      </div>
                      <p className="text-xl md:text-2xl font-heading font-bold text-success">
                        {stage?.autoMerge}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((stage?.autoMerge / 1247) * 100)?.toFixed(1)}% of total
                      </p>
                    </div>
                    <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-warning font-caption">Manual Review</span>
                        <Icon name="AlertCircle" size={16} color="var(--color-warning)" />
                      </div>
                      <p className="text-xl md:text-2xl font-heading font-bold text-warning">
                        {stage?.manualReview}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((stage?.manualReview / 1247) * 100)?.toFixed(1)}% of total
                      </p>
                    </div>
                    <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-error font-caption">Rejected</span>
                        <Icon name="XCircle" size={16} color="var(--color-error)" />
                      </div>
                      <p className="text-xl md:text-2xl font-heading font-bold text-error">
                        {stage?.rejected}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {((stage?.rejected / 1247) * 100)?.toFixed(1)}% of total
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm md:text-base font-caption font-medium text-foreground">
                        Volume Processed
                      </span>
                      <span className="text-lg md:text-xl font-heading font-bold text-foreground">
                        {stage?.volume}
                      </span>
                    </div>
                    {stage?.successRate && (
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-muted-foreground">Success Rate</span>
                        <span className="text-success font-medium">{stage?.successRate}</span>
                      </div>
                    )}
                    {stage?.avgScore && (
                      <div className="flex items-center justify-between text-xs md:text-sm">
                        <span className="text-muted-foreground">Avg Confidence</span>
                        <span className="text-accent font-medium">{stage?.avgScore}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {index < flowStages?.length - 1 && (
              <div className="flex justify-center my-4">
                <Icon name="ArrowDown" size={24} color="var(--color-muted-foreground)" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionFlowDiagram;