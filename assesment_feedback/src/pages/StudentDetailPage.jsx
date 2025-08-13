import React, { useContext, useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { ChevronDown, Book, Brain, Target, User, MessageSquare, Star } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { StudentContext } from '../context/Context.jsx';

const StudentDetailPage = () => {
  const {studentsDatas,loading}=useContext(StudentContext)
  const { id } = useParams(); // Get the ID from URL
  const student = !loading && studentsDatas.find((s) => s.id === id);
  const studentData = student
  const [activeTab, setActiveTab] = useState('strengths');
  const [expandedArea, setExpandedArea] = useState(null);

  
  const getIcon = (area) => {
    const iconMap = {
      'Concept Awareness': Book,
      'Application & Real-World Connection': Brain,
      'Accuracy & Precision': Target,
      'Clarity of Thought & Expression': MessageSquare,
      'Curiosity & Engagement': Star,
      'Growth Mindset': User
    };
    return iconMap[area] || Star;
  };

  const getScoreColor = (score) => {
    const value = parseInt(score);
    if (value >= 80) return 'bg-green-500';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const renderStrengthsSection = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(studentData.keyStrengthsAndGrowthAreas).map(([area, data]) => {
        const Icon = getIcon(area);
        return (
          <div
            key={area}
            className={`
              rounded-xl p-4 bg-white shadow-lg transform transition-all duration-300 cursor-pointer
              hover:scale-105 hover:shadow-xl
              ${expandedArea === area ? 'col-span-2' : ''}
            `}
            onClick={() => setExpandedArea(expandedArea === area ? null : area)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-blue-500" />
                <h3 className="font-semibold text-gray-800">{area}</h3>
              </div>
              <div className={`px-3 py-1 rounded-full text-white ${getScoreColor(data.score)}`}>
                {data.score}
              </div>
            </div>
            <div className={`
              mt-2 text-gray-600 overflow-hidden transition-all duration-300
              ${expandedArea === area ? 'max-h-40' : 'max-h-0'}
            `}>
              {data.explanation}
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderNotesSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Teacher's Note</h3>
        <p className="text-gray-700">{studentData.teacherNote}</p>
      </div>
      
      <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Parent's Note</h3>
        <p className="text-gray-700">{studentData.parentNote}</p>
      </div>
    </div>
  );

  return (
    <>
    {
      loading?<div className='flex justify-center items-center h-screen'>Loading...</div>:
      studentData &&
(<div className='flex justify-center items-center h-screen'>
        <Card className="w-full max-w-4xl bg-gradient-to-br from-white to-blue-50">
          <CardContent className="p-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {studentData.studentName}'s Assessment
              </div>
              <div className="mt-2 text-gray-600">Grade {studentData.grade} | Science</div>
              <div className="mt-4 text-2xl font-bold text-blue-600">Overall Score: {studentData.overallScore}</div>
            </div>
  
            {/* Navigation */}
            <div className="flex gap-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'strengths'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('strengths')}
              >
                Strengths & Areas
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === 'notes'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setActiveTab('notes')}
              >
                Notes
              </button>
            </div>
  
            {/* Content */}
            <div className="mt-6">
              {activeTab === 'strengths' ? renderStrengthsSection() : renderNotesSection()}
            </div>
  
            {/* Final Thought */}
            <div className="mt-8 bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-xl text-white shadow-lg">
              <div className="text-lg font-medium italic">
                {studentData.finalThought}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>)
    }
    </>
  );
};

export default StudentDetailPage;