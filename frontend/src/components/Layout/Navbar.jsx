import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Home, List, Menu, X, CheckSquare } from 'lucide-react';
import { Button } from '../ui/Button';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <CheckSquare className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Task Manager</h1>
            <p className="text-sm text-muted-foreground">
              Welcome, {user?.name}
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/tasks"
            className="flex items-center space-x-1 text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            <List className="h-4 w-4" />
            <span>Tasks</span>
          </Link>

          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-card/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 space-y-2">
            <Link
              to="/"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              to="/tasks"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <List className="h-5 w-5" />
              <span>Tasks</span>
            </Link>

            <Button 
              variant="outline" 
              onClick={() => {
                handleLogout();
                setIsMobileMenuOpen(false);
              }}
              className="w-full justify-start"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
