import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projectAPI, taskAPI } from '../services/api';
import { LoadingSpinner, ErrorMessage, SuccessMessage, EmptyState } from '../components/UI';
import { displayDate, getStatusColor } from '../utils/helpers';
import { Modal } from '../components/Modal';
import { Link } from 'react-router-dom';

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, taskId: null });

  useEffect(() => {
    fetchProject();
    fetchTasks();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await projectAPI.getById(id);
      setProject(response.data.data);
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await taskAPI.getByProjectId(id);
      setTasks(response.data.data);
    } catch (err) {
      console.error('Failed to load tasks:', err);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await taskAPI.delete(id, deleteModal.taskId);
      setSuccess('Task deleted successfully');
      setDeleteModal({ isOpen: false, taskId: null });
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!project) {
    return (
      <div className="p-4 md:p-6">
        <ErrorMessage error="Project not found" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <button
          onClick={() => navigate('/projects')}
          className="text-indigo-600 hover:text-indigo-700 font-medium mb-4"
        >
          Back to Projects
        </button>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.project_name}</h1>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex gap-4 flex-wrap">
                <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(project.status, 'project')}`}>
                  {project.status}
                </span>
                {project.start_date && (
                  <span className="text-gray-600 text-sm">
                    {displayDate(project.start_date)} to {displayDate(project.end_date)}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Link
                to={`/projects/${id}/edit`}
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded"
              >
                Edit Project
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ErrorMessage error={error} onDismiss={() => setError('')} />
      <SuccessMessage message={success} onDismiss={() => setSuccess('')} />

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <Link
            to={`/projects/${id}/create-task`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded"
          >
            Add Task
          </Link>
        </div>

        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 transition-colors">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{task.task_name}</h3>
                    <p className="text-gray-600 text-sm">{task.description}</p>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <span className={`px-2 py-1 text-xs rounded ${getStatusColor(task.status, 'task')}`}>
                        {task.status}
                      </span>
                      <span className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700">
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <Link
                      to={`/projects/${id}/tasks/${task.id}/edit`}
                      className="bg-gray-600 hover:bg-gray-700 text-white text-sm font-medium py-2 px-3 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, taskId: task.id })}
                      className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="No tasks yet. Create one to get started!" />
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        title="Delete Task"
        onClose={() => setDeleteModal({ isOpen: false, taskId: null })}
        onConfirm={handleDeleteTask}
        confirmText="Delete"
        isDangerous
      >
        <p>Are you sure you want to delete this task? This action cannot be undone.</p>
      </Modal>
    </div>
  );
}
