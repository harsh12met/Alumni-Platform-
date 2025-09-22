import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import ModuleContainer from '../../../components/ui/ModuleContainer';

const StudentProgressSection = () => {
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const courses = [
    { value: 'all', label: 'All Courses' },
    { value: 'cs101', label: 'CS101 - Programming Fundamentals' },
    { value: 'cs201', label: 'CS201 - Data Structures' },
    { value: 'cs301', label: 'CS301 - Database Systems' },
    { value: 'cs401', label: 'CS401 - Software Engineering' }
  ];

  const semesters = [
    { value: 'current', label: 'Current Semester' },
    { value: 'fall2024', label: 'Fall 2024' },
    { value: 'spring2024', label: 'Spring 2024' }
  ];

  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      rollNumber: 'CS2021001',
      email: 'alice.johnson@university.edu',
      course: 'cs201',
      courseName: 'Data Structures',
      semester: 'current',
      overallGrade: 'A',
      attendance: 92,
      assignments: {
        submitted: 8,
        total: 10,
        avgScore: 87
      },
      exams: {
        midterm: 85,
        final: null,
        quizzes: 88
      },
      engagement: 'High',
      lastActivity: '2025-01-21',
      alerts: ['Assignment 9 overdue'],
      performance: 'excellent'
    },
    {
      id: 2,
      name: 'Bob Smith',
      rollNumber: 'CS2021002',
      email: 'bob.smith@university.edu',
      course: 'cs201',
      courseName: 'Data Structures',
      semester: 'current',
      overallGrade: 'B+',
      attendance: 78,
      assignments: {
        submitted: 7,
        total: 10,
        avgScore: 76
      },
      exams: {
        midterm: 72,
        final: null,
        quizzes: 79
      },
      engagement: 'Medium',
      lastActivity: '2025-01-20',
      alerts: ['Low attendance warning', 'Assignment 8 late submission'],
      performance: 'needs-attention'
    },
    {
      id: 3,
      name: 'Carol Davis',
      rollNumber: 'CS2021003',
      email: 'carol.davis@university.edu',
      course: 'cs301',
      courseName: 'Database Systems',
      semester: 'current',
      overallGrade: 'A-',
      attendance: 95,
      assignments: {
        submitted: 6,
        total: 6,
        avgScore: 91
      },
      exams: {
        midterm: 89,
        final: null,
        quizzes: 93
      },
      engagement: 'High',
      lastActivity: '2025-01-21',
      alerts: [],
      performance: 'excellent'
    },
    {
      id: 4,
      name: 'David Wilson',
      rollNumber: 'CS2021004',
      email: 'david.wilson@university.edu',
      course: 'cs101',
      courseName: 'Programming Fundamentals',
      semester: 'current',
      overallGrade: 'C+',
      attendance: 65,
      assignments: {
        submitted: 5,
        total: 8,
        avgScore: 68
      },
      exams: {
        midterm: 58,
        final: null,
        quizzes: 71
      },
      engagement: 'Low',
      lastActivity: '2025-01-18',
      alerts: ['Poor attendance', 'Multiple missing assignments', 'Below average performance'],
      performance: 'at-risk'
    }
  ];

  const filteredStudents = students?.filter(student => {
    const matchesCourse = selectedCourse === 'all' || student?.course === selectedCourse;
    const matchesSemester = selectedSemester === 'current' || student?.semester === selectedSemester;
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.rollNumber?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCourse && matchesSemester && matchesSearch;
  });

  const getPerformanceColor = (performance) => {
    const colorMap = {
      'excellent': 'text-green-600',
      'good': 'text-blue-600',
      'needs-attention': 'text-yellow-600',
      'at-risk': 'text-red-600'
    };
    return colorMap?.[performance] || 'text-gray-600';
  };

  const getPerformanceBadgeColor = (performance) => {
    const colorMap = {
      'excellent': 'bg-green-100 text-green-800',
      'good': 'bg-blue-100 text-blue-800',
      'needs-attention': 'bg-yellow-100 text-yellow-800',
      'at-risk': 'bg-red-100 text-red-800'
    };
    return colorMap?.[performance] || 'bg-gray-100 text-gray-800';
  };

  const getEngagementIcon = (engagement) => {
    const iconMap = {
      'High': 'TrendingUp',
      'Medium': 'Minus',
      'Low': 'TrendingDown'
    };
    return iconMap?.[engagement] || 'Minus';
  };

  const getGradeColor = (grade) => {
    if (grade?.startsWith('A')) return 'text-green-600';
    if (grade?.startsWith('B')) return 'text-blue-600';
    if (grade?.startsWith('C')) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <ModuleContainer
      title="Student Progress"
      description="Monitor academic performance and engagement metrics"
      icon="TrendingUp"
      actions={
        <Button variant="outline" iconName="Download" iconPosition="left" className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium">
          Export Report
        </Button>
      }
    >
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Search by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
        />
        <Select
          options={courses}
          value={selectedCourse}
          onChange={setSelectedCourse}
          placeholder="Filter by course"
        />
        <Select
          options={semesters}
          value={selectedSemester}
          onChange={setSelectedSemester}
          placeholder="Select semester"
        />
      </div>
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-card-foreground mb-1">
            {filteredStudents?.length}
          </div>
          <div className="text-sm text-muted-foreground">Total Students</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {filteredStudents?.filter(s => s?.performance === 'excellent')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Excellent</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600 mb-1">
            {filteredStudents?.filter(s => s?.performance === 'needs-attention')?.length}
          </div>
          <div className="text-sm text-muted-foreground">Need Attention</div>
        </div>
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600 mb-1">
            {filteredStudents?.filter(s => s?.performance === 'at-risk')?.length}
          </div>
          <div className="text-sm text-muted-foreground">At Risk</div>
        </div>
      </div>
      {/* Students List */}
      <div className="space-y-4">
        {filteredStudents?.map((student) => (
          <div key={student?.id} className="bg-muted/30 rounded-lg p-6 hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                  <Icon name="User" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-card-foreground">{student?.name}</h4>
                  <p className="text-sm text-muted-foreground">{student?.rollNumber} • {student?.courseName}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className={`text-lg font-bold ${getGradeColor(student?.overallGrade)}`}>
                      {student?.overallGrade}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPerformanceBadgeColor(student?.performance)}`}>
                      {student?.performance?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedStudent(student)}
                  iconName="Eye"
                  iconPosition="left"
                  className="bg-blue-50 hover:bg-blue-100 border-blue-200 text-blue-700 font-medium"
                >
                  View Details
                </Button>
                <Button variant="ghost" size="icon" className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                  <Icon name="MoreVertical" size={16} />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="Calendar" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Attendance</span>
                </div>
                <p className="text-lg font-semibold">{student?.attendance}%</p>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${student?.attendance >= 80 ? 'bg-green-500' : student?.attendance >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${student?.attendance}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="FileText" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Assignments</span>
                </div>
                <p className="text-lg font-semibold">{student?.assignments?.submitted}/{student?.assignments?.total}</p>
                <p className="text-sm text-muted-foreground">Avg: {student?.assignments?.avgScore}%</p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name="BookOpen" size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Exams</span>
                </div>
                <p className="text-sm">Midterm: {student?.exams?.midterm}%</p>
                <p className="text-sm">Quizzes: {student?.exams?.quizzes}%</p>
              </div>

              <div className="bg-background rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-1">
                  <Icon name={getEngagementIcon(student?.engagement)} size={16} color="var(--color-primary)" />
                  <span className="text-sm font-medium">Engagement</span>
                </div>
                <p className="text-sm font-medium">{student?.engagement}</p>
                <p className="text-xs text-muted-foreground">Last: {new Date(student.lastActivity)?.toLocaleDateString()}</p>
              </div>
            </div>

            {student?.alerts?.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} color="#dc2626" />
                  <span className="text-sm font-medium text-red-800">Alerts</span>
                </div>
                <div className="space-y-1">
                  {student?.alerts?.map((alert, index) => (
                    <p key={index} className="text-sm text-red-700">• {alert}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {filteredStudents?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No students found matching your criteria</p>
        </div>
      )}
      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-1003">
          <div className="bg-card rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold">{selectedStudent?.name}</h3>
                <p className="text-muted-foreground">{selectedStudent?.rollNumber} • {selectedStudent?.courseName}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedStudent(null)}
                className="bg-gray-50 hover:bg-gray-100 text-gray-700"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Academic Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Overall Grade:</span>
                      <span className={`font-semibold ${getGradeColor(selectedStudent?.overallGrade)}`}>
                        {selectedStudent?.overallGrade}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Attendance:</span>
                      <span className="font-semibold">{selectedStudent?.attendance}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assignment Average:</span>
                      <span className="font-semibold">{selectedStudent?.assignments?.avgScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Midterm Score:</span>
                      <span className="font-semibold">{selectedStudent?.exams?.midterm}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quiz Average:</span>
                      <span className="font-semibold">{selectedStudent?.exams?.quizzes}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Contact Information</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Email:</span> {selectedStudent?.email}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Last Activity:</span> {new Date(selectedStudent.lastActivity)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Assignment Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Submitted:</span>
                      <span>{selectedStudent?.assignments?.submitted}/{selectedStudent?.assignments?.total}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full" 
                        style={{ width: `${(selectedStudent?.assignments?.submitted / selectedStudent?.assignments?.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {selectedStudent?.alerts?.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-3">Active Alerts</h4>
                    <div className="space-y-2">
                      {selectedStudent?.alerts?.map((alert, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Icon name="AlertTriangle" size={16} color="#dc2626" className="mt-0.5" />
                          <p className="text-sm text-red-700">{alert}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button variant="default" iconName="Mail" iconPosition="left" fullWidth className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 font-medium">
                    Send Message
                  </Button>
                  <Button variant="outline" iconName="Phone" iconPosition="left" fullWidth className="bg-green-50 hover:bg-green-100 border-green-200 text-green-700 font-medium">
                    Schedule Meeting
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModuleContainer>
  );
};

export default StudentProgressSection;