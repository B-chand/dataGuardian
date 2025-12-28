import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ExportOptions = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const exportFormats = [
    { id: 'pdf', label: 'PDF Audit Report', icon: 'FileText' },
    { id: 'csv', label: 'CSV Transaction Log', icon: 'Table' },
    { id: 'json', label: 'JSON Data Export', icon: 'Code' },
    { id: 'compliance', label: 'Compliance Certificate', icon: 'Award' }
  ];

  const handleExport = (format) => {
    setIsExporting(true);
    setShowMenu(false);
    
    setTimeout(() => {
      setIsExporting(false);
      alert(`Export completed: ${format?.label}`);
    }, 2000);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        iconName="Download"
        iconPosition="left"
        onClick={() => setShowMenu(!showMenu)}
        loading={isExporting}
      >
        Export
      </Button>
      {showMenu && (
        <>
          <div 
            className="fixed inset-0 z-1050"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg z-1100">
            <div className="py-2">
              {exportFormats?.map((format) => (
                <button
                  key={format?.id}
                  onClick={() => handleExport(format)}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-sm font-caption text-popover-foreground hover:bg-muted transition-smooth"
                >
                  <Icon name={format?.icon} size={18} color="var(--color-foreground)" />
                  <span>{format?.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExportOptions;