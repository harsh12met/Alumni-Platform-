import React from 'react';
import { cn } from '../../utils/cn';

const Loading = ({
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4',
      text: 'text-sm'
    },
    md: {
      spinner: 'w-8 h-8',
      text: 'text-base'
    },
    lg: {
      spinner: 'w-12 h-12',
      text: 'text-lg'
    }
  };

  const sizes = sizeClasses[size];

  const LoadingSpinner = () => (
    <div className="relative">
      <div className={cn(
        'border-4 border-gray-200 border-t-primary rounded-full animate-spin',
        sizes.spinner
      )}></div>
    </div>
  );

  const LoadingIllustration = () => (
    <img 
      src="/assets/images/illustrations/loading-state.svg"
      alt="Loading..."
      className="w-64 h-48 object-contain"
    />
  );

  const content = (
    <div className={cn(
      'flex flex-col items-center justify-center text-center',
      fullScreen ? 'min-h-screen' : 'py-12',
      className
    )}>
      {fullScreen ? <LoadingIllustration /> : <LoadingSpinner />}
      
      {text && (
        <p className={cn(
          'text-muted-foreground mt-4 font-medium',
          sizes.text
        )}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;