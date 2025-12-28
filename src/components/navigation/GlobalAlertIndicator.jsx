import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalAlertIndicator = () => {
  const navigate = useNavigate();
  const [alertCount, setAlertCount] = useState(0);
  const [alertSeverity, setAlertSeverity] = useState('normal');
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const mockAlertStream = setInterval(() => {
      const randomCount = Math.floor(Math.random() * 10);
      setAlertCount(randomCount);
      
      if (randomCount === 0) {
        setAlertSeverity('normal');
      } else if (randomCount <= 3) {
        setAlertSeverity('warning');
      } else {
        setAlertSeverity('critical');
      }
    }, 5000);

    return () => clearInterval(mockAlertStream);
  }, []);

  const handleAlertClick = () => {
    if (alertCount > 0) {
      navigate('/data-intake-monitor');
    }
  };

  const getSeverityColor = () => {
    switch (alertSeverity) {
      case 'critical':
        return 'var(--color-error)';
      case 'warning':
        return 'var(--color-warning)';
      default:
        return 'var(--color-success)';
    }
  };

  const getSeverityBg = () => {
    switch (alertSeverity) {
      case 'critical':
        return 'bg-error';
      case 'warning':
        return 'bg-warning';
      default:
        return 'bg-success';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleAlertClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="relative p-2 rounded-md hover:bg-muted transition-smooth active-press"
        aria-label="View alerts"
      >
        <Icon name="Bell" size={20} color={getSeverityColor()} />
        {alertCount > 0 && (
          <span className={`
            absolute -top-1 -right-1 min-w-4.5 h-4.5 px-1
            ${getSeverityBg()} text-white text-xs font-caption font-medium
            rounded-full flex items-center justify-center
            animate-pulse
          `}>
            {alertCount > 9 ? '9+' : alertCount}
          </span>
        )}
      </button>

      {showTooltip && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-popover text-popover-foreground rounded-md shadow-lg border border-border p-3 z-1100">
          <div className="text-sm font-caption">
            <div className="font-medium mb-1">System Alerts</div>
            <div className="text-muted-foreground">
              {alertCount === 0 ? (
                'All systems operational'
              ) : (
                <>
                  {alertCount} active alert{alertCount !== 1 ? 's' : ''}
                  <br />
                  <span className="text-xs">Click to view details</span>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlobalAlertIndicator;