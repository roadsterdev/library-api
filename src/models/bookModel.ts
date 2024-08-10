import mongoose, { Schema, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publicationYear: number;
  publisher: string;
  price: number;
  availableCopies: number;
}

const bookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  publisher: { type: String, required: true },
  price: { type: Number, required: true },
  availableCopies: { type: Number, required: true, default: 4 },
});

export const Book = mongoose.model<IBook>('Book', bookSchema);
