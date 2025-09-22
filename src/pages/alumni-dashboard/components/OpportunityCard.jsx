import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpportunityCard = ({ opportunity, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'job': return 'Briefcase';
      case 'internship': return 'GraduationCap';
      case 'freelance': return 'Laptop';
      default: return 'Briefcase';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'job': return 'text-blue-600 bg-blue-50';
      case 'internship': return 'text-green-600 bg-green-50';
      case 'freelance': return 'text-purple-600 bg-purple-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatSalary = (min, max, currency = 'USD') => {
    if (!min && !max) return 'Salary not disclosed';
    if (min && max) return `$${min?.toLocaleString()} - $${max?.toLocaleString()}`;
    if (min) return `$${min?.toLocaleString()}+`;
    return `Up to $${max?.toLocaleString()}`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow w-full overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className={`p-2 rounded-lg flex-shrink-0 ${getTypeColor(opportunity?.type)}`}>
            <Icon name={getTypeIcon(opportunity?.type)} size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-card-foreground truncate">{opportunity?.title}</h3>
            <p className="text-muted-foreground truncate">{opportunity?.company}</p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1 min-w-0">
                <Icon name="MapPin" size={14} className="flex-shrink-0" />
                <span className="truncate">{opportunity?.location}</span>
              </div>
              <div className="flex items-center space-x-1 min-w-0">
                <Icon name="Clock" size={14} className="flex-shrink-0" />
                <span className="truncate">{opportunity?.workType}</span>
              </div>
              <div className="flex items-center space-x-1 min-w-0">
                <Icon name="Calendar" size={14} className="flex-shrink-0" />
                <span className="truncate">Posted {opportunity?.postedDate}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(opportunity?.id)}
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(opportunity?.id)}
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity?.type)}`}>
            {opportunity?.type?.charAt(0)?.toUpperCase() + opportunity?.type?.slice(1)}
          </span>
          <span className="text-sm font-medium text-card-foreground">
            {formatSalary(opportunity?.salaryMin, opportunity?.salaryMax)}
          </span>
        </div>

        <p className="text-muted-foreground text-sm">
          {isExpanded ? opportunity?.description : `${opportunity?.description?.substring(0, 150)}...`}
        </p>

        {opportunity?.description?.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary text-sm hover:underline"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}

        {opportunity?.requirements && (
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-2">Key Requirements:</h4>
            <div className="flex flex-wrap gap-2">
              {opportunity?.requirements?.slice(0, isExpanded ? undefined : 3)?.map((req, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {req}
                </span>
              ))}
              {!isExpanded && opportunity?.requirements?.length > 3 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  +{opportunity?.requirements?.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Eye" size={14} />
              <span>{opportunity?.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{opportunity?.applications} applications</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button variant="outline" size="sm" className="bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700 font-medium">
              Share
            </Button>
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityCard;