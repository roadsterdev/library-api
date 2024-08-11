import mongoose, { Schema, Document } from 'mongoose';

interface IBorrowedBook {
  bookId: Schema.Types.ObjectId;
  borrowDate: Date;
  returnDate: Date | null;
  isReturned: boolean;
}

export interface IUser extends Document {
  username: string;
  email: string;
  walletBalance: number;
  borrowedBooks: IBorrowedBook[];
}

const borrowedBookSchema: Schema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  borrowDate: { type: Date, required: true },
  returnDate: { type: Date, default: null },
  isReturned: { type: Boolean, required: true, default: false },
});

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  walletBalance: { type: Number, required: true, default: 0 },
  borrowedBooks: [borrowedBookSchema],
});

export const User = mongoose.model<IUser>('User', userSchema);
