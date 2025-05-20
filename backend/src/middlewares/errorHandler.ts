import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

export class AppError extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
    console.error(
        chalk.red('\n[ERROR]'),
        chalk.yellow(new Date().toISOString()),
        '\nPath:', chalk.cyan(req.path),
        '\nMessage:', chalk.redBright(err.message),
        '\nStack:', chalk.gray(err.stack?.split('\n').slice(0, 3).join('\n'))
      );
  
  // Handle specific error types
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      message: err.message
    });
  }
  
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message
    });
  }

  // Generic error response
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' 
      ? err.message 
      : 'Something went wrong!'
  });
};

export default AppError;