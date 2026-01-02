import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle, 
  Users, 
  BarChart3,
  Shield
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: AlertTriangle,
      title: 'Report Issues',
      description: 'Easily report problems in your community with photos and location details.',
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Follow the status of your reports from submission to resolution.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join your neighbors in making your community a better place.',
    },
    {
      icon: Shield,
      title: 'Official Response',
      description: 'Get updates directly from city officials handling your reports.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">CommunityFix</span>
          </Link>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-accent/50 to-background" />
        <div className="container mx-auto px-4 text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Report Problems.{' '}
            <span className="text-primary">Track Progress.</span>{' '}
            Improve Your Community.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            CommunityFix connects citizens with local authorities to report and resolve 
            community issues like potholes, water leaks, broken street lights, and more.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Reporting
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground">
              Simple steps to make your community better
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-accent/30 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground">
            Ready to improve your community?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Join thousands of citizens making their neighborhoods better.
          </p>
          <Link to="/register" className="mt-8 inline-block">
            <Button size="lg">
              Create Free Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 CommunityFix. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
