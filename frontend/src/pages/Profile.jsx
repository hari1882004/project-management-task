import React from 'react';
import { useAuth } from '../context/AuthContext';
import { displayDate } from '../utils/helpers';
import { LoadingSpinner } from '../components/UI';

export function Profile() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return (
      <div className="p-4 md:p-6">
        <p className="text-gray-600">Unable to load profile</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">User Profile</h1>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-6">
          <div className="pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Full Name</p>
            <p className="text-lg font-semibold text-gray-900">{user.fullname}</p>
          </div>

          <div className="pb-4 border-b border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Email Address</p>
            <p className="text-lg font-semibold text-gray-900">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-600 mb-1">Member Since</p>
            <p className="text-lg font-semibold text-gray-900">
              {displayDate(user.created_at)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
