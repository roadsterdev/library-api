import { Request, Response } from "express";
import mongoose, { Schema } from 'mongoose';

import { User } from "../models/userModel";
import { Book } from "../models/bookModel";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.borrowedBooks.length >= 3) {
      return res.status(400).json({ message: 'Cannot borrow more than 3 books' });
    }

    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(404).json({ message: 'Book not available' });
    }

    if (user.borrowedBooks.some(b => b.bookId.toString() === bookId)) {
      return res.status(400).json({ message: 'Cannot borrow multiple copies of the same book' });
    }

    if (user.walletBalance < 3) {
      return res.status(400).json({ message: 'Insufficient wallet balance' });
    }

    user.borrowedBooks.push({
      bookId: book._id as Schema.Types.ObjectId,
      borrowDate: new Date(),
      returnDate: null,
      isReturned: false,
    });

    user.walletBalance -= 3;
    book.availableCopies -= 1;

    await user.save();
    await book.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const returnBook = async (req: Request, res: Response) => {
  const { userId, bookId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const borrowedBook = user.borrowedBooks.find(
      (b) => b.bookId.toString() === bookId && !b.isReturned
    );
    if (!borrowedBook) {
      return res.status(404).json({ message: "Book not borrowed" });
    }

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    borrowedBook.isReturned = true;
    borrowedBook.returnDate = new Date();

    const borrowDuration =
      (borrowedBook.returnDate.getTime() - borrowedBook.borrowDate.getTime()) /
      (1000 * 60 * 60 * 24);
    const lateDays = Math.max(0, borrowDuration - 14);
    const lateFee = lateDays * 0.2;

    user.walletBalance -= lateFee;

    if (user.walletBalance < 0 || lateFee >= book.price) {
      user.walletBalance = Math.max(0, user.walletBalance);
      // The user bought the book due to late fees
    }

    book.availableCopies += 1;

    await user.save();
    await book.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const topUpWallet = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.walletBalance += amount;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
