import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'BUSINESS'],
    default: 'USER',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },
});
export interface UserDocument extends Document {
  userName: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN' | 'BUSINESS';
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
