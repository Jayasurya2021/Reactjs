import React, { useState, useEffect, useMemo } from 'react';
import { Complaint, ComplaintFilters, ComplaintStatus } from '@/types';
import api from '@/api/axios';
import Navbar from '@/components/Navbar';
import ComplaintCard from '@/components/ComplaintCard';
import FilterBar from '@/components/FilterBar';
import StatsCard from '@/components/StatsCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Clock, 
  Loader2 as LoaderIcon, 
  CheckCircle,
  TrendingUp
} from 'lucide-react';

// Mock data for admin panel
const mockAllComplaints: Complaint[] = [
  {
    id: '1',
    title: 'Pothole on Main Street',
    description: 'Large pothole near the intersection causing traffic issues.',
    category: 'road',
    status: 'pending',
    location: '123 Main Street',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=400',
    userId: '1',
    userName: 'John Doe',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Water leak on Oak Avenue',
    description: 'Fire hydrant has been leaking for several days.',
    category: 'water',
    status: 'in-progress',
    location: '456 Oak Avenue',
    userId: '2',
    userName: 'Jane Smith',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Broken street light',
    description: 'The street light has been out for a week.',
    category: 'electricity',
    status: 'resolved',
    location: '789 Pine Road',
    userId: '3',
    userName: 'Bob Wilson',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Garbage overflow at park',
    description: 'The garbage bins at the park are overflowing.',
    category: 'garbage',
    status: 'pending',
    location: 'Central Park, Main Entrance',
    imageUrl: 'https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400',
    userId: '4',
    userName: 'Alice Brown',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Road marking faded',
    description: 'Road markings at the intersection are barely visible.',
    category: 'road',
    status: 'in-progress',
    location: '321 Highway Junction',
    userId: '5',
    userName: 'Charlie Davis',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Water main break',
    description: 'Major water main break causing flooding.',
    category: 'water',
    status: 'resolved',
    location: '555 Maple Street',
    userId: '6',
    userName: 'Diana Evans',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const AdminPanel: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filters, setFilters] = useState<ComplaintFilters>({
    category: 'all',
    status: 'all',
    search: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | ComplaintStatus>('all');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        // const response = await api.get('/complaints');
        // setComplaints(response.data);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        setComplaints(mockAllComplaints);
      } catch (error) {
        console.error('Failed to fetch complaints:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const stats = useMemo(() => ({
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'pending').length,
    inProgress: complaints.filter(c => c.status === 'in-progress').length,
    resolved: complaints.filter(c => c.status === 'resolved').length,
  }), [complaints]);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((complaint) => {
      // Tab filter
      if (activeTab !== 'all' && complaint.status !== activeTab) {
        return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'all' && complaint.category !== filters.category) {
        return false;
      }

      // Status filter (only when on 'all' tab)
      if (activeTab === 'all' && filters.status && filters.status !== 'all' && complaint.status !== filters.status) {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          complaint.title.toLowerCase().includes(searchLower) ||
          complaint.description.toLowerCase().includes(searchLower) ||
          complaint.location.toLowerCase().includes(searchLower) ||
          complaint.userName.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  }, [complaints, filters, activeTab]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">Admin Panel</h1>
          <p className="mt-1 text-muted-foreground">
            Manage and resolve community complaints
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Total Complaints"
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

        {/* Complaints management */}
        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <TabsList>
                <TabsTrigger value="all">
                  All ({stats.total})
                </TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({stats.pending})
                </TabsTrigger>
                <TabsTrigger value="in-progress">
                  In Progress ({stats.inProgress})
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved ({stats.resolved})
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Filters */}
            <div className="mt-4">
              <FilterBar
                filters={filters}
                onFiltersChange={setFilters}
              />
            </div>

            {/* Content */}
            <TabsContent value={activeTab} className="mt-6">
              {isLoading ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-3 rounded-lg border p-4">
                      <Skeleton className="h-40 w-full" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : filteredComplaints.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-16">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-foreground">No complaints found</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {filters.search ? 'Try adjusting your search or filters' : 'No complaints in this category'}
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredComplaints.map((complaint) => (
                    <ComplaintCard key={complaint.id} complaint={complaint} showUser />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
