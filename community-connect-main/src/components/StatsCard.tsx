import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon,
  iconClassName,
  trend 
}) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-6">
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg',
          iconClassName || 'bg-primary/10 text-primary'
        )}>
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={cn(
              'text-xs',
              trend.isPositive ? 'text-status-resolved' : 'text-destructive'
            )}>
              {trend.isPositive ? '+' : '-'}{trend.value}% from last month
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
