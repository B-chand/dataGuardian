import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ValidationDataGrid = ({ confidenceFilter }) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [validationRecords] = useState(() => [
    {
      id: 45892,
      timestamp: new Date(Date.now() - 120000),
      source: 'ATS',
      recordType: 'Candidate Submission',
      status: 'failed',
      confidence: 62,
      validationResults: {
        identity: { valid: false, confidence: 45, reason: 'SSN missing' },
        contact: { valid: true, confidence: 92 },
        employment: { valid: true, confidence: 88 },
        education: { valid: false, confidence: 60, reason: 'Degree verification pending' },
        skills: { valid: true, confidence: 85 }
      },
      aiReasoning: "Multiple critical fields missing. SSN not provided and education verification pending. Recommended for manual review with priority.",
    },
    {
      id: 45891,
      timestamp: new Date(Date.now() - 300000),
      source: 'Payroll',
      recordType: 'Employee Update',
      status: 'warning',
      confidence: 74,
      validationResults: {
        identity: { valid: true, confidence: 95 },
        contact: { valid: true, confidence: 90 },
        employment: { valid: false, confidence: 65, reason: 'Title mismatch with manager confirmation' },
        education: { valid: true, confidence: 88 },
        skills: { valid: true, confidence: 80 }
      },
      aiReasoning: "Employment title differs from previous record. Confidence moderate; recommend manager confirmation before approval.",
    },
    {
      id: 45890,
      timestamp: new Date(Date.now() - 480000),
      source: 'Manual',
      recordType: 'Profile Enrichment',
      status: 'failed',
      confidence: 58,
      validationResults: {
        identity: { valid: false, confidence: 40, reason: 'Name mismatch across documents' },
        contact: { valid: false, confidence: 55, reason: 'Invalid phone format' },
        employment: { valid: true, confidence: 82 },
        education: { valid: true, confidence: 80 },
        skills: { valid: true, confidence: 78 }
      },
      aiReasoning: "Identity mismatch detected. Phone number invalid. Requires manual verification before merging records.",
    },
    {
      id: 45889,
      timestamp: new Date(Date.now() - 600000),
      source: 'ATS',
      recordType: 'Resume Upload',
      status: 'warning',
      confidence: 72,
      validationResults: {
        identity: { valid: true, confidence: 90 },
        contact: { valid: true, confidence: 88 },
        employment: { valid: true, confidence: 75 },
        education: { valid: true, confidence: 82 },
        skills: { valid: true, confidence: 86 }
      },
      aiReasoning: "Resume parsed with minor formatting issues. Confidence acceptable but should be reviewed for final approval.",
    },
    {
      id: 45888,
      timestamp: new Date(Date.now() - 900000),
      source: 'Payroll',
      recordType: 'Benefits Enrollment',
      status: 'success',
      confidence: 98,
      validationResults: {
        employeeId: { valid: true, confidence: 100 },
        planSelection: { valid: true, confidence: 100 },
        dependents: { valid: true, confidence: 95 },
        effectiveDate: { valid: true, confidence: 98 },
        premiumAmount: { valid: true, confidence: 100 }
      },
      aiReasoning: "Benefits enrollment data validated with excellent confidence. All selections valid and properly formatted. Dependent information complete."
    },
    {
      id: 45887,
      timestamp: new Date(Date.now() - 1200000),
      source: 'Manual',
      recordType: 'Data Correction',
      status: 'success',
      confidence: 92,
      validationResults: {
        identity: { valid: true, confidence: 96 },
        contact: { valid: true, confidence: 94 },
        employment: { valid: true, confidence: 90 },
        education: { valid: true, confidence: 90 },
        skills: { valid: true, confidence: 85 }
      },
      aiReasoning: "Manual corrections applied successfully. All fields validated with high confidence. No further action needed."
    },
    {
      id: 45886,
      timestamp: new Date(Date.now() - 1500000),
      source: 'System',
      recordType: 'Automated Validation',
      status: 'success',
      confidence: 96,
      validationResults: {
        identity: { valid: true, confidence: 98 },
        contact: { valid: true, confidence: 97 },
        employment: { valid: true, confidence: 95 },
        education: { valid: true, confidence: 96 },
        skills: { valid: true, confidence: 92 }
      },
      aiReasoning: "System validation completed with high confidence across all fields."
    },
    {
      id: 45885,
      timestamp: new Date(Date.now() - 900000),
      source: 'Payroll',
      recordType: 'Benefits Enrollment',
      status: 'success',
      confidence: 98,
      validationResults: {
        employeeId: { valid: true, confidence: 100 },
        planSelection: { valid: true, confidence: 100 },
        dependents: { valid: true, confidence: 95 },
        effectiveDate: { valid: true, confidence: 98 },
        premiumAmount: { valid: true, confidence: 100 }
      },
      aiReasoning: "Benefits enrollment data validated with excellent confidence. All selections valid and properly formatted. Dependent information complete."
    }
  ]);
  const recordsPerPage = 10;

  const getStatusBadge = (status) => {
    switch (status) {
      case 'success':
        return { bg: 'bg-success/10', text: 'text-success', label: 'Passed', icon: 'CheckCircle2' };
      case 'warning':
        return { bg: 'bg-warning/10', text: 'text-warning', label: 'Warning', icon: 'AlertTriangle' };
      case 'failed':
        return { bg: 'bg-error/10', text: 'text-error', label: 'Failed', icon: 'XCircle' };
      default:
        return { bg: 'bg-muted', text: 'text-muted-foreground', label: 'Unknown', icon: 'Circle' };
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-error';
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
    return timestamp?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredRecords = validationRecords?.filter(record => {
    if (!confidenceFilter) return true;
    if (confidenceFilter === 'high') return record?.confidence >= 90;
    if (confidenceFilter === 'medium') return record?.confidence >= 70 && record?.confidence < 90;
    if (confidenceFilter === 'low') return record?.confidence < 70;
    return true;
  });

  const totalPages = Math.ceil(filteredRecords?.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const paginatedRecords = filteredRecords?.slice(startIndex, startIndex + recordsPerPage);

  return (
    <div className="bg-card border border-border rounded-lg shadow-sm">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
              Recent Validation Results
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground font-caption mt-1">
              {filteredRecords?.length} records • Click row for AI decision details
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Filter" iconPosition="left">
              Filter
            </Button>
            <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
              Export
            </Button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Record ID
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Timestamp
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Source
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Confidence
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-caption font-semibold text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paginatedRecords?.map((record) => (
              <React.Fragment key={record?.id}>
                <tr
                  className="hover:bg-muted/30 transition-smooth cursor-pointer"
                  onClick={() => setExpandedRow(expandedRow === record?.id ? null : record?.id)}
                >
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-caption font-medium text-foreground">
                      #{record?.id}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-caption text-muted-foreground">
                      {formatTimestamp(record?.timestamp)}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 ${getSourceBadgeColor(record?.source)} text-xs font-caption font-medium rounded`}>
                      {record?.source}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-sm font-caption text-foreground line-clamp-1">
                      {record?.recordType}
                    </span>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className={`${getStatusBadge(record?.status)?.bg} ${getStatusBadge(record?.status)?.text} p-1 rounded`}>
                        <Icon name={getStatusBadge(record?.status)?.icon} size={14} />
                      </div>
                      <span className={`text-sm font-caption font-medium ${getStatusBadge(record?.status)?.text}`}>
                        {getStatusBadge(record?.status)?.label}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-muted rounded-full h-2 max-w-20">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            record?.confidence >= 90 ? 'bg-success' :
                            record?.confidence >= 70 ? 'bg-warning' : 'bg-error'
                          }`}
                          style={{ width: `${record?.confidence}%` }}
                        />
                      </div>
                      <span className={`text-sm font-caption font-medium ${getConfidenceColor(record?.confidence)}`}>
                        {record?.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <Button variant="ghost" size="sm" iconName={expandedRow === record?.id ? 'ChevronUp' : 'ChevronDown'}>
                      {expandedRow === record?.id ? 'Hide' : 'Details'}
                    </Button>
                  </td>
                </tr>
                
                {expandedRow === record?.id && (
                  <tr>
                    <td colSpan="7" className="px-4 md:px-6 py-4 bg-muted/20">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-caption font-semibold text-foreground mb-3">
                            Field Validation Results
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {Object.entries(record?.validationResults)?.map(([field, result]) => (
                              <div key={field} className="bg-card border border-border rounded-md p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-caption font-medium text-foreground capitalize">
                                    {field?.replace(/([A-Z])/g, ' $1')?.trim()}
                                  </span>
                                  <Icon
                                    name={result?.valid ? 'CheckCircle2' : 'XCircle'}
                                    size={16}
                                    color={result?.valid ? 'var(--color-success)' : 'var(--color-error)'}
                                  />
                                </div>
                                <div className="flex items-center space-x-2 mb-1">
                                  <div className="flex-1 bg-muted rounded-full h-1.5">
                                    <div
                                      className={`h-1.5 rounded-full ${
                                        result?.confidence >= 90 ? 'bg-success' :
                                        result?.confidence >= 70 ? 'bg-warning' : 'bg-error'
                                      }`}
                                      style={{ width: `${result?.confidence}%` }}
                                    />
                                  </div>
                                  <span className={`text-xs font-caption font-medium ${getConfidenceColor(result?.confidence)}`}>
                                    {result?.confidence}%
                                  </span>
                                </div>
                                {result?.reason && (
                                  <p className="text-xs text-error font-caption mt-1">
                                    {result?.reason}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-primary/5 border border-primary/20 rounded-md p-4">
                          <div className="flex items-start space-x-3">
                            <div className="shrink-0 text-primary">
                              <Icon name="Brain" size={20} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-caption font-semibold text-foreground mb-2">
                                AI Decision Reasoning
                              </h4>
                              <p className="text-sm font-caption text-muted-foreground leading-relaxed">
                                {record?.aiReasoning}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                            View Full Record
                          </Button>
                          <Button variant="outline" size="sm" iconName="Edit" iconPosition="left">
                            Manual Override
                          </Button>
                          <Button variant="outline" size="sm" iconName="RotateCcw" iconPosition="left">
                            Revalidate
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 md:p-6 border-t border-border">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
          <div className="text-sm text-muted-foreground font-caption">
            Showing {startIndex + 1} to {Math.min(startIndex + recordsPerPage, filteredRecords?.length)} of {filteredRecords?.length} records
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </Button>
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-md text-sm font-caption font-medium transition-smooth ${
                      currentPage === pageNum
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              iconPosition="right"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValidationDataGrid;