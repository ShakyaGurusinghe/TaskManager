import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  googleId: string;
  name: string;
  email: string;
  avatar?: string;
}

const UserSchema = new Schema<IUser>({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatar: { type: String },
});

export default model<IUser>('User', UserSchema);