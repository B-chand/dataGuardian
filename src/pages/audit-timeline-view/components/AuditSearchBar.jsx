import React from 'react';
import Input from '../../../components/ui/Input';

const AuditSearchBar = ({ value, onChange, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Search audit logs by event ID, user, or description..."
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        onKeyPress={handleKeyPress}
        className="w-full"
      />
    </div>
  );
};

export default AuditSearchBar;