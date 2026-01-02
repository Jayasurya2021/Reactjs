import React from 'react';
import { ComplaintCategory, ComplaintStatus, ComplaintFilters } from '@/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface FilterBarProps {
  filters: ComplaintFilters;
  onFiltersChange: (filters: ComplaintFilters) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFiltersChange }) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search complaints..."
          value={filters.search || ''}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-9"
        />
      </div>

      {/* Category filter */}
      <Select
        value={filters.category || 'all'}
        onValueChange={(value) => 
          onFiltersChange({ ...filters, category: value as ComplaintCategory | 'all' })
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="road">Road</SelectItem>
          <SelectItem value="water">Water</SelectItem>
          <SelectItem value="electricity">Electricity</SelectItem>
          <SelectItem value="garbage">Garbage</SelectItem>
        </SelectContent>
      </Select>

      {/* Status filter */}
      <Select
        value={filters.status || 'all'}
        onValueChange={(value) => 
          onFiltersChange({ ...filters, status: value as ComplaintStatus | 'all' })
        }
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-progress">In Progress</SelectItem>
          <SelectItem value="resolved">Resolved</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FilterBar;
