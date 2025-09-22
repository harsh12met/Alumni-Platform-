import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GradesResults = () => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  
  const semesters = [
    { id: 'current', label: 'Current Semester (Fall 2025)', active: true },
    { id: 'spring2025', label: 'Spring 2025', active: false },
    { id: 'fall2024', label: 'Fall 2024', active: false },
    { id: 'spring2024', label: 'Spring 2024', active: false }
  ];

  const currentGrades = [
    {
      courseCode: 'CS301',
      courseName: 'Data Structures and Algorithms',
      credits: 4,
      assignments: [
        { name: 'Assignment 1', score: 18, total: 20, percentage: 90 },
        { name: 'Assignment 2', score: 16, total: 20, percentage: 80 },
        { name: 'Mid-term Project', score: 45, total: 50, percentage: 90 }
      ],
      midterm: { score: 42, total: 50, percentage: 84 },
      final: { status: 'upcoming', date: 'Dec 15, 2025' },
      currentGrade: 'A-',
      gpa: 3.7
    },
    {
      courseCode: 'CS402',
      courseName: 'Database Management Systems',
      credits: 3,
      assignments: [
        { name: 'Lab 1', score: 19, total: 20, percentage: 95 },
        { name: 'Lab 2', score: 17, total: 20, percentage: 85 },
        { name: 'Project Phase 1', score: 47, total: 50, percentage: 94 }
      ],
      midterm: { score: 38, total: 45, percentage: 84 },
      final: { status: 'upcoming', date: 'Dec 18, 2025' },
      currentGrade: 'A',
      gpa: 4.0
    },
    {
      courseCode: 'CS501',
      courseName: 'Machine Learning',
      credits: 4,
      assignments: [
        { name: 'Programming Assignment 1', score: 22, total: 25, percentage: 88 },
        { name: 'Research Paper Review', score: 14, total: 15, percentage: 93 }
      ],
      midterm: { score: 40, total: 50, percentage: 80 },
      final: { status: 'upcoming', date: 'Dec 20, 2025' },
      currentGrade: 'B+',
      gpa: 3.3
    },
    {
      courseCode: 'CS450',
      courseName: 'Software Engineering',
      credits: 3,
      assignments: [
        { name: 'Team Project Phase 1', score: 23, total: 25, percentage: 92 },
        { name: 'Individual Assignment', score: 18, total: 20, percentage: 90 }
      ],
      midterm: { score: 44, total: 50, percentage: 88 },
      final: { status: 'upcoming', date: 'Dec 22, 2025' },
      currentGrade: 'A-',
      gpa: 3.7
    }
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': case 'A+': return 'text-green-600 bg-green-50';
      case 'A-': return 'text-green-500 bg-green-50';
      case 'B+': case 'B': return 'text-blue-600 bg-blue-50';
      case 'B-': return 'text-blue-500 bg-blue-50';
      case 'C+': case 'C': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 80) return 'text-blue-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const overallGPA = (currentGrades.reduce((sum, course) => sum + course.gpa * course.credits, 0) / 
                     currentGrades.reduce((sum, course) => sum + course.credits, 0)).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Icon name="FileText" size={24} />
            <span>Grades & Results</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Track your academic performance and exam results
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Current GPA</p>
              <p className="text-2xl font-bold text-blue-600">{overallGPA}</p>
            </div>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Download Transcript
          </Button>
        </div>
      </div>

      {/* Semester Selector */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-card-foreground mb-3">Select Semester</h3>
        <div className="flex flex-wrap gap-2">
          {semesters.map((semester) => (
            <Button
              key={semester.id}
              variant={selectedSemester === semester.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSemester(semester.id)}
              className={selectedSemester === semester.id 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : ""
              }
            >
              {semester.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Course Grades */}
      <div className="grid gap-6">
        {currentGrades.map((course) => (
          <div key={course.courseCode} className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">
                  {course.courseCode} - {course.courseName}
                </h3>
                <p className="text-sm text-muted-foreground">{course.credits} Credits</p>
              </div>
              <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                <div className={`px-3 py-1 rounded-md font-medium ${getGradeColor(course.currentGrade)}`}>
                  {course.currentGrade}
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">GPA Points</p>
                  <p className="font-semibold text-card-foreground">{course.gpa}</p>
                </div>
              </div>
            </div>

            {/* Assignments */}
            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground">Assignments & Projects</h4>
              <div className="grid gap-2">
                {course.assignments.map((assignment, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <h5 className="font-medium text-card-foreground text-sm">{assignment.name}</h5>
                      <p className="text-xs text-muted-foreground">
                        {assignment.score}/{assignment.total} points
                      </p>
                    </div>
                    <div className={`font-semibold ${getPercentageColor(assignment.percentage)}`}>
                      {assignment.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exams */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-card-foreground text-sm mb-1">Midterm Exam</h5>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {course.midterm.score}/{course.midterm.total} points
                  </p>
                  <span className={`font-semibold ${getPercentageColor(course.midterm.percentage)}`}>
                    {course.midterm.percentage}%
                  </span>
                </div>
              </div>
              
              <div className="p-3 bg-muted/30 rounded-lg">
                <h5 className="font-medium text-card-foreground text-sm mb-1">Final Exam</h5>
                <div className="flex items-center justify-between">
                  {course.final.status === 'upcoming' ? (
                    <>
                      <p className="text-xs text-muted-foreground">Scheduled</p>
                      <span className="text-sm font-medium text-orange-600">{course.final.date}</span>
                    </>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground">
                        {course.final.score}/{course.final.total} points
                      </p>
                      <span className={`font-semibold ${getPercentageColor(course.final.percentage)}`}>
                        {course.final.percentage}%
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center space-x-2">
          <Icon name="BarChart3" size={20} />
          <span>Academic Summary</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">{overallGPA}</p>
            <p className="text-sm text-blue-700">Current GPA</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">
              {currentGrades.reduce((sum, course) => sum + course.credits, 0)}
            </p>
            <p className="text-sm text-green-700">Total Credits</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold text-purple-600">{currentGrades.length}</p>
            <p className="text-sm text-purple-700">Courses</p>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <p className="text-2xl font-bold text-orange-600">85%</p>
            <p className="text-sm text-orange-700">Avg Performance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradesResults;