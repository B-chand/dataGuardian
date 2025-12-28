import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TimelineEvent = ({ event, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getEventIcon = (type) => {
    const icons = {
      validation: 'CheckCircle2',
      merge: 'GitMerge',
      rollback: 'RotateCcw',
      alert: 'AlertTriangle',
      update: 'Edit',
      delete: 'Trash2'
    };
    return icons?.[type] || 'Circle';
  };

  const getEventColor = (type) => {
    const colors = {
      validation: 'var(--color-success)',
      merge: 'var(--color-primary)',
      rollback: 'var(--color-warning)',
      alert: 'var(--color-error)',
      update: 'var(--color-accent)',
      delete: 'var(--color-destructive)'
    };
    return colors?.[type] || 'var(--color-muted-foreground)';
  };

  const getEventBgColor = (type) => {
    const colors = {
      validation: 'bg-success/10',
      merge: 'bg-primary/10',
      rollback: 'bg-warning/10',
      alert: 'bg-error/10',
      update: 'bg-accent/10',
      delete: 'bg-destructive/10'
    };
    return colors?.[type] || 'bg-muted';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="relative flex gap-4 md:gap-6 pb-6 md:pb-8">
      <div className="flex flex-col items-center">
        <div className={`
          w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center
          ${getEventBgColor(event?.type)} shrink-0
        `}>
          <Icon name={getEventIcon(event?.type)} size={20} color={getEventColor(event?.type)} />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-border mt-2" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md transition-smooth">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
                {event?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {event?.description}
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <span className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
                {formatTimestamp(event?.timestamp)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                iconPosition="right"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? 'Less' : 'More'}
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="flex items-center space-x-2">
              {event?.userAvatar ? (
                <Image
                  src={event?.userAvatar}
                  alt={event?.userAvatarAlt}
                  className="w-6 h-6 rounded-full object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="User" size={14} color="var(--color-primary)" />
                </div>
              )}
              <span className="text-sm font-caption text-foreground">{event?.user}</span>
            </div>
            <span className="text-xs text-muted-foreground">•</span>
            <span className="text-xs font-caption text-muted-foreground">
              Event ID: {event?.eventId}
            </span>
            {event?.confidenceScore && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs font-caption text-foreground">
                  Confidence: {event?.confidenceScore}%
                </span>
              </>
            )}
          </div>

          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-border space-y-3">
              {event?.details && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Object.entries(event?.details)?.map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-xs text-muted-foreground mb-1 capitalize">
                        {key?.replace(/_/g, ' ')}
                      </span>
                      <span className="text-sm font-caption text-foreground">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              
              {event?.affectedRecords && (
                <div className="bg-muted rounded-md p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Database" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-caption font-medium text-foreground">
                      Affected Records
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event?.affectedRecords} records modified
                  </div>
                </div>
              )}

              {event?.relatedEvents && event?.relatedEvents?.length > 0 && (
                <div className="bg-muted rounded-md p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Link" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-caption font-medium text-foreground">
                      Related Events
                    </span>
                  </div>
                  <div className="space-y-1">
                    {event?.relatedEvents?.map((relatedId) => (
                      <div key={relatedId} className="text-xs text-muted-foreground">
                        Event ID: {relatedId}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineEvent;