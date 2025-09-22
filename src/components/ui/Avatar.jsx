import React from 'react';
import { cn } from '../../utils/cn';

const Avatar = React.forwardRef(({ 
  className, 
  src, 
  alt, 
  size = 'md',
  fallback,
  name,
  ...props 
}, ref) => {
  const sizeClasses = {
    xs: 'h-6 w-6 text-xs',
    sm: 'h-8 w-8 text-sm', 
    md: 'h-10 w-10 text-base',
    lg: 'h-12 w-12 text-lg',
    xl: 'h-16 w-16 text-xl',
    '2xl': 'h-20 w-20 text-2xl'
  };

  // Generate initials from name
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent color based on name
  const getAvatarColor = (name) => {
    if (!name) return 'bg-gray-500';
    
    const colors = [
      'bg-red-500', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500',
      'bg-lime-500', 'bg-green-500', 'bg-emerald-500', 'bg-teal-500',
      'bg-cyan-500', 'bg-sky-500', 'bg-blue-500', 'bg-indigo-500',
      'bg-violet-500', 'bg-purple-500', 'bg-fuchsia-500', 'bg-pink-500',
      'bg-rose-500'
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  if (src && !imageError) {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt || name || 'Avatar'}
        className={cn(
          'rounded-full object-cover border-2 border-white shadow-sm',
          sizeClasses[size],
          className
        )}
        onError={handleImageError}
        {...props}
      />
    );
  }

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-full flex items-center justify-center text-white font-medium border-2 border-white shadow-sm',
        sizeClasses[size],
        getAvatarColor(name || fallback),
        className
      )}
      {...props}
    >
      {fallback || getInitials(name)}
    </div>
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;