import { Request, Response } from 'express';
import Task from '../models/Task';
import ITask from '../interfaces/ITask';
import { AppError } from '../middlewares/errorHandler';

/**
 * Create a new task
 */
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(400).json({ error: `Task creation failed: ${err.message}` });
  }
};

/**
 * Get all tasks
 */
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: `Failed to fetch tasks: ${err.message}` });
  }
};

/**
 * Get a single task by ID
 */
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: `Failed to fetch task: ${err.message}` });
  }
};

/**
 * Update a task by ID
 */
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log incoming data for debugging
    console.log('Update request for ID:', req.params.id);
    console.log('Update payload:', req.body);

    // Convert ISO string back to Date if needed
    if (req.body.deadline) {
      req.body.deadline = new Date(req.body.deadline);
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }

    res.json(task);
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Update failed:', err);
    res.status(400).json({ 
      error: 'Update failed',
      details: err.message
    });
  }
};

/**
 * Delete a task by ID
 */
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error: unknown) {
    const err = error as Error;
    res.status(500).json({ error: `Failed to delete task: ${err.message}` });
  }
};

/**
 * Simulated error testing endpoint
 */
export const testError = async (req: Request, res: Response) => {
  const { type } = req.query;

  switch (type) {
    case 'validation':
      throw new Error('Validation failed: Name is required');
    case 'notfound':
      throw new AppError('Task not found', 404);
    case 'db':
      throw new Error('Database connection failed');
    default:
      throw new Error('Generic server error');
  }
};
