import React from 'react';

// Field-oriented rows with percentages across source systems
const rows = [
  { field: 'Name', ATS: 95, Payroll: 92, Manual: 76, HR: 89, Contractor: 82 },
  { field: 'Email', ATS: 88, Payroll: 94, Manual: 68, HR: 85, Contractor: 79 },
  { field: 'Phone', ATS: 92, Payroll: 87, Manual: 72, HR: 90, Contractor: 85 },
  { field: 'Address', ATS: 78, Payroll: 82, Manual: 65, HR: 74, Contractor: 71 },
  { field: 'SSN', ATS: 85, Payroll: 91, Manual: 58, HR: 88, Contractor: 80 }
];

const getCellClasses = (v) => {
  // base cell: padding, border, right-aligned, responsive text
  const base = 'px-4 py-3 border text-right text-sm';
  if (v >= 80) return `${base} text-green-700 font-semibold`;
  if (v >= 60) return `${base} text-yellow-600`;
  if (v >= 40) return `${base} text-orange-600`;
  return `${base} text-red-600`;
};

const FieldDetection = () => {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">Field-Level Detection Patterns</h1>
        <p className="text-sm text-gray-700 mb-4">Duplicate detection accuracy across data fields and source systems.</p>

        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-700 mr-2">Legend:</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-800 text-xs font-medium">High (80%+)</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 text-xs font-medium">Medium (60-79%)</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-orange-100 text-orange-800 text-xs font-medium">Low (40-59%)</span>
          <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-100 text-red-800 text-xs font-medium">Very Low (&lt;40%)</span>
        </div>

        <div className="overflow-x-auto shadow-sm rounded-lg border border-gray-200 bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 border">Field</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border">ATS System</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border">Payroll</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border">Manual Entry</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border">HR Portal</th>
                <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900 border">Contractor DB</th>
              </tr>
            </thead>
            <tbody className="bg-white text-gray-900">
              {rows.map((r) => (
                <tr key={r.field} className="odd:bg-white even:bg-gray-50">
                  <td className="px-4 py-3 border font-medium text-sm text-gray-900">{r.field}</td>
                  <td className={getCellClasses(r.ATS)}>{r.ATS}%</td>
                  <td className={getCellClasses(r.Payroll)}>{r.Payroll}%</td>
                  <td className={getCellClasses(r.Manual)}>{r.Manual}%</td>
                  <td className={getCellClasses(r.HR)}>{r.HR}%</td>
                  <td className={getCellClasses(r.Contractor)}>{r.Contractor}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-gray-600">Table uses explicit background and text colors to ensure proper contrast on light backgrounds; responsive via horizontal scroll on narrow screens.</p>
      </div>
    </div>
  );
};

export default FieldDetection;
