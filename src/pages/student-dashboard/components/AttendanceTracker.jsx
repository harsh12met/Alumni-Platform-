import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AttendanceTracker = () => {
  const [selectedMonth, setSelectedMonth] = useState('current');
  
  const months = [
    { id: 'current', label: 'September 2025', active: true },
    { id: 'august', label: 'August 2025', active: false },
    { id: 'july', label: 'July 2025', active: false }
  ];

  const attendanceData = [
    {
      courseCode: 'CS301',
      courseName: 'Data Structures and Algorithms',
      instructor: 'Dr. Sarah Johnson',
      totalClasses: 28,
      attended: 26,
      percentage: 92.86,
      status: 'good',
      recentAttendance: [
        { date: '2025-09-20', status: 'present' },
        { date: '2025-09-18', status: 'present' },
        { date: '2025-09-16', status: 'absent' },
        { date: '2025-09-13', status: 'present' },
        { date: '2025-09-11', status: 'present' },
        { date: '2025-09-09', status: 'present' },
        { date: '2025-09-06', status: 'late' }
      ]
    },
    {
      courseCode: 'CS402',
      courseName: 'Database Management Systems',
      instructor: 'Prof. Michael Chen',
      totalClasses: 24,
      attended: 22,
      percentage: 91.67,
      status: 'good',
      recentAttendance: [
        { date: '2025-09-19', status: 'present' },
        { date: '2025-09-17', status: 'present' },
        { date: '2025-09-15', status: 'present' },
        { date: '2025-09-12', status: 'absent' },
        { date: '2025-09-10', status: 'present' },
        { date: '2025-09-08', status: 'present' },
        { date: '2025-09-05', status: 'present' }
      ]
    },
    {
      courseCode: 'CS501',
      courseName: 'Machine Learning',
      instructor: 'Dr. Emily Rodriguez',
      totalClasses: 20,
      attended: 16,
      percentage: 80.00,
      status: 'warning',
      recentAttendance: [
        { date: '2025-09-21', status: 'absent' },
        { date: '2025-09-19', status: 'present' },
        { date: '2025-09-17', status: 'absent' },
        { date: '2025-09-14', status: 'present' },
        { date: '2025-09-12', status: 'late' },
        { date: '2025-09-10', status: 'present' },
        { date: '2025-09-07', status: 'present' }
      ]
    },
    {
      courseCode: 'CS450',
      courseName: 'Software Engineering',
      instructor: 'Prof. David Kim',
      totalClasses: 26,
      attended: 18,
      percentage: 69.23,
      status: 'critical',
      recentAttendance: [
        { date: '2025-09-20', status: 'absent' },
        { date: '2025-09-18', status: 'absent' },
        { date: '2025-09-16', status: 'present' },
        { date: '2025-09-13', status: 'absent' },
        { date: '2025-09-11', status: 'present' },
        { date: '2025-09-09', status: 'late' },
        { date: '2025-09-06', status: 'present' }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'good': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPercentageColor = (percentage) => {
    if (percentage >= 85) return 'text-green-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getAttendanceIcon = (status) => {
    switch (status) {
      case 'present': return { icon: 'Check', color: 'text-green-600 bg-green-100' };
      case 'absent': return { icon: 'X', color: 'text-red-600 bg-red-100' };
      case 'late': return { icon: 'Clock', color: 'text-yellow-600 bg-yellow-100' };
      default: return { icon: 'Minus', color: 'text-gray-600 bg-gray-100' };
    }
  };

  const overallAttendance = (
    (attendanceData.reduce((sum, course) => sum + course.attended, 0) /
    attendanceData.reduce((sum, course) => sum + course.totalClasses, 0)) * 100
  ).toFixed(2);

  const criticalCourses = attendanceData.filter(course => course.percentage < 75).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center space-x-2">
            <Icon name="Clock" size={24} />
            <span>Attendance Tracker</span>
          </h1>
          <p className="text-muted-foreground mt-1">
            Monitor your class attendance and maintain good academic standing
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-card border border-border rounded-lg p-3">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Overall Attendance</p>
              <p className={`text-2xl font-bold ${getPercentageColor(overallAttendance)}`}>
                {overallAttendance}%
              </p>
            </div>
          </div>
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{attendanceData.length}</p>
              <p className="text-sm text-muted-foreground">Total Courses</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Icon name="Check" size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {attendanceData.reduce((sum, course) => sum + course.attended, 0)}
              </p>
              <p className="text-sm text-muted-foreground">Classes Attended</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon name="X" size={20} className="text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">
                {attendanceData.reduce((sum, course) => sum + (course.totalClasses - course.attended), 0)}
              </p>
              <p className="text-sm text-muted-foreground">Classes Missed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-card-foreground">{criticalCourses}</p>
              <p className="text-sm text-muted-foreground">Critical Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Month Selector */}
      <div className="bg-card border border-border rounded-lg p-4">
        <h3 className="font-semibold text-card-foreground mb-3">Select Month</h3>
        <div className="flex flex-wrap gap-2">
          {months.map((month) => (
            <Button
              key={month.id}
              variant={selectedMonth === month.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMonth(month.id)}
              className={selectedMonth === month.id 
                ? "bg-blue-600 hover:bg-blue-700 text-white" 
                : ""
              }
            >
              {month.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Course Attendance Details */}
      <div className="grid gap-6">
        {attendanceData.map((course) => (
          <div key={course.courseCode} className="bg-card border border-border rounded-lg p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {course.courseCode} - {course.courseName}
                </h3>
                <p className="text-sm text-muted-foreground">Instructor: {course.instructor}</p>
              </div>
              
              <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                <div className={`px-3 py-1 rounded-md border font-medium ${getStatusColor(course.status)}`}>
                  {course.status === 'good' && 'Good'}
                  {course.status === 'warning' && 'Warning'}
                  {course.status === 'critical' && 'Critical'}
                </div>
                <div className="text-right">
                  <p className={`text-2xl font-bold ${getPercentageColor(course.percentage)}`}>
                    {course.percentage.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {course.attended}/{course.totalClasses} classes
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Attendance */}
            <div className="space-y-3">
              <h4 className="font-medium text-card-foreground">Recent Attendance</h4>
              <div className="flex flex-wrap gap-2">
                {course.recentAttendance.map((day, index) => {
                  const { icon, color } = getAttendanceIcon(day.status);
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
                        <Icon name={icon} size={16} />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attendance Requirements */}
            {course.percentage < 75 && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-red-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Attendance Warning</p>
                    <p className="text-sm text-red-600">
                      You need to attend the next {Math.ceil((0.75 * course.totalClasses - course.attended) / 0.75)} 
                      classes to maintain 75% attendance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Attendance Tips */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center space-x-2">
          <Icon name="Lightbulb" size={20} />
          <span>Attendance Tips</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-card-foreground">
                Maintain at least 75% attendance to be eligible for exams
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-card-foreground">
                Notify instructors in advance for planned absences
              </p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-card-foreground">
                Medical certificates can help with attendance requirements
              </p>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p className="text-sm text-card-foreground">
                Regular attendance improves academic performance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;