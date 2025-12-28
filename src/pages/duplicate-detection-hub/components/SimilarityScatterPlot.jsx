import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const SimilarityScatterPlot = ({ data, onPointClick }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const getPointColor = (confidence) => {
    if (confidence >= 90) return 'var(--color-success)';
    if (confidence >= 70) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Similarity Score Distribution
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Confidence vs Similarity Analysis
          </p>
        </div>
        <button className="p-2 hover:bg-muted rounded-md transition-smooth active-press">
          <Icon name="Download" size={20} color="var(--color-foreground)" />
        </button>
      </div>
      <div className="relative h-64 md:h-80 lg:h-96 bg-muted/30 rounded-lg p-4 overflow-hidden">
        <div className="absolute bottom-4 left-4 right-4 h-px bg-border" />
        <div className="absolute bottom-4 left-4 top-4 w-px bg-border" />

        <div className="absolute bottom-2 left-4 text-xs text-muted-foreground">0%</div>
        <div className="absolute bottom-2 right-4 text-xs text-muted-foreground">100%</div>
        <div className="absolute top-2 left-0 text-xs text-muted-foreground -rotate-90 origin-left">
          Confidence
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
          Similarity Score
        </div>

        {data?.map((point, idx) => {
          const x = (point?.similarity / 100) * 85 + 8;
          const y = 85 - (point?.confidence / 100) * 75;
          
          return (
            <div
              key={idx}
              className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-transform hover:scale-150"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                backgroundColor: getPointColor(point?.confidence),
                opacity: hoveredPoint === idx ? 1 : 0.7
              }}
              onMouseEnter={() => setHoveredPoint(idx)}
              onMouseLeave={() => setHoveredPoint(null)}
              onClick={() => onPointClick(point)}
            />
          );
        })}

        {hoveredPoint !== null && (
          <div
            className="absolute bg-popover border border-border rounded-md shadow-lg p-3 z-10 pointer-events-none"
            style={{
              left: `${(data?.[hoveredPoint]?.similarity / 100) * 85 + 8}%`,
              top: `${85 - (data?.[hoveredPoint]?.confidence / 100) * 75 - 15}%`,
              transform: 'translate(-50%, -100%)'
            }}
          >
            <div className="text-xs font-caption space-y-1 whitespace-nowrap">
              <div className="font-medium text-foreground">{data?.[hoveredPoint]?.recordPair}</div>
              <div className="text-muted-foreground">
                Similarity: {data?.[hoveredPoint]?.similarity}%
              </div>
              <div className="text-muted-foreground">
                Confidence: {data?.[hoveredPoint]?.confidence}%
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center space-x-6 mt-4 text-xs font-caption">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-success)' }} />
          <span className="text-muted-foreground">High Confidence (90%+)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-warning)' }} />
          <span className="text-muted-foreground">Medium (70-89%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--color-error)' }} />
          <span className="text-muted-foreground">Low (&lt;70%)</span>
        </div>
      </div>
    </div>
  );
};

export default SimilarityScatterPlot;