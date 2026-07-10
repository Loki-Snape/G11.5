import React from 'react';

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'maintenance';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const colorMap: Record<string, string> = {
    online: 'bg-emerald-950/80 border border-emerald-500/30 text-emerald-400',
    offline: 'bg-red-950/80 border border-red-500/30 text-red-400',
    maintenance: 'bg-amber-950/80 border border-amber-500/30 text-amber-400',
  };
  const dotColorMap: Record<string, string> = {
    online: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]',
    offline: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]',
    maintenance: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]',
  };
  const labelMap: Record<string, string> = {
    online: 'Online',
    offline: 'Offline',
    maintenance: 'Maintenance',
  };
  const bg = colorMap[status] || 'bg-gray-900 border border-gray-700 text-gray-400';
  const dotBg = dotColorMap[status] || 'bg-gray-400';
  const label = labelMap[status] || status;

  return (
    <span className={`inline-flex items-center space-x-2 px-3 py-1 text-xs font-semibold rounded uppercase tracking-wider font-mono ${bg}`}>
      <span className="relative flex h-2 w-2">
        {status === 'online' && (
          <span className="animate-live-status absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${dotBg}`}></span>
      </span>
      <span>{label}</span>
    </span>
  );
}

