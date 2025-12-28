import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import GlobalAlertIndicator from './GlobalAlertIndicator';
import TimeRangeSelector from './TimeRangeSelector';

const Header = ({ timeRange, onTimeRangeChange }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Data Intake',
      path: '/data-intake-monitor',
      icon: 'Database'
    },
    {
      label: 'Duplicate Detection',
      path: '/duplicate-detection-hub',
      icon: 'Copy'
    },
    {
      label: 'AI Decisions',
      path: '/ai-decision-analytics',
      icon: 'Brain'
    },
    {
      label: 'Audit Timeline',
      path: '/audit-timeline-view',
      icon: 'Clock'
    }
    ,
    {
      label: 'Admin Portal',
      path: '/admin-portal',
      icon: 'User'
    },
    {
      label: 'Candidate Portal',
      path: '/candidate-portal',
      icon: 'Users'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-1000 bg-card shadow-md transition-smooth">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center transition-smooth hover:bg-primary/20">
                <Icon name="Shield" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-heading font-semibold text-foreground hidden sm:block">
                DataGuardian AI
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`
                  flex items-center space-x-2 px-4 py-2 rounded-md font-caption font-medium
                  transition-smooth hover-lift active-press
                  ${isActive(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-foreground hover:bg-muted'
                  }
                `}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
                />
                <span>{item?.label}</span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <TimeRangeSelector value={timeRange} onChange={onTimeRangeChange} />
            <GlobalAlertIndicator />
          </div>

          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth active-press"
            aria-label="Toggle mobile menu"
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} color="var(--color-foreground)" />
          </button>
        </div>
      </header>
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-999 md:hidden">
          <div 
            className="absolute inset-0 bg-background"
            onClick={toggleMobileMenu}
          />
          <nav className="absolute top-16 left-0 right-0 bg-card shadow-lg border-t border-border">
            <div className="py-2">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={toggleMobileMenu}
                  className={`
                    flex items-center space-x-3 px-6 py-3 font-caption font-medium
                    transition-smooth active-press
                    ${isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                    }
                  `}
                >
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
                  />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;