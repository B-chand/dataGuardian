import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Matching Signal Analysis
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {data?.recordPair}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-smooth active-press"
          >
            <Icon name="X" size={20} color="var(--color-foreground)" />
          </button>
        </div>

        <div className="p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Similarity Score</div>
              <div className="text-2xl font-heading font-semibold text-foreground data-text">
                {data?.similarity}%
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="text-xs text-muted-foreground mb-1">Confidence Level</div>
              <div className="text-2xl font-heading font-semibold text-foreground data-text">
                {data?.confidence}%
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-caption font-semibold text-foreground mb-3">
                Field Comparison
              </h4>
              <div className="space-y-3">
                {data?.fieldMatches?.map((field, idx) => (
                  <div key={idx} className="bg-muted/30 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-caption font-medium text-foreground">
                        {field?.name}
                      </span>
                      <span className={`text-xs font-semibold ${
                        field?.match >= 90 ? 'text-success' : 
                        field?.match >= 70 ? 'text-warning' : 'text-error'
                      }`}>
                        {field?.match}% match
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <div className="text-muted-foreground mb-1">Record A</div>
                        <div className="text-foreground font-medium">{field?.valueA}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground mb-1">Record B</div>
                        <div className="text-foreground font-medium">{field?.valueB}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-caption font-semibold text-foreground mb-3">
                Detection Signals
              </h4>
              <div className="space-y-2">
                {data?.signals?.map((signal, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-foreground">{signal?.name}</span>
                    <span className="text-sm font-semibold text-primary data-text">
                      {signal?.weight}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-4 md:p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;