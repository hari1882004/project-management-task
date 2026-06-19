import validator from 'validator';

export const validateRegister = (data) => {
  const errors = {};

  if (!data.fullname || validator.isEmpty(data.fullname.trim())) {
    errors.fullname = 'Full name is required';
  }

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password || data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLogin = (data) => {
  const errors = {};

  if (!data.email || !validator.isEmail(data.email)) {
    errors.email = 'Valid email is required';
  }

  if (!data.password || validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProject = (data) => {
  const errors = {};

  if (!data.project_name || validator.isEmpty(data.project_name.trim())) {
    errors.project_name = 'Project name is required';
  }

  if (data.status && !['Not Started', 'In Progress', 'Completed'].includes(data.status)) {
    errors.status = 'Invalid status';
  }

  if (data.start_date && !validator.isISO8601(data.start_date)) {
    errors.start_date = 'Invalid date format';
  }

  if (data.end_date && !validator.isISO8601(data.end_date)) {
    errors.end_date = 'Invalid date format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTask = (data) => {
  const errors = {};

  if (!data.task_name || validator.isEmpty(data.task_name.trim())) {
    errors.task_name = 'Task name is required';
  }

  if (data.priority && !['Low', 'Medium', 'High'].includes(data.priority)) {
    errors.priority = 'Invalid priority';
  }

  if (data.status && !['Pending', 'In Progress', 'Completed'].includes(data.status)) {
    errors.status = 'Invalid status';
  }

  if (data.due_date && !validator.isISO8601(data.due_date)) {
    errors.due_date = 'Invalid date format';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
