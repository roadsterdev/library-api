import { Request, Response } from 'express';
import { Book } from '../models/bookModel';

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addBook = async (req: Request, res: Response) => {
  const book = new Book(req.body);
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    await book.deleteOne();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  const { title, author, genre } = req.query;

  const filter: any = {};
  if (title) filter.title = new RegExp(title as string, 'i');
  if (author) filter.author = new RegExp(author as string, 'i');
  if (genre) filter.genre = new RegExp(genre as string, 'i');

  try {
    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
