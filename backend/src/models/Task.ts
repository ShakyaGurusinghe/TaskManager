import { Schema, model, Document } from 'mongoose';
import ITask from '../interfaces/ITask';

const TaskSchema = new Schema<ITask>(
  {
    title: { 
      type: String, 
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: { 
      type: String, 
      required: [true, 'Description is required'],
      trim: true
    },
    deadline: { 
      type: Date, 
      required: [true, 'Deadline is required'],
      validate: {
        validator: function(value: Date) {
          return value > new Date();
        },
        message: 'Deadline must be in the future'
      }
    },
    assignedTo: {
      name: { 
        type: String, 
        required: [true, 'Assignee name is required'],
        trim: true
      },
      avatar: { 
        type: String,
        default: ''
      },
    },
    status: {
      type: String,
      enum: {
        values: ['todo', 'in-progress', 'completed'],
        message: 'Status must be either todo, in-progress, or completed'
      },
      default: 'todo',
    },
    createdBy: {
      type: String,
      default: 'demo-user',
      trim: true
    }
  },
  { 
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function(doc, ret) {
        delete ret.__v;
        ret.id = ret._id;
        delete ret._id;
        return ret;
      }
    }
  }
);

// Add index for better query performance
TaskSchema.index({ title: 'text', description: 'text' });
TaskSchema.index({ status: 1 });
TaskSchema.index({ deadline: 1 });

export default model<ITask>('Task', TaskSchema);