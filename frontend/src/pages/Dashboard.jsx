import React, { useState, useEffect } from 'react';
import { dashboardAPI } from '../services/api';
import { LoadingSpinner, ErrorMessage, EmptyState } from '../components/UI';
import { displayDate, getStatusColor } from '../utils/helpers';

export function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getStats();
      setStats(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <ErrorMessage error={error} onDismiss={() => setError('')} />

      {stats && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Total Projects"
              value={stats.stats.totalProjects}
              color="bg-blue-50 text-blue-600"
            />
            <StatCard
              title="In Progress"
              value={stats.stats.inProgressProjects}
              color="bg-indigo-50 text-indigo-600"
            />
            <StatCard
              title="Completed"
              value={stats.stats.completedProjects}
              color="bg-green-50 text-green-600"
            />
            <StatCard
              title="Total Tasks"
              value={stats.stats.totalTasks}
              color="bg-orange-50 text-orange-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Overview</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Completed Tasks</span>
                  <span className="text-2xl font-bold text-green-600">{stats.stats.completedTasks}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${stats.stats.taskCompletionRate}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600">
                  {stats.stats.taskCompletionRate}% of total tasks completed
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Task Status</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold">{stats.stats.pendingTasks}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completed</span>
                  <span className="font-semibold">{stats.stats.completedTasks}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Projects</h2>
              {stats.recentProjects.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentProjects.map((project) => (
                    <div key={project.id} className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">{project.project_name}</h3>
                      <p className="text-sm text-gray-600">{displayDate(project.created_at)}</p>
                      <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${getStatusColor(project.status, 'project')}`}>
                        {project.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No recent projects" />
              )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Tasks</h2>
              {stats.recentTasks.length > 0 ? (
                <div className="space-y-3">
                  {stats.recentTasks.map((task) => (
                    <div key={task.id} className="p-3 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-gray-900">{task.task_name}</h3>
                      <p className="text-sm text-gray-600">{displayDate(task.created_at)}</p>
                      <div className="flex gap-2 mt-2">
                        <span className={`px-2 py-1 text-xs rounded ${getStatusColor(task.status, 'task')}`}>
                          {task.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyState message="No recent tasks" />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`rounded-lg shadow p-6 ${color}`}>
      <p className="text-sm font-medium opacity-80 mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
