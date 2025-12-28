import { useState, useEffect } from 'react';

export default function SystemStatusIndicator() {
  const [status, setStatus] = useState('operational');
  
  useEffect(() => {
    // Simulate system status check
    const checkStatus = () => {
      setStatus('operational');
    };
    checkStatus();
  }, []);

  const statusColors = {
    operational: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      <span className="capitalize">{status}</span>
    </div>
  );
}
