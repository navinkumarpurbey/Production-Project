// import { ObjectId, FindOneAndUpdateOptions } from 'mongodb';
// import { getDB } from '../db';

// interface User {
//   _id?: ObjectId | string;
//   fullName: string;
//   email: string;
//   phoneNumber: string;
//   password: string;
//   subscriptionPlan: 'free' | 'weekly' | 'monthly' | 'yearly';
//   subscriptionStatus: 'active' | 'inactive' | 'pending';
//   createdAt?: Date;
//   lastLogin?: Date;
//   isApproved?: boolean;
// }

// class UserService {
//   private db = getDB();
//   private collection = this.db.collection<User>('users');

//   // Create a new user
//   async createUser(userData: User): Promise<User> {
//     try {
//       const createdAt = new Date();
//       const { insertedId } = await this.collection.insertOne({
//         ...userData,
//         createdAt,
//         isApproved: false,
//       });
//       return {
//         ...userData,
//         _id: insertedId.toString(),
//         createdAt,
//         isApproved: false,
//       };
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         throw new Error(`Failed to create user: ${error.message}`);
//       } else {
//         throw new Error('Unknown error occurred');
//       }
//     }
//   }

//   // Get a user by ID
//   async getUserById(id: string): Promise<User | null> {
//     try {
//       const user = await this.collection.findOne({ _id: new ObjectId(id) });
//       return user ? { ...user, _id: user._id.toString() } : null;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         throw new Error(`Failed to retrieve user: ${error.message}`);
//       } else {
//         throw new Error('Unknown error occurred');
//       }
//     }
//   }

//   // Update user by ID
//   async updateUser(id: string, updatedData: Partial<User>): Promise<User | null> {
//     try {
//       const options: FindOneAndUpdateOptions = { returnDocument: 'after' };
      
//       // Explicitly type the result with MongoDB's ModifyResult
//       const result = await this.collection.findOneAndUpdate(
//         { _id: new ObjectId(id) },
//         { $set: updatedData },
//         options
//       );
  
//       // Proper null checking with MongoDB's result structure
//       if (!result || !result.value) return null;
  
//       // Now TypeScript knows result.value exists
//       const updatedUser = result.value;
      
//       return {
//         ...updatedUser,
//         _id: updatedUser._id.toString(),
//       };
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         throw new Error(`Failed to update user: ${error.message}`);
//       } else {
//         throw new Error('Unknown error occurred');
//       }
//     }
//   }
//   // Delete a user by ID
//   async deleteUser(id: string): Promise<boolean> {
//     try {
//       const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
//       return result.deletedCount > 0;
//     } catch (error: unknown) {
//       if (error instanceof Error) {
//         throw new Error(`Failed to delete user: ${error.message}`);
//       } else {
//         throw new Error('Unknown error occurred');
//       }
//     }
//   }
// }

// export default UserService;