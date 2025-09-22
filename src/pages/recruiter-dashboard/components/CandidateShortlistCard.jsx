import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const CandidateShortlistCard = () => {
  const [selectedCandidates, setSelectedCandidates] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  const shortlistedCandidates = [
    {
      id: 1,
      name: "Alex Chen",
      position: "Senior Software Engineer",
      email: "alex.chen@email.com",
      phone: "+1 (555) 123-4567",
      experience: "5 years",
      rating: 4.8,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      skills: ["React", "Node.js", "Python", "AWS"],
      education: "MS Computer Science - Stanford University",
      location: "San Francisco, CA",
      salary: "$120,000",
      availability: "2 weeks notice",
      notes: "Excellent technical skills and communication. Strong cultural fit.",
      interviewDate: "2025-01-25",
      status: "Interview Scheduled"
    },
    {
      id: 2,
      name: "Maria Garcia",
      position: "Product Manager",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 234-5678",
      experience: "7 years",
      rating: 4.6,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      skills: ["Product Strategy", "Agile", "Analytics", "Leadership"],
      education: "MBA - Harvard Business School",
      location: "Boston, MA",
      salary: "$140,000",
      availability: "1 month notice",
      notes: "Strong leadership experience and strategic thinking. Great portfolio.",
      interviewDate: "2025-01-24",
      status: "Final Round"
    },
    {
      id: 3,
      name: "David Kim",
      position: "Data Science Intern",
      email: "david.kim@email.com",
      phone: "+1 (555) 345-6789",
      experience: "1 year",
      rating: 4.4,
      avatar: "https://randomuser.me/api/portraits/men/56.jpg",
      skills: ["Python", "Machine Learning", "SQL", "Tableau"],
      education: "BS Data Science - UC Berkeley",
      location: "Berkeley, CA",
      salary: "$25/hour",
      availability: "Immediate",
      notes: "Promising intern candidate with strong academic background.",
      interviewDate: "2025-01-23",
      status: "Offer Extended"
    }
  ];

  const handleSelectCandidate = (candidateId) => {
    setSelectedCandidates(prev => 
      prev?.includes(candidateId) 
        ? prev?.filter(id => id !== candidateId)
        : [...prev, candidateId]
    );
  };

  const handleRatingChange = (candidateId, newRating) => {
    console.log(`Rating changed for candidate ${candidateId}: ${newRating}`);
  };

  const handleStatusChange = (candidateId, newStatus) => {
    console.log(`Status changed for candidate ${candidateId}: ${newStatus}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Interview Scheduled': return 'text-primary bg-primary/10';
      case 'Final Round': return 'text-warning bg-warning/10';
      case 'Offer Extended': return 'text-success bg-success/10';
      case 'Hired': return 'text-success bg-success/20';
      case 'Declined': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const renderStarRating = (rating, candidateId) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(candidateId, star)}
            className="focus:outline-none"
          >
            <Icon
              name="Star"
              size={16}
              className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
            />
          </button>
        ))}
        <span className="text-sm text-muted-foreground ml-2">{rating}/5</span>
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-6 h-6 bg-primary/10 rounded-lg">
            <Icon name="Star" size={14} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-card-foreground">Candidate Shortlist</h3>
            <p className="text-xs text-muted-foreground">Manage candidates</p>
          </div>
        </div>
        <Button
          variant="default"
          size="sm"
          iconName="UserPlus"
          iconPosition="left"
          iconSize={12}
          className="text-xs px-2 py-1"
        >
          Add
        </Button>
      </div>
      {showComparison && selectedCandidates?.length > 1 && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-card-foreground">Candidate Comparison</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComparison(false)}
              iconName="X"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shortlistedCandidates?.filter(candidate => selectedCandidates?.includes(candidate?.id))?.map((candidate) => (
                <div key={candidate?.id} className="p-3 bg-background rounded-lg border border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={candidate?.avatar}
                      alt={candidate?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h5 className="font-medium text-card-foreground">{candidate?.name}</h5>
                      <p className="text-xs text-muted-foreground">{candidate?.position}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience:</span>
                      <span className="text-card-foreground">{candidate?.experience}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating:</span>
                      <span className="text-card-foreground">{candidate?.rating}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Salary:</span>
                      <span className="text-card-foreground">{candidate?.salary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Availability:</span>
                      <span className="text-card-foreground">{candidate?.availability}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="space-y-3">
        {shortlistedCandidates?.map((candidate) => (
          <div key={candidate?.id} className="p-3 bg-muted/30 rounded-lg border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={selectedCandidates?.includes(candidate?.id)}
                onChange={() => handleSelectCandidate(candidate?.id)}
                className="w-3 h-3 text-primary bg-background border-border rounded focus:ring-primary focus:ring-1 mt-1"
              />
              <Image
                src={candidate?.avatar}
                alt={candidate?.name}
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-medium text-card-foreground truncate">{candidate?.name}</h4>
                    <p className="text-xs text-muted-foreground truncate">{candidate?.position}</p>
                  </div>
                  <span className={`px-1 py-0.5 rounded text-xs font-medium ${getStatusColor(candidate?.status)} flex-shrink-0 ml-1`}>
                    {candidate?.status === 'Interview Scheduled' ? 'Interview' : 
                     candidate?.status === 'Final Round' ? 'Final' : 
                     candidate?.status}
                  </span>
                </div>

                <div className="space-y-1 mb-2">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="Mail" size={10} className="flex-shrink-0" />
                    <span className="truncate">{candidate?.email}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={10} className="flex-shrink-0" />
                    <span className="truncate">{candidate?.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="Briefcase" size={10} />
                      <span>{candidate?.experience}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="DollarSign" size={10} />
                      <span>{candidate?.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-muted-foreground">Rating:</p>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5]?.slice(0, Math.floor(candidate?.rating))?.map((star) => (
                        <Icon key={star} name="Star" size={10} className="text-yellow-400 fill-current" />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">{candidate?.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {candidate?.skills?.slice(0, 3)?.map((skill, index) => (
                      <span key={index} className="px-1 py-0.5 bg-primary/10 text-primary text-xs rounded">
                        {skill}
                      </span>
                    ))}
                    {candidate?.skills?.length > 3 && (
                      <span className="text-xs text-muted-foreground">+{candidate?.skills?.length - 3}</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{candidate?.notes}</p>
                </div>

                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="FileText"
                      iconPosition="left"
                      iconSize={10}
                      className="text-xs px-2 py-1 flex-1"
                    >
                      Profile
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="MessageSquare"
                      iconPosition="left"
                      iconSize={10}
                      className="text-xs px-2 py-1 flex-1"
                    >
                      Message
                    </Button>
                  </div>
                  {candidate?.interviewDate && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="Calendar"
                      iconPosition="left"
                      iconSize={10}
                      className="text-xs px-2 py-1 w-full"
                    >
                      Interview: {new Date(candidate.interviewDate)?.toLocaleDateString()}
                    </Button>
                  )}
                  <div className="flex items-center space-x-1">
                    {candidate?.status === 'Interview Scheduled' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusChange(candidate?.id, 'Final Round')}
                        iconName="ArrowRight"
                        iconPosition="right"
                        iconSize={10}
                        className="text-xs px-2 py-1 flex-1"
                      >
                        Move to Final
                      </Button>
                    )}
                    {candidate?.status === 'Final Round' && (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleStatusChange(candidate?.id, 'Offer Extended')}
                        iconName="Check"
                        iconPosition="left"
                        iconSize={10}
                        className="text-xs px-2 py-1 flex-1 bg-success hover:bg-success/90"
                      >
                        Extend Offer
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {shortlistedCandidates?.length === 0 && (
        <div className="text-center py-6">
          <Icon name="Star" size={32} className="mx-auto text-muted-foreground mb-3" />
          <p className="text-sm text-muted-foreground">No candidates shortlisted yet</p>
          <Button variant="outline" size="sm" className="mt-3 text-xs">
            Browse Applications
          </Button>
        </div>
      )}
    </div>
  );
};

export default CandidateShortlistCard;