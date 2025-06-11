import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'primary', 
  className = '' 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4'
  };

  // Color classes
  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-secondary-200 border-t-secondary-600',
    success: 'border-green-200 border-t-green-600',
    danger: 'border-red-200 border-t-red-600',
    warning: 'border-yellow-200 border-t-yellow-600',
    info: 'border-blue-200 border-t-blue-600'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div 
        className={`
          ${sizeClasses[size]} 
          ${colorClasses[color as keyof typeof colorClasses] || colorClasses.primary}
          rounded-full animate-spin
          ${className}
        `}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
};

export default LoadingSpinner;
