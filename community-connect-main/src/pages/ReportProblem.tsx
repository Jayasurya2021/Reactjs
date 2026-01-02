import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ComplaintCategory, CreateComplaintData } from '@/types';
import api from '@/api/axios';
import Navbar from '@/components/Navbar';
import ImageUploader from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, MapPin, ArrowLeft } from 'lucide-react';
import { z } from 'zod';

const reportSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters').max(1000),
  category: z.enum(['road', 'water', 'electricity', 'garbage']),
  location: z.string().min(5, 'Location must be at least 5 characters').max(200),
});

const ReportProblem: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ComplaintCategory | ''>('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const result = reportSchema.safeParse({ title, description, category, location });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      // In production, this would be a multipart form data request
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('location', location);
      if (image) {
        formData.append('image', image);
      }

      // await api.post('/complaints', formData, {
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // });

      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast({
        title: 'Report submitted!',
        description: 'Your problem report has been submitted successfully.',
      });
      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Submission failed',
        description: error.response?.data?.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-2xl px-4 py-8">
        <Button
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <Card className="shadow-card animate-fade-in">
          <CardHeader>
            <CardTitle>Report a Problem</CardTitle>
            <CardDescription>
              Help improve your community by reporting issues that need attention
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Problem Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Pothole on Main Street"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isLoading}
                />
                {errors.title && (
                  <p className="text-sm text-destructive">{errors.title}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value as ComplaintCategory)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="road">🛣️ Road</SelectItem>
                    <SelectItem value="water">💧 Water</SelectItem>
                    <SelectItem value="electricity">⚡ Electricity</SelectItem>
                    <SelectItem value="garbage">🗑️ Garbage</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the problem, including any relevant information that would help in addressing it..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  {description.length}/1000 characters
                </p>
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Street address or nearby landmark"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-9"
                    disabled={isLoading}
                  />
                </div>
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location}</p>
                )}
              </div>

              {/* Image upload */}
              <div className="space-y-2">
                <Label>Photo (Optional)</Label>
                <ImageUploader
                  value={image}
                  onChange={setImage}
                />
                <p className="text-xs text-muted-foreground">
                  Adding a photo helps us understand the problem better
                </p>
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Report
              </Button>
            </CardContent>
          </form>
        </Card>
      </main>
    </div>
  );
};

export default ReportProblem;
