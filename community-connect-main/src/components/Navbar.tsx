import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { 
  Menu, 
  X, 
  Home, 
  FileText, 
  PlusCircle, 
  Shield, 
  LogOut, 
  User,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/report', label: 'Report Problem', icon: PlusCircle },
    ...(isAdmin ? [{ href: '/admin', label: 'Admin Panel', icon: Shield }] : []),
  ];

  const isActiveLink = (href: string) => location.pathname === href;

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <AlertTriangle className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="hidden font-semibold text-foreground sm:inline-block">
              CommunityFix
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <Link key={link.href} to={link.href}>
                  <Button
                    variant={isActiveLink(link.href) ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn(
                      'gap-2',
                      isActiveLink(link.href) && 'bg-accent text-accent-foreground'
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                {/* User dropdown - desktop */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild className="hidden md:flex">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {user?.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="hidden lg:inline">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile menu */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-72">
                    <div className="flex flex-col gap-4 pt-4">
                      {/* User info */}
                      <div className="flex items-center gap-3 border-b pb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-sm text-muted-foreground">{user?.email}</p>
                        </div>
                      </div>

                      {/* Nav links */}
                      <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            to={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            <Button
                              variant={isActiveLink(link.href) ? 'secondary' : 'ghost'}
                              className="w-full justify-start gap-3"
                            >
                              <link.icon className="h-5 w-5" />
                              {link.label}
                            </Button>
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <Button
                        variant="ghost"
                        className="mt-auto w-full justify-start gap-3 text-destructive hover:text-destructive"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          handleLogout();
                        }}
                      >
                        <LogOut className="h-5 w-5" />
                        Logout
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
