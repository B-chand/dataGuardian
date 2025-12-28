import React, { useState } from 'react';
import NavigationWrapper from '../../components/navigation/NavigationWrapper';
import MetricsCard from './components/MetricsCard';
import SimilarityScatterPlot from './components/SimilarityScatterPlot';
import MatchingSignalPanel from './components/MatchingSignalPanel';
import DetectionHeatmap from './components/DetectionHeatmap';
import FilterPanel from './components/FilterPanel';
import DetailModal from './components/DetailModal';

const DuplicateDetectionHub = () => {
  const [filters, setFilters] = useState({
    dataSource: 'all',
    algorithm: 'hybrid',
    recordType: 'all',
    threshold: 75
  });

  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const metricsData = [
    {
      title: "Detection Accuracy",
      value: "94.7%",
      change: 2.3,
      trend: "up",
      icon: "Target",
      iconColor: "var(--color-success)"
    },
    {
      title: "False Positive Rate",
      value: "3.2%",
      change: -0.8,
      trend: "down",
      icon: "AlertTriangle",
      iconColor: "var(--color-warning)"
    },
    {
      title: "Processing Volume",
      value: "2.4M",
      change: 12.5,
      trend: "up",
      icon: "Database",
      iconColor: "var(--color-primary)"
    },
    {
      title: "Auto-Merge Success",
      value: "89.3%",
      change: 4.1,
      trend: "up",
      icon: "GitMerge",
      iconColor: "var(--color-accent)"
    }
  ];

  const scatterData = [
    { recordPair: "EMP-1234 / EMP-5678", similarity: 92, confidence: 95, fieldMatches: [
      { name: "Full Name", match: 98, valueA: "John Michael Smith", valueB: "John M. Smith" },
      { name: "Email", match: 100, valueA: "john.smith@company.com", valueB: "john.smith@company.com" },
      { name: "Phone", match: 85, valueA: "(555) 123-4567", valueB: "555-123-4567" },
      { name: "SSN", match: 100, valueA: "***-**-1234", valueB: "***-**-1234" }
    ], signals: [
      { name: "Exact Email Match", weight: 35 },
      { name: "Name Similarity", weight: 28 },
      { name: "SSN Match", weight: 25 },
      { name: "Phone Pattern", weight: 12 }
    ]},
    { recordPair: "CAN-2345 / CAN-6789", similarity: 88, confidence: 82, fieldMatches: [
      { name: "Full Name", match: 92, valueA: "Sarah Johnson", valueB: "Sara Johnson" },
      { name: "Email", match: 75, valueA: "sarah.j@email.com", valueB: "sara.johnson@email.com" },
      { name: "Phone", match: 100, valueA: "(555) 234-5678", valueB: "(555) 234-5678" }
    ], signals: [
      { name: "Phone Match", weight: 40 },
      { name: "Name Phonetic", weight: 35 },
      { name: "Email Pattern", weight: 25 }
    ]},
    { recordPair: "EMP-3456 / EMP-7890", similarity: 76, confidence: 68, fieldMatches: [
      { name: "Full Name", match: 85, valueA: "Michael Brown", valueB: "Mike Brown" },
      { name: "Address", match: 90, valueA: "123 Main St", valueB: "123 Main Street" }
    ], signals: [
      { name: "Address Match", weight: 45 },
      { name: "Name Variation", weight: 35 },
      { name: "Zip Code", weight: 20 }
    ]},
    { recordPair: "CON-4567 / CON-8901", similarity: 95, confidence: 91, fieldMatches: [
      { name: "Full Name", match: 100, valueA: "Jennifer Davis", valueB: "Jennifer Davis" },
      { name: "Email", match: 100, valueA: "j.davis@contractor.com", valueB: "j.davis@contractor.com" }
    ], signals: [
      { name: "Exact Name Match", weight: 50 },
      { name: "Email Match", weight: 50 }
    ]},
    { recordPair: "EMP-5678 / EMP-9012", similarity: 82, confidence: 75, fieldMatches: [
      { name: "Phone", match: 100, valueA: "(555) 345-6789", valueB: "(555) 345-6789" },
      { name: "Name", match: 70, valueA: "Robert Wilson", valueB: "Bob Wilson" }
    ], signals: [
      { name: "Phone Match", weight: 55 },
      { name: "Name Nickname", weight: 30 },
      { name: "Location", weight: 15 }
    ]},
    { recordPair: "CAN-6789 / CAN-0123", similarity: 68, confidence: 62, fieldMatches: [
      { name: "Email Domain", match: 100, valueA: "@company.com", valueB: "@company.com" },
      { name: "Name", match: 65, valueA: "David Lee", valueB: "David Li" }
    ], signals: [
      { name: "Email Domain", weight: 40 },
      { name: "Name Phonetic", weight: 35 },
      { name: "Timestamp", weight: 25 }
    ]},
    { recordPair: "EMP-7890 / EMP-1234", similarity: 91, confidence: 88, fieldMatches: [
      { name: "SSN", match: 100, valueA: "***-**-5678", valueB: "***-**-5678" },
      { name: "Name", match: 95, valueA: "Emily Anderson", valueB: "Emily Anderson" }
    ], signals: [
      { name: "SSN Match", weight: 60 },
      { name: "Name Match", weight: 40 }
    ]},
    { recordPair: "CON-8901 / CON-2345", similarity: 73, confidence: 70, fieldMatches: [
      { name: "Address", match: 88, valueA: "456 Oak Ave", valueB: "456 Oak Avenue" },
      { name: "Phone", match: 75, valueA: "(555) 456-7890", valueB: "555.456.7890" }
    ], signals: [
      { name: "Address Pattern", weight: 50 },
      { name: "Phone Format", weight: 30 },
      { name: "Name Partial", weight: 20 }
    ]}
  ];

  const signalsData = [
    { name: "Email Exact Match", weight: 92, matches: 1847, accuracy: 98.5, falsePositives: 23 },
    { name: "SSN Verification", weight: 88, matches: 1623, accuracy: 99.2, falsePositives: 12 },
    { name: "Phone Number Match", weight: 85, matches: 2134, accuracy: 94.7, falsePositives: 87 },
    { name: "Name Fuzzy Match", weight: 78, matches: 3421, accuracy: 89.3, falsePositives: 156 },
    { name: "Address Similarity", weight: 72, matches: 2876, accuracy: 86.8, falsePositives: 234 },
    { name: "Date of Birth", weight: 68, matches: 1456, accuracy: 97.1, falsePositives: 34 },
    { name: "Phonetic Algorithm", weight: 64, matches: 2987, accuracy: 82.4, falsePositives: 312 },
    { name: "Nickname Detection", weight: 58, matches: 1789, accuracy: 78.6, falsePositives: 267 }
  ];

  const heatmapData = [
    { source: "ATS System", fields: [95, 88, 92, 78, 85] },
    { source: "Payroll", fields: [92, 94, 87, 82, 91] },
    { source: "Manual Entry", fields: [76, 68, 72, 65, 58] },
    { source: "HR Portal", fields: [89, 85, 90, 74, 88] },
    { source: "Contractor DB", fields: [82, 79, 85, 71, 80] }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setIsModalOpen(true);
  };

  return (
    <NavigationWrapper>
      <div className="min-h-screen bg-background">
        <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-2">
              Duplicate Detection Hub
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Monitor similarity scoring algorithms and analyze matching pattern performance
            </p>
          </div>

          <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsData?.map((metric, idx) => (
              <MetricsCard key={idx} {...metric} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-8">
              <SimilarityScatterPlot data={scatterData} onPointClick={handlePointClick} />
            </div>
            <div className="lg:col-span-4">
              <MatchingSignalPanel signals={signalsData} />
            </div>
          </div>

          <DetectionHeatmap data={heatmapData} />
        </div>
      </div>
      <DetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedPoint} 
      />
    </NavigationWrapper>
  );
};

export default DuplicateDetectionHub;