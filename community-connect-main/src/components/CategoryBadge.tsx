import React from 'react';
import { ComplaintCategory } from '@/types';
import { cn } from '@/lib/utils';
import { Construction, Droplets, Zap, Trash2 } from 'lucide-react';

interface CategoryBadgeProps {
  category: ComplaintCategory;
  size?: 'sm' | 'md';
}

const categoryConfig: Record<ComplaintCategory, { 
  label: string; 
  icon: React.ElementType;
  className: string;
}> = {
  road: {
    label: 'Road',
    icon: Construction,
    className: 'bg-category-road/15 text-category-road border-category-road/30',
  },
  water: {
    label: 'Water',
    icon: Droplets,
    className: 'bg-category-water/15 text-category-water border-category-water/30',
  },
  electricity: {
    label: 'Electricity',
    icon: Zap,
    className: 'bg-category-electricity/15 text-category-electricity border-category-electricity/30',
  },
  garbage: {
    label: 'Garbage',
    icon: Trash2,
    className: 'bg-category-garbage/15 text-category-garbage border-category-garbage/30',
  },
};

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'md' }) => {
  const config = categoryConfig[category];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border font-medium',
        config.className,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-4 w-4'} />
      {config.label}
    </span>
  );
};

export default CategoryBadge;
