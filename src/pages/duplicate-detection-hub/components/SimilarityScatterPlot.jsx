import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const chartPadding = { top: 6, right: 4, bottom: 12, left: 12 }; // percentages for layout spacing
const ticks = [0, 25, 50, 75, 100];

const clampPercent = (value) => Math.min(100, Math.max(0, value));

const normalizeToPercent = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  const percentValue = numeric <= 1 ? numeric * 100 : numeric;
  return clampPercent(percentValue);
};

const formatPercent = (value, decimals = 0) => `${normalizeToPercent(value).toFixed(decimals)}%`;

const SimilarityScatterPlot = ({ data, onPointClick }) => {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const hasData = Array.isArray(data) && data.length > 0;

  const getPointColor = (confidence) => {
    if (confidence >= 90) return 'var(--color-success)';
    if (confidence >= 70) return 'var(--color-warning)';
    return 'var(--color-error)';
  };

  const getXPosition = (confidencePercent) => {
    const plotWidth = 100 - chartPadding.left - chartPadding.right;
    return chartPadding.left + (confidencePercent / 100) * plotWidth;
  };

  // Corrected Y-axis: 0% at bottom, 100% at top
  const getYPosition = (similarityPercent) => {
    const plotHeight = 100 - chartPadding.top - chartPadding.bottom;
    return chartPadding.top + ((100 - similarityPercent) / 100) * plotHeight;
  };

  const hoveredData = hoveredPoint !== null ? data?.[hoveredPoint] : null;
  const hoveredConfidence = hoveredData ? normalizeToPercent(hoveredData.confidence) : 0;
  const hoveredSimilarity = hoveredData ? normalizeToPercent(hoveredData.similarity) : 0;

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
        {/* Axes */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute h-px bg-border"
            style={{
              left: `${chartPadding.left}%`,
              right: `${chartPadding.right}%`,
              bottom: `${chartPadding.bottom}%`,
            }}
          />
          <div
            className="absolute w-px bg-border"
            style={{
              top: `${chartPadding.top}%`,
              bottom: `${chartPadding.bottom}%`,
              left: `${chartPadding.left}%`,
            }}
          />

          {/* X ticks */}
          {ticks.map((tick) => {
            const xPos = getXPosition(tick);
            return (
              <React.Fragment key={`x-${tick}`}>
                <div
                  className="absolute w-px bg-border/70"
                  style={{
                    left: `${xPos}%`,
                    bottom: `${chartPadding.bottom}%`,
                    height: '6px',
                  }}
                />
                <div
                  className="absolute text-[11px] text-muted-foreground"
                  style={{
                    left: `${xPos}%`,
                    bottom: `${chartPadding.bottom - 4}%`,
                    transform: 'translateX(-50%)',
                  }}
                >
                  {tick}%
                </div>
                <div
                  className="absolute w-px bg-border/20"
                  style={{
                    left: `${xPos}%`,
                    top: `${chartPadding.top}%`,
                    bottom: `${chartPadding.bottom}%`,
                  }}
                />
              </React.Fragment>
            );
          })}

          {/* Y ticks */}
          {ticks.map((tick) => {
            const yPos = getYPosition(tick);
            return (
              <React.Fragment key={`y-${tick}`}>
                <div
                  className="absolute h-px bg-border/70"
                  style={{
                    left: `${chartPadding.left}%`,
                    right: `${chartPadding.right}%`,
                    top: `${yPos}%`,
                  }}
                />
                <div
                  className="absolute text-[11px] text-muted-foreground"
                  style={{
                    left: `${chartPadding.left - 3}%`,
                    top: `${yPos}%`,
                    transform: 'translate(-100%, -50%)',
                  }}
                >
                  {tick}%
                </div>
              </React.Fragment>
            );
          })}

          {/* Axis Labels */}
          <div
            className="absolute text-xs text-muted-foreground"
            style={{
              bottom: `${chartPadding.bottom - 8}%`,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            Confidence (0-100%)
          </div>
          <div
            className="absolute text-xs text-muted-foreground -rotate-90 origin-top"
            style={{
              left: `${chartPadding.left - 8}%`,
              top: '50%',
              transform: 'translate(-50%, -50%) rotate(-90deg)',
            }}
          >
          </div>
        </div>

        {/* Points */}
        {hasData &&
          data.map((point, idx) => {
            const confidencePercent = normalizeToPercent(point?.confidence);
            const similarityPercent = normalizeToPercent(point?.similarity);
            const x = getXPosition(confidencePercent);
            const y = getYPosition(similarityPercent);

            return (
              <div
                key={idx}
                className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-transform hover:scale-150"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  backgroundColor: getPointColor(confidencePercent),
                  opacity: hoveredPoint === idx ? 1 : 0.75,
                }}
                onMouseEnter={() => setHoveredPoint(idx)}
                onMouseLeave={() => setHoveredPoint(null)}
                onClick={() => onPointClick?.(point)}
              />
            );
          })}

        {!hasData && (
          <div className="absolute inset-4 flex items-center justify-center text-sm text-muted-foreground">
            No points to display
          </div>
        )}

        {hoveredData && (
          <div
            className="absolute bg-popover border border-border rounded-md shadow-lg p-3 z-10 pointer-events-none"
            style={{
              left: `${getXPosition(hoveredConfidence)}%`,
              top: `${getYPosition(hoveredSimilarity)}%`,
              transform: 'translate(-50%, -110%)',
            }}
          >
            <div className="text-xs font-caption space-y-1 whitespace-nowrap">
              <div className="font-medium text-foreground">{hoveredData.recordPair || 'Record Pair'}</div>
              <div className="text-muted-foreground">Similarity: {formatPercent(hoveredData.similarity, 1)}</div>
              <div className="text-muted-foreground">Confidence: {formatPercent(hoveredData.confidence, 1)}</div>
            </div>
          </div>
        )}
      </div>

      {/* Legend */}
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
