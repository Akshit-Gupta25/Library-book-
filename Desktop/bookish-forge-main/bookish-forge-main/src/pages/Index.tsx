import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Users, Shield } from 'lucide-react';
import libraryHero from '@/assets/library-hero.jpg';

const Index = () => {
  const { user } = useAuth();

  // Redirect authenticated users to their dashboard
  if (user) {
    window.location.href = user.role === 'admin' ? '/admin' : '/dashboard';
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={libraryHero}
            alt="Library interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-60"></div>
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <BookOpen className="h-20 w-20 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Digital Library
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover, borrow, and manage thousands of books with our modern library management system
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="accent" size="xl" className="min-w-[200px]">
                Get Started
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="min-w-[200px] bg-white/10 text-white border-white/20 hover:bg-white/20">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose LibraryApp?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of library management with our intuitive platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card shadow-book hover:shadow-elegant transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
                <BookOpen className="h-8 w-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Easy Book Discovery</h3>
              <p className="text-muted-foreground">
                Search and filter through our extensive collection with smart categorization and availability tracking
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card shadow-book hover:shadow-elegant transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                <Users className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">User-Friendly Experience</h3>
              <p className="text-muted-foreground">
                Intuitive interface designed for both library administrators and book lovers
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card shadow-book hover:shadow-elegant transition-all duration-300">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-success rounded-full mb-6">
                <Shield className="h-8 w-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Smart Management</h3>
              <p className="text-muted-foreground">
                Automated tracking, real-time availability updates, and comprehensive analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Library Experience?
          </h2>
          <p className="text-xl text-primary-foreground opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already discovered the joy of digital library management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button variant="accent" size="xl" className="min-w-[200px]">
                Start Free Today
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="xl" className="min-w-[200px] bg-white/10 text-white border-white/20 hover:bg-white/20">
                I Have an Account
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
