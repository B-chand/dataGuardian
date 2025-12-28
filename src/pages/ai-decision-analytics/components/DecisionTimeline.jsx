import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DecisionTimeline = () => {
  const [expandedEntry, setExpandedEntry] = useState(null);

  const timelineEntries = [
    {
      id: 'dec-001',
      timestamp: '2025-12-27 11:35:42',
      type: 'auto-merge',
      recordId: 'EMP-2847',
      confidence: 94.2,
      reasoning: 'High similarity match across name (98%), email (100%), and phone (95%). Employment dates aligned within 2-day variance.',
      outcome: 'success',
      evidence: [
        { field: 'Full Name', similarity: 98, match: 'John Michael Smith vs John M. Smith' },
        { field: 'Email', similarity: 100, match: 'john.smith@company.com (exact)' },
        { field: 'Phone', similarity: 95, match: '+1-555-0123 vs (555) 0123' }
      ]
    },
    {
      id: 'dec-002',
      timestamp: '2025-12-27 11:34:18',
      type: 'manual-review',
      recordId: 'EMP-2846',
      confidence: 72.5,
      reasoning: 'Partial match on name (85%) and location (90%). Email mismatch requires human verification due to potential typo.',
      outcome: 'pending',
      evidence: [
        { field: 'Full Name', similarity: 85, match: 'Sarah Johnson vs Sara Jonson' },
        { field: 'Location', similarity: 90, match: 'New York, NY (both)' },
        { field: 'Email', similarity: 45, match: 'sarah.j@email.com vs sara.johnson@email.com' }
      ]
    },
    {
      id: 'dec-003',
      timestamp: '2025-12-27 11:32:55',
      type: 'rejected',
      recordId: 'EMP-2845',
      confidence: 58.3,
      reasoning: 'Insufficient evidence for merge. Only name similarity (75%) detected. Different email domains and phone area codes.',
      outcome: 'rejected',
      evidence: [
        { field: 'Full Name', similarity: 75, match: 'Michael Brown vs Mike Brown' },
        { field: 'Email', similarity: 30, match: 'mbrown@companyA.com vs mike.b@companyB.com' },
        { field: 'Phone', similarity: 40, match: '+1-212-xxx vs +1-415-xxx' }
      ]
    },
    {
      id: 'dec-004',
      timestamp: '2025-12-27 11:31:20',
      type: 'auto-merge',
      recordId: 'EMP-2844',
      confidence: 91.8,
      reasoning: 'Strong contextual evidence with employment history overlap and matching SSN last 4 digits. Name variation within acceptable threshold.',
      outcome: 'success',
      evidence: [
        { field: 'Full Name', similarity: 88, match: 'Jennifer Lee vs Jenny Lee' },
        { field: 'SSN (Last 4)', similarity: 100, match: '****-**-5678 (exact)' },
        { field: 'Employment History', similarity: 95, match: 'Same company 2020-2023' }
      ]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'auto-merge':
        return 'CheckCircle2';
      case 'manual-review':
        return 'AlertCircle';
      case 'rejected':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'auto-merge':
        return 'var(--color-success)';
      case 'manual-review':
        return 'var(--color-warning)';
      case 'rejected':
        return 'var(--color-error)';
      default:
        return 'var(--color-muted-foreground)';
    }
  };

  const getTypeBg = (type) => {
    switch (type) {
      case 'auto-merge':
        return 'bg-success/10 border-success/20';
      case 'manual-review':
        return 'bg-warning/10 border-warning/20';
      case 'rejected':
        return 'bg-error/10 border-error/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'auto-merge':
        return 'Auto-Merged';
      case 'manual-review':
        return 'Manual Review';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} color="var(--color-primary)" />
          </div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Decision History
          </h3>
        </div>
        <button className="flex items-center space-x-2 px-3 md:px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-smooth active-press">
          <Icon name="Filter" size={16} color="var(--color-foreground)" />
          <span className="text-sm font-caption hidden sm:inline">Filter</span>
        </button>
      </div>
      <div className="space-y-4">
        {timelineEntries?.map((entry, index) => (
          <div key={entry?.id} className="relative">
            {index < timelineEntries?.length - 1 && (
              <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
            )}
            
            <div className={`border rounded-lg p-4 transition-smooth ${getTypeBg(entry?.type)}`}>
              <div className="flex items-start space-x-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${getTypeColor(entry?.type)}15` }}
                >
                  <Icon name={getTypeIcon(entry?.type)} size={20} color={getTypeColor(entry?.type)} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm md:text-base font-caption font-semibold text-foreground">
                        {entry?.recordId}
                      </span>
                      <span 
                        className="text-xs font-caption px-2 py-0.5 rounded"
                        style={{ 
                          color: getTypeColor(entry?.type),
                          backgroundColor: `${getTypeColor(entry?.type)}15`
                        }}
                      >
                        {getTypeLabel(entry?.type)}
                      </span>
                    </div>
                    <span className="text-xs md:text-sm text-muted-foreground font-caption">
                      {entry?.timestamp}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs md:text-sm text-muted-foreground">Confidence:</span>
                      <span className="text-sm md:text-base font-caption font-bold text-accent">
                        {entry?.confidence}%
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs md:text-sm text-muted-foreground">Status:</span>
                      <span className={`text-sm md:text-base font-caption font-medium ${
                        entry?.outcome === 'success' ? 'text-success' : 
                        entry?.outcome === 'pending' ? 'text-warning' : 'text-error'
                      }`}>
                        {entry?.outcome}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs md:text-sm text-muted-foreground mb-3">
                    {entry?.reasoning}
                  </p>

                  <button
                    onClick={() => setExpandedEntry(expandedEntry === entry?.id ? null : entry?.id)}
                    className="flex items-center space-x-2 text-xs md:text-sm text-accent hover:text-accent/80 font-caption font-medium transition-smooth"
                  >
                    <span>View Evidence Details</span>
                    <Icon 
                      name={expandedEntry === entry?.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={16} 
                      color="var(--color-accent)" 
                    />
                  </button>

                  {expandedEntry === entry?.id && (
                    <div className="mt-4 bg-background/50 rounded-lg p-3 md:p-4 space-y-3">
                      <h4 className="text-sm font-caption font-semibold text-foreground mb-2">
                        Matching Evidence
                      </h4>
                      {entry?.evidence?.map((ev, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-border last:border-0">
                          <div className="flex-1">
                            <span className="text-xs md:text-sm font-caption font-medium text-foreground">
                              {ev?.field}
                            </span>
                            <p className="text-xs text-muted-foreground mt-1">
                              {ev?.match}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 md:w-20 bg-muted rounded-full h-2 overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${ev?.similarity}%`,
                                  backgroundColor: ev?.similarity >= 90 ? 'var(--color-success)' : 
                                                 ev?.similarity >= 70 ? 'var(--color-warning)' : 'var(--color-error)'
                                }}
                              />
                            </div>
                            <span className="text-xs font-caption font-bold text-foreground w-10 text-right">
                              {ev?.similarity}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <button className="flex items-center space-x-2 px-4 py-2 bg-muted hover:bg-muted/80 rounded-md transition-smooth active-press">
          <span className="text-sm font-caption font-medium text-foreground">Load More Decisions</span>
          <Icon name="ChevronDown" size={16} color="var(--color-foreground)" />
        </button>
      </div>
    </div>
  );
};

export default DecisionTimeline;