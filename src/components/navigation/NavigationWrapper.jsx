import React, { useState } from 'react';
import Header from './Header';
import GlobalAlertIndicator from './GlobalAlertIndicator';
import TimeRangeSelector from './TimeRangeSelector';
import SystemStatusIndicator from './SystemStatusIndicator';

const NavigationWrapper = ({ children }) => {
  const [timeRange, setTimeRange] = useState('24h');

  return (
    <div className="min-h-screen bg-background">
      <Header 
        timeRange={timeRange}
        onTimeRangeChange={setTimeRange}
      />

      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default NavigationWrapper;