import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import dotenv from 'dotenv';

import { connectDB } from './db';
import { User } from '../models/userModel';
import { Book } from '../models/bookModel';

// Load environment variables from .env file
dotenv.config();

const seedUsers = async () => {
  const users = [
    {
      username: 'David',
      email: 'david@example.com',
      walletBalance: 50,
      borrowedBooks: [],
    },
    {
      username: 'John',
      email: 'john@example.com',
      walletBalance: 30,
      borrowedBooks: [],
    },
  ];

  try {
    await User.insertMany(users);
    console.log('Users have been seeded');
  } catch (error) {
    console.error('Error seeding users:', error);
  }
};

const seedBooks = async () => {
  const books: any[] = [];

  fs.createReadStream(path.join(__dirname, '../../data/books_with_genres.csv'))
    .pipe(csv())
    .on('data', (row) => {
      const publicationYear = parseInt(row.publication_year, 10);

      if (!isNaN(publicationYear)) {
        books.push({
          title: row.title,
          author: row.author,
          genre: row.genre,
          publicationYear: publicationYear,
          publisher: row.publisher,
          price: parseFloat(row.price) || 0,
          availableCopies: 4,
        });
      }
    })
    .on('end', async () => {
      try {
        if (books.length > 0) {
          await Book.insertMany(books);
          console.log('Books have been seeded');
        } else {
          console.log('No valid books to seed');
        }
        process.exit();
      } catch (error) {
        console.error('Error seeding books:', error);
        process.exit(1);
      }
    });
};

const seedAll = async () => {
  await connectDB();
  await seedUsers();
  await seedBooks();
};

seedAll();
