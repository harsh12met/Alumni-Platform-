import React from 'react';
import { cn } from '../../utils/cn';
import Button from './Button';

const EmptyState = ({
  illustration = 'empty-state',
  title = 'No Data Found',
  description = "There's nothing to show here yet",
  actionLabel,
  onAction,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'max-w-xs',
      image: 'w-32 h-24',
      title: 'text-lg',
      description: 'text-sm'
    },
    md: {
      container: 'max-w-md',
      image: 'w-48 h-36',
      title: 'text-xl',
      description: 'text-base'
    },
    lg: {
      container: 'max-w-lg',
      image: 'w-64 h-48',
      title: 'text-2xl',
      description: 'text-lg'
    }
  };

  const sizes = sizeClasses[size];

  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-12', sizes.container, className)}>
      <div className="flex justify-center mb-6">
        <img 
          src={`/assets/images/illustrations/${illustration}.svg`}
          alt={title}
          className={cn('object-contain', sizes.image)}
        />
      </div>
      
      <h3 className={cn('font-semibold text-foreground mb-2', sizes.title)}>
        {title}
      </h3>
      
      <p className={cn('text-muted-foreground mb-6', sizes.description)}>
        {description}
      </p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;