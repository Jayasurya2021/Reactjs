import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Complaint } from '@/types';
import api from '@/api/axios';
import Navbar from '@/components/Navbar';
import ComplaintCard from '@/components/ComplaintCard';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  PlusCircle, 
  FileText, 
  Clock, 
  Loader2 as LoaderIcon, 
  CheckCircle,
  AlertTriangle 
} from 'lucide-react';

// Mock data for demonstration
const mockComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole near the intersection causing traffic issues and vehicle damage.',
    category: 'road',
    status: 'pending',
    location: '123 Main Street',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400',
    userId: '1',
    userName: 'John Doe',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Water leak from fire hydrant',
    description: 'Fire hydrant has been leaking for several days, wasting water.',
    category: 'water',
    status: 'in-progress',
    location: '456 Oak Avenue',
    userId: '1',
    userName: 'John Doe',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Street light not working',
    description: 'The street light at the corner has been out for a week, making the area unsafe at night.',
    category: 'electricity',
    status: 'resolved',
    location: '789 Pine Road',
    userId: '1',
    userName: 'John Doe',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // In production, this would call your API
        // const response = await api.get('/complaints');
        // setComplaints(response.data);
        
        // Using mock data for demonstration
        await new Promise(resolve => setTimeout(resolve, 1000));
        setComplaints(mockComplaints);
      } catch (error) {
        console.error('Failed to fetch complaints:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="mt-1 text-muted-foreground">
              Track and manage your community reports
            </p>
          </div>
          <Link to="/report">
            <Button className="w-full sm:w-auto">
              <PlusCircle className="mr-2 h-4 w-4" />
              Report Problem
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Reports"
            value={stats.total}
            icon={FileText}
            iconClassName="bg-primary/10 text-primary"
          />
          <StatsCard
            title="Pending"
            value={stats.pending}
            icon={Clock}
            iconClassName="bg-status-pending/10 text-status-pending"
          />
          <StatsCard
            title="In Progress"
            value={stats.inProgress}
            icon={LoaderIcon}
            iconClassName="bg-status-in-progress/10 text-status-in-progress"
          />
          <StatsCard
            title="Resolved"
            value={stats.resolved}
            icon={CheckCircle}
            iconClassName="bg-status-resolved/10 text-status-resolved"
          />
        </div>

        {/* Complaints grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Your Reports</h2>
          
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-3 rounded-lg border p-4">
                  <Skeleton className="h-40 w-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : complaints.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                <AlertTriangle className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">No reports yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Start by reporting a problem in your community
              </p>
              <Link to="/report" className="mt-4">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Report Problem
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {complaints.map((complaint) => (
                <ComplaintCard key={complaint.id} complaint={complaint} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
