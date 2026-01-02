import React from 'react';
import { ComplaintStatus } from '@/types';
import { cn } from '@/lib/utils';
import { Clock, Loader2, CheckCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: ComplaintStatus;
  size?: 'sm' | 'md';
}

const statusConfig: Record<ComplaintStatus, { 
  label: string; 
  icon: React.ElementType;
  className: string;
}> = {
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-status-pending text-status-pending-foreground',
  },
  'in-progress': {
    label: 'In Progress',
    icon: Loader2,
    className: 'bg-status-in-progress text-status-in-progress-foreground',
  },
  resolved: {
    label: 'Resolved',
    icon: CheckCircle,
    className: 'bg-status-resolved text-status-resolved-foreground',
  },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={cn(
        status === 'in-progress' && 'animate-spin',
        size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'
      )} />
      {config.label}
    </span>
  );
};

export default StatusBadge;
