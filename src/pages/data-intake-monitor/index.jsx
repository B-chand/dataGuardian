import React from 'react';
import NavigationWrapper from '../../components/navigation/NavigationWrapper';

export default function DataIntakeMonitor() {
  return (
    <NavigationWrapper>
      <div className="min-h-screen bg-background">
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-2">
              Data Intake Monitor
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              Monitor data ingestion, validation metrics, and source system health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Records Processed</h3>
              <p className="text-3xl font-bold text-primary">1.2M</p>
              <p className="text-sm text-success mt-1">↑ 15% from last hour</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Validation Success</h3>
              <p className="text-3xl font-bold text-primary">97.8%</p>
              <p className="text-sm text-success mt-1">↑ 2.1% improvement</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Error Rate</h3>
              <p className="text-3xl font-bold text-error">2.2%</p>
              <p className="text-sm text-error mt-1">↓ 0.3% from baseline</p>
            </div>
            
            <div className="bg-card rounded-lg p-6 shadow-md border border-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-2">Active Sources</h3>
              <p className="text-3xl font-bold text-primary">24/26</p>
              <p className="text-sm text-warning mt-1">2 sources offline</p>
            </div>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-md border border-border">
            <h2 className="text-xl font-semibold text-card-foreground mb-4">Real-time Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">CRM Database Sync</span>
                <span className="text-sm font-medium text-success">Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">ERP System Feed</span>
                <span className="text-sm font-medium text-success">Active</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <span className="text-sm text-muted-foreground">Marketing Platform</span>
                <span className="text-sm font-medium text-warning">Degraded</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-muted-foreground">Analytics Pipeline</span>
                <span className="text-sm font-medium text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavigationWrapper>
  );
}
