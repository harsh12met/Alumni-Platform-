import React from 'react';
import Icon from '../AppIcon';

const ModuleContainer = ({ 
  title, 
  description, 
  icon, 
  children, 
  actions,
  className = '',
  headerClassName = '',
  contentClassName = '',
  size = 'default' // 'sm', 'default', 'lg', 'xl'
}) => {
  const sizeClasses = {
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10'
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-sm ${sizeClasses?.[size]} ${className}`}>
      {/* Module Header */}
      {(title || icon || actions) && (
        <div className={`flex items-center justify-between mb-6 ${headerClassName}`}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name={icon} size={20} color="var(--color-primary)" />
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-card-foreground">{title}</h3>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-1">{description}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex items-center space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      {/* Module Content */}
      <div className={contentClassName}>
        {children}
      </div>
    </div>
  );
};

// Specialized Module Components
export const StatsModule = ({ stats, className = '' }) => {
  return (
    <ModuleContainer className={className} title="" description="" icon="" actions={null}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
              <Icon name={stat?.icon} size={24} color="var(--color-primary)" />
            </div>
            <div className="text-2xl font-bold text-card-foreground mb-1">
              {stat?.value}
            </div>
            <div className="text-sm text-muted-foreground">
              {stat?.label}
            </div>
            {stat?.change && (
              <div className={`text-xs mt-1 flex items-center justify-center space-x-1 ${
                stat?.change?.type === 'increase' ? 'text-success' : 'text-error'
              }`}>
                <Icon 
                  name={stat?.change?.type === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                  size={12} 
                />
                <span>{stat?.change?.value}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </ModuleContainer>
  );
};

export const ListModule = ({ 
  title, 
  description, 
  icon, 
  items, 
  actions,
  emptyState,
  className = '' 
}) => {
  return (
    <ModuleContainer 
      title={title} 
      description={description} 
      icon={icon} 
      actions={actions}
      className={className}
    >
      {items && items?.length > 0 ? (
        <div className="space-y-3">
          {items?.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="flex items-center space-x-3">
                {item?.icon && (
                  <div className="flex items-center justify-center w-8 h-8 bg-background rounded-full">
                    <Icon name={item?.icon} size={16} />
                  </div>
                )}
                <div>
                  <h4 className="font-medium text-card-foreground">{item?.title}</h4>
                  {item?.subtitle && (
                    <p className="text-sm text-muted-foreground">{item?.subtitle}</p>
                  )}
                </div>
              </div>
              {item?.actions && (
                <div className="flex items-center space-x-2">
                  {item?.actions}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          {emptyState ? emptyState : (
            <div>
              <Icon name="Inbox" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No items to display</p>
            </div>
          )}
        </div>
      )}
    </ModuleContainer>
  );
};

export const ChartModule = ({ 
  title, 
  description, 
  icon, 
  children, 
  actions,
  className = '' 
}) => {
  return (
    <ModuleContainer 
      title={title} 
      description={description} 
      icon={icon} 
      actions={actions}
      className={className}
      size="lg"
    >
      <div className="h-64 flex items-center justify-center bg-muted/30 rounded-lg">
        {children || (
          <div className="text-center">
            <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Chart visualization will appear here</p>
          </div>
        )}
      </div>
    </ModuleContainer>
  );
};

export const FormModule = ({ 
  title, 
  description, 
  icon, 
  children, 
  onSubmit,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  onCancel,
  className = '' 
}) => {
  return (
    <ModuleContainer 
      title={title} 
      description={description} 
      icon={icon} 
      className={className}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        <div className="flex items-center justify-end space-x-3 pt-6 border-t border-border">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-card-foreground transition-colors"
            >
              {cancelLabel}
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </ModuleContainer>
  );
};

export default ModuleContainer;