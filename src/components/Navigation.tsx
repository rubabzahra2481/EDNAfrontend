/**
 * Navigation Component
 * Updated with Brandscaling Design System
 */

import { useState } from 'react';
import { Button } from './ui/button';
import { Menu, X, User, BookOpen, MessageSquare, Home as HomeIcon, Brain } from 'lucide-react';
import brandscalingLogo from 'figma:asset/4ffc1593ac524b5a444c05cca1a8149a7e87be86.png';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isAuthenticated: boolean;
  onAuthToggle: () => void;
  isSticky?: boolean;
}

export function Navigation({ currentView, onViewChange, isAuthenticated, onAuthToggle, isSticky = false }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    // Hide Home and About when user is authenticated
    ...(!isAuthenticated ? [
      { id: 'home', label: 'Home', icon: HomeIcon },
      { id: 'about', label: 'About', icon: User },
    ] : []),
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'quiz', label: 'E-DNA Quiz', icon: Brain },
    ...(isAuthenticated ? [
      { id: 'dashboard', label: 'Dashboard', icon: BookOpen },
      { id: 'chat', label: 'AI Mentor', icon: MessageSquare },
    ] : []),
  ];

  return (
    <nav 
      className={`bg-white border-b border-gray-100 ${isSticky ? 'sticky top-0 z-50' : ''}`}
      style={isSticky ? { 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'white'
      } : {}}
    >
      {/* Gradient stripe at top */}
      <div className="h-[6px] bg-gradient-arch-scale-90" aria-hidden="true" />
      
      <div className="container-bs-desktop">
        <div className="flex justify-between h-16">
          {/* Logo Only */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => onViewChange('home')}
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
                aria-label="Brandscaling Home"
              >
                <img src={brandscalingLogo} alt="Brandscaling" className="h-12 w-auto" />
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">Brandscaling</span>
                  <span className="text-xs text-gray-500">Purpose → Profit → Purpose</span>
                </div>
              </button>
            </div>
          </div>

          {/* Desktop Navigation & Auth Button */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {/* Only show navigation buttons on home page when not authenticated */}
            {currentView === 'home' && !isAuthenticated && navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--bs-color-indigo)] to-[var(--bs-color-orange)] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="typo-caption-bs font-medium">{item.label}</span>
                </button>
              );
            })}
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <Button
                variant="outline"
                onClick={onAuthToggle}
                className="h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)] hover:bg-[var(--bs-color-indigo)] hover:text-white transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Logout
              </Button>
            ) : (
              <button
                onClick={onAuthToggle}
                className="cta-gradient-bs px-6 flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-3 space-y-2">
            {/* Only show navigation buttons on home page when not authenticated */}
            {currentView === 'home' && !isAuthenticated && navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--bs-color-indigo)] to-[var(--bs-color-orange)] text-white'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="typo-body-bs font-medium">{item.label}</span>
                </button>
              );
            })}
            
            {/* Mobile Auth Button */}
            <div className="pt-2">
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    onAuthToggle();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full h-[var(--bs-cta-height)] border-2 border-[var(--bs-color-indigo)] text-[var(--bs-color-indigo)]"
                >
                  <User className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              ) : (
                <button
                  onClick={() => {
                    onAuthToggle();
                    setIsMobileMenuOpen(false);
                  }}
                  className="cta-gradient-bs w-full flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}