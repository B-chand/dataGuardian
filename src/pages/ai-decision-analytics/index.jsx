import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationWrapper from '../../components/navigation/NavigationWrapper';
import KPIMetricCard from './components/KPIMetricCard';
import ConfidenceThresholdControl from './components/ConfidenceThresholdControl';
import DecisionOutcomeFilter from './components/DecisionOutcomeFilter';
import ModelVersionSelector from './components/ModelVersionSelector';
import DecisionFlowDiagram from './components/DecisionFlowDiagram';
import AIExplanationPanel from './components/AIExplanationPanel';
import DecisionTimeline from './components/DecisionTimeline';
import RollbackSimulator from './components/RollbackSimulator';

const AIDecisionAnalytics = () => {
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [selectedOutcome, setSelectedOutcome] = useState('all');
  const [selectedModel, setSelectedModel] = useState('v3.2.1');
  const [kpiData, setKpiData] = useState({
    autoMergeRate: 71.5,
    manualInterventionRate: 22.8,
    rollbackIncidents: 3,
    decisionAccuracy: 94.2
  });

  useEffect(() => {
    const updateInterval = setInterval(() => {
      setKpiData(prev => ({
        autoMergeRate: Math.max(65, Math.min(80, prev?.autoMergeRate + (Math.random() - 0.5) * 2)),
        manualInterventionRate: Math.max(15, Math.min(30, prev?.manualInterventionRate + (Math.random() - 0.5) * 2)),
        rollbackIncidents: Math.floor(Math.random() * 6),
        decisionAccuracy: Math.max(90, Math.min(98, prev?.decisionAccuracy + (Math.random() - 0.5) * 0.5))
      }));
    }, 8000);

    return () => clearInterval(updateInterval);
  }, []);

  return (
    <>
      <Helmet>
        <title>AI Decision Analytics - DataGuardian AI Dashboard</title>
        <meta name="description" content="Monitor automated merge decisions, AI model performance, and decision reasoning patterns with comprehensive analytics and rollback capabilities." />
      </Helmet>
      <NavigationWrapper>
        <div className="min-h-screen bg-background">
          <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
            <div className="mb-6 md:mb-8">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-2">
                AI Decision Analytics
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                Monitor automated merge decisions and optimize AI model performance
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <KPIMetricCard
                title="Auto-Merge Success Rate"
                value={kpiData?.autoMergeRate?.toFixed(1)}
                unit="%"
                trend="up"
                trendValue="+2.3%"
                icon="CheckCircle2"
                iconColor="var(--color-success)"
                description="Percentage of decisions automatically merged"
              />
              <KPIMetricCard
                title="Manual Intervention"
                value={kpiData?.manualInterventionRate?.toFixed(1)}
                unit="%"
                trend="down"
                trendValue="-1.5%"
                icon="AlertCircle"
                iconColor="var(--color-warning)"
                description="Decisions requiring human review"
              />
              <KPIMetricCard
                title="Rollback Incidents"
                value={kpiData?.rollbackIncidents}
                unit="today"
                trend="down"
                trendValue="-2"
                icon="RotateCcw"
                iconColor="var(--color-error)"
                description="Merge decisions reversed"
              />
              <KPIMetricCard
                title="Decision Accuracy"
                value={kpiData?.decisionAccuracy?.toFixed(1)}
                unit="%"
                trend="up"
                trendValue="+0.8%"
                icon="Target"
                iconColor="var(--color-accent)"
                description="Overall AI decision correctness"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <ConfidenceThresholdControl
                value={confidenceThreshold}
                onChange={setConfidenceThreshold}
              />
              <ModelVersionSelector
                selected={selectedModel}
                onChange={setSelectedModel}
              />
            </div>

            <div className="mb-6 md:mb-8">
              <DecisionOutcomeFilter
                selected={selectedOutcome}
                onChange={setSelectedOutcome}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="lg:col-span-8">
                <DecisionFlowDiagram />
              </div>
              <div className="lg:col-span-4">
                <AIExplanationPanel />
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <DecisionTimeline />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card border border-border rounded-lg p-4 md:p-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-heading font-semibold text-foreground mb-1">
                    Advanced Rollback Management
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Simulate transaction rollback impact before executing recovery operations
                  </p>
                </div>
              </div>
              <RollbackSimulator />
            </div>
          </div>
        </div>
      </NavigationWrapper>
    </>
  );
};

export default AIDecisionAnalytics;