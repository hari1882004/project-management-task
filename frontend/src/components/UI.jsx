import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function EmptyState({ message = 'No data available' }) {
  return (
    <div className="flex justify-center items-center min-h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
      <p className="text-gray-500 text-center">{message}</p>
    </div>
  );
}

export function ErrorMessage({ error, onDismiss }) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
      <span>{error}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="text-red-700 hover:text-red-900">
          Dismiss
        </button>
      )}
    </div>
  );
}

export function SuccessMessage({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
      <span>{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="text-green-700 hover:text-green-900">
          Dismiss
        </button>
      )}
    </div>
  );
}
