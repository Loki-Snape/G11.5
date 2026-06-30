import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<string, string> = {
    online: 'bg-green-600',
    offline: 'bg-red-600',
    maintenance: 'bg-yellow-600',
  };
  const labelMap: Record<string, string> = {
    online: 'Online',
    offline: 'Offline',
    maintenance: 'Maintenance',
  };
  const bg = colorMap[status] || 'bg-gray-600';
  const label = labelMap[status] || status;
  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium rounded ${bg} text-white`}> {label} </span>
  );
}
