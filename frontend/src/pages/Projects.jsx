import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projectAPI } from '../services/api';
import { LoadingSpinner, ErrorMessage, EmptyState, SuccessMessage } from '../components/UI';
import { displayDate, getStatusColor } from '../utils/helpers';
import { Modal } from '../components/Modal';

export function Projects() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, projectId: null });

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    filterProjects();
  }, [projects, searchQuery, statusFilter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getAll();
      setProjects(response.data.data);
      setError('');
    } catch (err) {
      setError('Failed to load projects');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filterProjects = () => {
    let filtered = projects;

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.project_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }

    setFilteredProjects(filtered);
  };

  const handleDelete = async () => {
    try {
      await projectAPI.delete(deleteModal.projectId);
      setSuccess('Project deleted successfully');
      setDeleteModal({ isOpen: false, projectId: null });
      fetchProjects();
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Link
          to="/projects/create"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg text-center"
        >
          Create Project
        </Link>
      </div>

      <ErrorMessage error={error} onDismiss={() => setError('')} />
      <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />

        <div className="flex gap-2 flex-wrap">
          {['All', 'Not Started', 'In Progress', 'Completed'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {project.project_name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {project.description || 'No description'}
                </p>
                <div className="mb-4">
                  <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(project.status, 'project')}`}>
                    {project.status}
                  </span>
                </div>
                {project.start_date && (
                  <p className="text-xs text-gray-500 mb-3">
                    {displayDate(project.start_date)} to {displayDate(project.end_date)}
                  </p>
                )}
                <div className="flex gap-2">
                  <Link
                    to={`/projects/${project.id}`}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-3 rounded text-center"
                  >
                    View
                  </Link>
                  <Link
                    to={`/projects/${project.id}/edit`}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => setDeleteModal({ isOpen: true, projectId: project.id })}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState message="No projects found. Create one to get started!" />
      )}

      <Modal
        isOpen={deleteModal.isOpen}
        title="Delete Project"
        onClose={() => setDeleteModal({ isOpen: false, projectId: null })}
        onConfirm={handleDelete}
        confirmText="Delete"
        isDangerous
      >
        <p>Are you sure you want to delete this project? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
