import React from 'react';
import { Link } from 'react-router-dom';
import { Complaint } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import CategoryBadge from './CategoryBadge';
import { MapPin, Calendar, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ComplaintCardProps {
  complaint: Complaint;
  showUser?: boolean;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({ complaint, showUser = false }) => {
  return (
    <Link to={`/complaint/${complaint.id}`}>
      <Card className="group h-full transition-all duration-200 hover:shadow-card-hover hover:border-primary/20">
        {complaint.imageUrl && (
          <div className="relative h-40 overflow-hidden rounded-t-lg">
            <img
              src={complaint.imageUrl}
              alt={complaint.title}
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </div>
        )}
        <CardHeader className={complaint.imageUrl ? 'pt-3' : ''}>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={complaint.status} size="sm" />
            <CategoryBadge category={complaint.category} size="sm" />
          </div>
          <h3 className="mt-2 line-clamp-2 font-semibold text-foreground group-hover:text-primary transition-colors">
            {complaint.title}
          </h3>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {complaint.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {complaint.location}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDistanceToNow(new Date(complaint.createdAt), { addSuffix: true })}
            </span>
          </div>

          {showUser && (
            <div className="border-t pt-3">
              <p className="text-xs text-muted-foreground">
                Reported by <span className="font-medium text-foreground">{complaint.userName}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
};

export default ComplaintCard;
