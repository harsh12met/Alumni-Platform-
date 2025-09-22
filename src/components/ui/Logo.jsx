import React from 'react';
import { cn } from '../../utils/cn';

const Logo = ({ 
  variant = 'full', // 'full', 'icon', 'text'
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    xs: 'h-6',
    sm: 'h-8', 
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
    '2xl': 'h-20'
  };

  const textSizeClasses = {
    xs: 'text-sm',
    sm: 'text-base', 
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl'
  };

  if (variant === 'icon') {
    return (
      <div 
        className={cn(
          'flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600',
          sizeClasses[size],
          'aspect-square',
          className
        )}
        {...props}
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-3/5 h-3/5 text-white"
          fill="currentColor"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
    );
  }

  if (variant === 'text') {
    return (
      <span 
        className={cn(
          'font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
          textSizeClasses[size],
          className
        )}
        {...props}
      >
        EduConnect
      </span>
    );
  }

  return (
    <div className={cn('flex items-center gap-2', className)} {...props}>
      <div 
        className={cn(
          'flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600',
          sizeClasses[size],
          'aspect-square'
        )}
      >
        <svg 
          viewBox="0 0 24 24" 
          className="w-3/5 h-3/5 text-white"
          fill="currentColor"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>
      <span 
        className={cn(
          'font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent',
          textSizeClasses[size]
        )}
      >
        EduConnect
      </span>
    </div>
  );
};

export default Logo;