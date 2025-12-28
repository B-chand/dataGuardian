import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RollbackSimulator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showImpactAnalysis, setShowImpactAnalysis] = useState(false);

  const recentTransactions = [
    {
      id: 'TXN-2847',
      timestamp: '2025-12-27 11:35:42',
      type: 'auto-merge',
      recordsAffected: 2,
      confidence: 94.2,
      impact: {
        dataIntegrity: 'low',
        downstreamSystems: 3,
        affectedReports: 5,
        estimatedRollbackTime: '2 minutes'
      }
    },
    {
      id: 'TXN-2846',
      timestamp: '2025-12-27 11:34:18',
      type: 'manual-merge',
      recordsAffected: 2,
      confidence: 87.5,
      impact: {
        dataIntegrity: 'medium',
        downstreamSystems: 5,
        affectedReports: 8,
        estimatedRollbackTime: '5 minutes'
      }
    },
    {
      id: 'TXN-2844',
      timestamp: '2025-12-27 11:31:20',
      type: 'auto-merge',
      recordsAffected: 3,
      confidence: 91.8,
      impact: {
        dataIntegrity: 'low',
        downstreamSystems: 4,
        affectedReports: 6,
        estimatedRollbackTime: '3 minutes'
      }
    }
  ];

  const getImpactColor = (level) => {
    switch (level) {
      case 'low':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'high':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleSimulate = (transaction) => {
    setSelectedTransaction(transaction);
    setShowImpactAnalysis(true);
  };

  const handleConfirmRollback = () => {
    setShowImpactAnalysis(false);
    setSelectedTransaction(null);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-error/10 text-error border border-error/20 rounded-md hover:bg-error/20 transition-smooth active-press"
      >
        <Icon name="RotateCcw" size={18} color="var(--color-error)" />
        <span className="text-sm font-caption font-medium">Rollback Simulator</span>
      </button>
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-1100"
            onClick={() => {
              setIsOpen(false);
              setShowImpactAnalysis(false);
              setSelectedTransaction(null);
            }}
          />
          <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-card border border-border rounded-lg shadow-xl z-1101 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
                  <Icon name="RotateCcw" size={20} color="var(--color-error)" />
                </div>
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
                  Transaction Rollback Simulator
                </h3>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowImpactAnalysis(false);
                  setSelectedTransaction(null);
                }}
                className="p-2 hover:bg-muted rounded-md transition-smooth active-press"
              >
                <Icon name="X" size={20} color="var(--color-foreground)" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {!showImpactAnalysis ? (
                <>
                  <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={20} color="var(--color-warning)" className="shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-caption font-semibold text-warning mb-1">
                          Simulation Mode
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          This tool simulates rollback impact without making actual changes. Review the analysis before proceeding with actual rollback operations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-base font-heading font-semibold text-foreground mb-4">
                    Recent Transactions
                  </h4>

                  <div className="space-y-3">
                    {recentTransactions?.map((transaction) => (
                      <div
                        key={transaction?.id}
                        className="bg-muted/50 border border-border rounded-lg p-4 hover:bg-muted transition-smooth"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm md:text-base font-caption font-semibold text-foreground">
                                {transaction?.id}
                              </span>
                              <span className={`text-xs font-caption px-2 py-0.5 rounded ${
                                transaction?.type === 'auto-merge' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'
                              }`}>
                                {transaction?.type}
                              </span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {transaction?.timestamp}
                            </p>
                          </div>
                          <button
                            onClick={() => handleSimulate(transaction)}
                            className="flex items-center space-x-2 px-3 py-2 bg-error/10 text-error border border-error/20 rounded-md hover:bg-error/20 transition-smooth active-press"
                          >
                            <Icon name="Play" size={16} color="var(--color-error)" />
                            <span className="text-sm font-caption font-medium">Simulate</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-muted-foreground">Records Affected:</span>
                            <span className="ml-2 font-medium text-foreground">{transaction?.recordsAffected}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence:</span>
                            <span className="ml-2 font-medium text-accent">{transaction?.confidence}%</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="bg-error/10 border border-error/20 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Icon name="AlertTriangle" size={20} color="var(--color-error)" className="shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-caption font-semibold text-error mb-1">
                          Impact Analysis for {selectedTransaction?.id}
                        </h4>
                        <p className="text-xs text-muted-foreground">
                          Review the following impact assessment before proceeding with rollback.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Database" size={18} color="var(--color-primary)" />
                        <span className="text-sm font-caption font-medium text-foreground">
                          Data Integrity Risk
                        </span>
                      </div>
                      <p className={`text-lg font-heading font-bold ${getImpactColor(selectedTransaction?.impact?.dataIntegrity)}`}>
                        {selectedTransaction?.impact?.dataIntegrity?.toUpperCase()}
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Network" size={18} color="var(--color-accent)" />
                        <span className="text-sm font-caption font-medium text-foreground">
                          Downstream Systems
                        </span>
                      </div>
                      <p className="text-lg font-heading font-bold text-foreground">
                        {selectedTransaction?.impact?.downstreamSystems} systems
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="FileText" size={18} color="var(--color-warning)" />
                        <span className="text-sm font-caption font-medium text-foreground">
                          Affected Reports
                        </span>
                      </div>
                      <p className="text-lg font-heading font-bold text-foreground">
                        {selectedTransaction?.impact?.affectedReports} reports
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="Clock" size={18} color="var(--color-success)" />
                        <span className="text-sm font-caption font-medium text-foreground">
                          Estimated Time
                        </span>
                      </div>
                      <p className="text-lg font-heading font-bold text-foreground">
                        {selectedTransaction?.impact?.estimatedRollbackTime}
                      </p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="text-sm font-caption font-semibold text-foreground mb-3">
                      Rollback Steps
                    </h4>
                    <ol className="space-y-2 text-xs md:text-sm text-muted-foreground">
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-foreground">1.</span>
                        <span>Restore original record states from backup</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-foreground">2.</span>
                        <span>Update downstream system references</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-foreground">3.</span>
                        <span>Regenerate affected reports and analytics</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="font-bold text-foreground">4.</span>
                        <span>Verify data consistency across all systems</span>
                      </li>
                    </ol>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                    <button
                      onClick={() => setShowImpactAnalysis(false)}
                      className="flex-1 px-4 py-3 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth active-press"
                    >
                      <span className="text-sm font-caption font-medium">Back to Transactions</span>
                    </button>
                    <button
                      onClick={handleConfirmRollback}
                      className="flex-1 px-4 py-3 bg-error text-error-foreground rounded-md hover:bg-error/90 transition-smooth active-press"
                    >
                      <span className="text-sm font-caption font-medium">Confirm Rollback</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RollbackSimulator;