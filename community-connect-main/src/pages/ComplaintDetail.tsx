import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Complaint, Comment, ComplaintStatus } from '@/types';
import { useAuth } from '@/context/AuthContext';
import api from '@/api/axios';
import Navbar from '@/components/Navbar';
import StatusBadge from '@/components/StatusBadge';
import CategoryBadge from '@/components/CategoryBadge';
import CommentThread from '@/components/CommentThread';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, MapPin, Calendar, User, Loader2 } from 'lucide-react';
import { format } from 'date-fns';

// Mock data
const mockComplaint: Complaint = {
  id: '1',
  title: 'Pothole on Main Street',
  description: 'Large pothole near the intersection causing traffic issues and vehicle damage. The pothole has been getting bigger over the past few weeks and is now about 2 feet wide. Several vehicles have already been damaged. This is a safety hazard that needs immediate attention.',
  category: 'road',
  status: 'in-progress',
  location: '123 Main Street, Downtown',
  imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=800',
  userId: '1',
  userName: 'John Doe',
  createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
};

const mockComments: Comment[] = [
  {
    id: '1',
    complaintId: '1',
    userId: 'admin1',
    userName: 'City Maintenance',
    userRole: 'admin',
    content: 'Thank you for reporting this issue. We have dispatched a team to assess the damage. Expected repair time is 2-3 business days.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    complaintId: '1',
    userId: '1',
    userName: 'John Doe',
    userRole: 'user',
    content: 'Thank you for the quick response! Looking forward to the repair.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    complaintId: '1',
    userId: 'admin1',
    userName: 'City Maintenance',
    userRole: 'admin',
    content: 'Update: Repair work is scheduled for tomorrow morning. The area will be temporarily closed from 8 AM to 12 PM.',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const ComplaintDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { toast } = useToast();

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [commentsLoading, setCommentsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // In production:
        // const [complaintRes, commentsRes] = await Promise.all([
        //   api.get(`/complaints/${id}`),
        //   api.get(`/complaints/${id}/comments`),
        // ]);
        // setComplaint(complaintRes.data);
        // setComments(commentsRes.data);

        // Mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        setComplaint(mockComplaint);
        setComments(mockComments);
      } catch (error) {
        console.error('Failed to fetch complaint:', error);
        toast({
          title: 'Error',
          description: 'Failed to load complaint details.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, toast]);

  const handleStatusChange = async (newStatus: ComplaintStatus) => {
    if (!complaint) return;
    
    setIsUpdatingStatus(true);
    try {
      // await api.patch(`/complaints/${id}`, { status: newStatus });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setComplaint({ ...complaint, status: newStatus });
      toast({
        title: 'Status updated',
        description: `Complaint status changed to ${newStatus.replace('-', ' ')}.`,
      });
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update complaint status.',
        variant: 'destructive',
      });
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleAddComment = async (content: string) => {
    try {
      // const response = await api.post(`/complaints/${id}/comments`, { content });
      // setComments([...comments, response.data]);
      
      // Mock adding comment
      const newComment: Comment = {
        id: Date.now().toString(),
        complaintId: id!,
        userId: 'current-user',
        userName: 'You',
        userRole: isAdmin ? 'admin' : 'user',
        content,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      
      toast({
        title: 'Comment added',
        description: 'Your comment has been posted.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add comment.',
        variant: 'destructive',
      });
      throw error;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto max-w-4xl px-4 py-8">
          <Skeleton className="mb-4 h-10 w-24" />
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-16">
          <h1 className="text-2xl font-bold text-foreground">Complaint not found</h1>
          <p className="mt-2 text-muted-foreground">The complaint you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/dashboard')} className="mt-4">
            Back to Dashboard
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6 animate-fade-in">
          {/* Main complaint card */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={complaint.status} />
                <CategoryBadge category={complaint.category} />
              </div>
              <h1 className="mt-2 text-2xl font-bold text-foreground">
                {complaint.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {complaint.userName}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {complaint.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(complaint.createdAt), 'MMM d, yyyy')}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image */}
              {complaint.imageUrl && (
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={complaint.imageUrl}
                    alt={complaint.title}
                    className="h-auto max-h-96 w-full object-cover"
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h3 className="mb-2 font-semibold text-foreground">Description</h3>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {complaint.description}
                </p>
              </div>

              {/* Admin controls */}
              {isAdmin && (
                <div className="border-t pt-4">
                  <h3 className="mb-2 font-semibold text-foreground">Admin Actions</h3>
                  <div className="flex items-center gap-4">
                    <label className="text-sm text-muted-foreground">Update Status:</label>
                    <Select
                      value={complaint.status}
                      onValueChange={handleStatusChange}
                      disabled={isUpdatingStatus}
                    >
                      <SelectTrigger className="w-40">
                        {isUpdatingStatus ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <SelectValue />
                        )}
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Comments section */}
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <CommentThread
                comments={comments}
                onAddComment={handleAddComment}
                isLoading={commentsLoading}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ComplaintDetail;
