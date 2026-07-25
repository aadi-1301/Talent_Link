import { useState, useEffect } from 'react';
import api from '../api/axios';

export default function Analytics() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/analytics/overview');
      console.log('Analytics data:', response.data);
      setAnalytics(response.data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      console.error('Error details:', error.response?.data);
      if (error.response?.status === 401 || error.response?.status === 422) {
        console.error('Authentication error - please login again');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading analytics...</div>;
  if (!analytics) return (
    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p className="text-gray-600 dark:text-gray-400 mb-4">No analytics data available</p>
      <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
        This could mean:
      </p>
      <ul className="text-sm text-gray-500 dark:text-gray-500 text-left max-w-md mx-auto">
        <li>• You need to login again (session expired)</li>
        <li>• You haven't created any projects/proposals yet</li>
        <li>• Backend is not running</li>
      </ul>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {analytics.role === 'client' ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Total Projects</p>
            <p className="text-3xl font-bold">{analytics.total_projects}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Active Projects</p>
            <p className="text-3xl font-bold text-blue-600">{analytics.active_projects}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Completed Projects</p>
            <p className="text-3xl font-bold text-green-600">{analytics.completed_projects}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Total Spent</p>
            <p className="text-3xl font-bold">${analytics.total_spent}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Monthly Spending</p>
            <p className="text-3xl font-bold">${analytics.monthly_spending}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Active Contracts</p>
            <p className="text-3xl font-bold">{analytics.active_contracts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Proposals Received</p>
            <p className="text-3xl font-bold">{analytics.total_proposals_received}</p>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Total Proposals</p>
            <p className="text-3xl font-bold">{analytics.total_proposals}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Accepted Proposals</p>
            <p className="text-3xl font-bold text-green-600">{analytics.accepted_proposals}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Active Contracts</p>
            <p className="text-3xl font-bold text-blue-600">{analytics.active_contracts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Completed Contracts</p>
            <p className="text-3xl font-bold">{analytics.completed_contracts}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Total Earned</p>
            <p className="text-3xl font-bold">${analytics.total_earned}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Monthly Earnings</p>
            <p className="text-3xl font-bold">${analytics.monthly_earnings}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Hours Logged</p>
            <p className="text-3xl font-bold">{analytics.total_hours_logged}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-2">Average Rating</p>
            <p className="text-3xl font-bold text-yellow-600">{analytics.average_rating} ⭐</p>
          </div>
        </div>
      )}
    </div>
  );
}
