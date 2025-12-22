import React from 'react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', className, iconOnly = false }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl',
  };

  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn(
        'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 shadow-lg',
        sizeClasses[size]
      )}>
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-xl bg-primary/20 blur-md -z-10" />
        
        {/* Logo symbol - Synapse neural connection */}
        <svg
          viewBox="0 0 40 40"
          fill="none"
          className="w-3/5 h-3/5 relative z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Central hexagon core */}
          <path
            d="M20 8L28 13V23L20 28L12 23V13L20 8Z"
            fill="currentColor"
            className="text-primary-foreground/20"
          />
          <path
            d="M20 8L28 13V23L20 28L12 23V13L20 8Z"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary-foreground"
          />
          
          {/* Inner pulse circle */}
          <circle cx="20" cy="18" r="4" fill="currentColor" className="text-primary-foreground" />
          
          {/* Neural connection lines */}
          <path
            d="M20 14V6M26 16L34 12M26 20L34 24M14 16L6 12M14 20L6 24M20 22V30"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            className="text-primary-foreground/70"
          />
          
          {/* Outer nodes */}
          <circle cx="20" cy="6" r="2" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="34" cy="12" r="2" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="34" cy="24" r="2" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="6" cy="12" r="2" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="6" cy="24" r="2" fill="currentColor" className="text-primary-foreground/90" />
          <circle cx="20" cy="30" r="2" fill="currentColor" className="text-primary-foreground/90" />
        </svg>
      </div>
      
      {!iconOnly && (
        <span className={cn(
          'font-display font-bold tracking-tight',
          textSizes[size]
        )}>
          <span className="text-foreground">Syn</span>
          <span className="text-primary">apse</span>
        </span>
      )}
    </div>
  );
};
