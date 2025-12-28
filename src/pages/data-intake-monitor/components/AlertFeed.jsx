import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const initialAlerts = [
  {
    id: 1,
    type: 'error',
    title: 'Validation Failure',
    message: 'Missing required field: Social Security Number in record #45892',
    source: 'ATS',
    timestamp: new Date(Date.now() - 120000),
    confidence: 0,
    actionRequired: true
  },
  {
    id: 2,
    type: 'warning',
    title: 'Low Confidence Score',
    message: 'Email validation confidence below threshold (62%) for record #45891',
    source: 'Payroll',
    timestamp: new Date(Date.now() - 300000),
    confidence: 62,
    actionRequired: false
  },
  {
    id: 3,
    type: 'error',
    title: 'Data Format Error',
    message: 'Invalid phone number format detected in record #45890',
    source: 'Manual',
    timestamp: new Date(Date.now() - 480000),
    confidence: 0,
    actionRequired: true
  },
  {
    id: 4,
    type: 'warning',
    title: 'Duplicate Detected',
    message: 'Potential duplicate entry found with 78% similarity match',
    source: 'ATS',
    timestamp: new Date(Date.now() - 600000),
    confidence: 78,
    actionRequired: false
  },
  {
    id: 5,
    type: 'info',
    title: 'Processing Delay',
    message: 'Batch processing queue exceeding normal threshold',
    source: 'System',
    timestamp: new Date(Date.now() - 900000),
    confidence: null,
    actionRequired: false
  }
];

const AlertFeed = () => {
  const [alerts, setAlerts] = useState(() => initialAlerts);

  useEffect(() => {
    const interval = setInterval(() => {
      const newAlert = {
        id: Date.now(),
        type: ['error', 'warning', 'info'][Math.floor(Math.random() * 3)],
        title: ['Validation Failure', 'Low Confidence Score', 'Data Format Error', 'Processing Alert'][Math.floor(Math.random() * 4)],
        message: `New alert generated at ${new Date().toLocaleTimeString()}`,
        source: ['ATS', 'Payroll', 'Manual', 'System'][Math.floor(Math.random() * 4)],
        timestamp: new Date(),
        confidence: Math.random() > 0.5 ? Math.floor(Math.random() * 40) + 60 : 0,
        actionRequired: Math.random() > 0.6
      };

      setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlertBg = (type) => {
    switch (type) {
      case 'error':
        return 'bg-error/10';
      case 'warning':
        return 'bg-warning/10';
      case 'info':
        return 'bg-primary/10';
      default:
        return 'bg-muted';
    }
  };

  const getSourceBadgeColor = (source) => {
    switch (source) {
      case 'ATS':
        return 'bg-primary/10 text-primary';
      case 'Payroll':
        return 'bg-accent/10 text-accent';
      case 'Manual':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);

    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return timestamp?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm h-full flex flex-col">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Live Alert Feed
          </h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs text-muted-foreground font-caption">Live</span>
          </div>
        </div>
        <p className="text-xs md:text-sm text-muted-foreground font-caption">
          Real-time validation failures and low confidence alerts
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`${getAlertBg(alert?.type)} border border-border rounded-lg p-3 md:p-4 transition-smooth hover-lift`}
          >
            <div className="flex items-start space-x-3">
              <div className={`shrink-0 ${getAlertColor(alert?.type)}`}>
                <Icon name={getAlertIcon(alert?.type)} size={20} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`text-sm md:text-base font-caption font-semibold ${getAlertColor(alert?.type)}`}>
                    {alert?.title}
                  </h4>
                  {alert?.actionRequired && (
                    <span className="shrink-0 ml-2 px-2 py-1 bg-error/20 text-error text-xs font-caption font-medium rounded">
                      Action Required
                    </span>
                  )}
                </div>
                
                <p className="text-xs md:text-sm text-foreground font-caption mb-3 line-clamp-2">
                  {alert?.message}
                </p>
                
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`px-2 py-1 ${getSourceBadgeColor(alert?.source)} text-xs font-caption font-medium rounded`}>
                    {alert?.source}
                  </span>
                  {alert?.confidence !== null && alert?.confidence > 0 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-caption font-medium rounded">
                      {alert?.confidence}% confidence
                    </span>
                  )}
                  <span className="text-xs text-muted-foreground font-caption">
                    {formatTimestamp(alert?.timestamp)}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="xs" iconName="Eye" iconPosition="left">
                    View Details
                  </Button>
                  {alert?.actionRequired && (
                    <Button variant="default" size="xs" iconName="CheckCircle2" iconPosition="left">
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-border">
        <Button variant="outline" fullWidth iconName="Archive" iconPosition="left">
          View All Alerts
        </Button>
      </div>
    </div>
  );
};

export default AlertFeed;