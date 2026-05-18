import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalJournals: 0,
    totalStudyHours: 0,
    recentTopics: [],
    productivity: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [journalsRes, hoursRes, recentRes, productivityRes] = await Promise.all([
        api.get('/dashboard/getTotalJournal'),
        api.get('/dashboard/getTotalStudyHour'),
        api.get('/dashboard/getRecentJournal'),
        api.get('/dashboard/productivity')
      ]);

      setStats({
        totalJournals: journalsRes.data.count || 0,
        totalStudyHours: hoursRes.data.totalStudyHours || 0,
        recentTopics: recentRes.data.recentTopics || [],
        productivity: productivityRes.data.overview || []
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">J</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Journals
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalJournals}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">H</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Study Hours
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.totalStudyHours}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                    <span className="text-white font-bold">P</span>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Productivity Score
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats.productivity.length > 0 ? 'Active' : 'No Data'}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Topics */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Recent Study Topics
            </h3>
            {stats.recentTopics.length > 0 ? (
              <div className="space-y-3">
                {stats.recentTopics.map((topic, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 pl-4">
                    <h4 className="font-medium text-gray-900">{topic.topicName}</h4>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-xs text-gray-500">
                        Duration: {topic.studyDuration} hours
                      </span>
                      <span className="text-xs text-gray-500">
                        Difficulty: {topic.difficultyLevel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No recent topics found. Start adding journal entries!</p>
            )}
          </div>
        </div>

        {/* Productivity Overview */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
              Difficulty Level Distribution
            </h3>
            {stats.productivity.length > 0 ? (
              <div className="space-y-2">
                {stats.productivity.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      {item._id}
                    </span>
                    <span className="text-sm text-gray-500">
                      {item.count} entries
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No data available yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;