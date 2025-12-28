import React from 'react';
import Icon from '../../../components/AppIcon';

const ComplianceStatus = ({ status }) => {
  const getStatusColor = (level) => {
    const colors = {
      compliant: { bg: 'bg-success/10', text: 'text-success', icon: 'var(--color-success)' },
      warning: { bg: 'bg-warning/10', text: 'text-warning', icon: 'var(--color-warning)' },
      critical: { bg: 'bg-error/10', text: 'text-error', icon: 'var(--color-error)' }
    };
    return colors?.[level] || colors?.compliant;
  };

  const statusColor = getStatusColor(status?.level);

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
      <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-4">
        Compliance Status
      </h3>
      <div className={`${statusColor?.bg} rounded-lg p-4 mb-4`}>
        <div className="flex items-center space-x-3 mb-2">
          <Icon 
            name={status?.level === 'compliant' ? 'ShieldCheck' : 'Shield'} 
            size={24} 
            color={statusColor?.icon} 
          />
          <span className={`text-lg font-heading font-semibold ${statusColor?.text}`}>
            {status?.label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{status?.description}</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-caption text-foreground">Audit Coverage</span>
          <span className="text-sm font-heading font-semibold text-foreground data-text">
            {status?.auditCoverage}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-smooth"
            style={{ width: `${status?.auditCoverage}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-sm font-caption text-foreground">Last Audit</span>
          <span className="text-sm text-muted-foreground">{status?.lastAudit}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-caption text-foreground">Next Review</span>
          <span className="text-sm text-muted-foreground">{status?.nextReview}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatus;