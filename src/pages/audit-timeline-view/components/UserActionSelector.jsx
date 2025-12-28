import React from 'react';
import Select from '../../../components/ui/Select';

const UserActionSelector = ({ value, onChange }) => {
  const userOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'system', label: 'System (Automated)' },
    { value: 'admin_sarah', label: 'Sarah Chen (Admin)' },
    { value: 'admin_michael', label: 'Michael Rodriguez (Admin)' },
    { value: 'analyst_emma', label: 'Emma Thompson (Analyst)' },
    { value: 'analyst_james', label: 'James Wilson (Analyst)' }
  ];

  return (
    <div className="w-full md:w-64">
      <Select
        label="Filter by User"
        options={userOptions}
        value={value}
        onChange={onChange}
        searchable
        clearable
      />
    </div>
  );
};

export default UserActionSelector;