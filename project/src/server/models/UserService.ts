import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  subscriptionPlan?: 'free' | 'weekly' | 'monthly' | 'yearly';
  subscriptionStatus?: 'active' | 'inactive' | 'pending';
}

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  password: { type: String, required: true },
  subscriptionPlan: { type: String, default: 'free' },
  subscriptionStatus: { type: String, default: 'active' },
});

export default mongoose.model<IUser>('User', UserSchema);
