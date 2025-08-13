import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '../components/ui/card';
import { ChevronRight, Brain, Target, MessageSquare, Book, Star, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentCard = ({ student }) => {
    const navigate=useNavigate()
  const strengthsData = student.keyStrengthsAndGrowthAreas;
  const handleCardClick = () => {
    navigate(`/details/${student.id}`);
  };
  // Helper function to get color based on score
  const getScoreColor = (score) => {
    const value = parseInt(score);
    if (value >= 80) return { text: 'text-green-600', bg: 'bg-green-100' };
    if (value >= 70) return { text: 'text-blue-600', bg: 'bg-blue-100' };
    if (value >= 60) return { text: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { text: 'text-red-600', bg: 'bg-red-100' };
  };

  // Quick stats to display
  const quickStats = [
    {
      icon: Target,
      label: 'Overall Score',
      value: student.overallScore,
      ...getScoreColor(student.overallScore)
    },
    {
      icon: Book,
      label: 'Grade',
      value: student.grade,
      text: 'text-purple-600',
      bg: 'bg-purple-100'
    },
    {
      icon: Brain,
      label: 'Concept',
      value: strengthsData.conceptAwareness?.score || 'N/A',
      ...getScoreColor(strengthsData.conceptAwareness?.score || '0%')
    }
  ];

  return (
    <div onClick={handleCardClick}>
    <Card className="w-full transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer bg-white">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{student.studentName}</h2>
            <p className="text-sm text-gray-600">Science Assessment</p>
          </div>
          <div className={`px-3 py-1 rounded-full ${getScoreColor(student.overallScore).bg}`}>
            <span className={`font-bold ${getScoreColor(student.overallScore).text}`}>
              {student.overallScore}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <div className="grid grid-cols-3 gap-3 mb-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className={`p-3 rounded-lg ${stat.bg}`}>
                <Icon className={`w-5 h-5 ${stat.text} mb-2`} />
                <div className="text-xs text-gray-600">{stat.label}</div>
                <div className={`font-bold ${stat.text}`}>{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="text-sm text-gray-600 line-clamp-2">
            {student.personalizedNarrative.substring(0, 100)}...
          </div>
          
          <div className="flex items-center justify-between mt-4 pt-3 border-t">
            <div className="text-sm text-blue-600 font-medium">View Full Assessment</div>
            <ChevronRight className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </CardContent>
    </Card>
    </div>
  );
};

const StudentDashboard = ({students}) => {
  

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Assessments</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students ?students.map((student) => (
            <StudentCard key={student.id} student={student} />
          )):<div>loading</div>}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;