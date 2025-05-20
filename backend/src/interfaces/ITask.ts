import { Document } from 'mongoose';

export default interface ITask extends Document {
  title: string;
  description: string;
  deadline: Date;
  assignedTo: {
    name: string;
    avatar?: string;
  };
  status: 'todo' | 'in-progress' | 'completed';
  createdBy?: string; // Made optional
  createdAt?: Date;
  updatedAt?: Date;
}