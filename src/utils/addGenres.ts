import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { createObjectCsvWriter } from 'csv-writer';

// Define the genres list
const genres = [
  "Fiction", "Mystery", "Thriller", "Science Fiction", "Fantasy", "Romance",
  "Historical Fiction", "Horror", "Young Adult", "Biography", "Self-Help",
  "History", "Science", "Travel", "Cookbooks", "Memoir", "Poetry", "Drama",
  "Adventure", "Graphic Novels"
];

// Function to assign a random genre
const assignRandomGenre = () => {
  return genres[Math.floor(Math.random() * genres.length)];
};

// Path to your existing CSV file
const inputFilePath = path.join(__dirname, '../../data/books_samples.csv');
// Path to the new CSV file with genres
const outputFilePath = path.join(__dirname, '../../data/books_with_genres.csv');

const books: any[] = [];

fs.createReadStream(inputFilePath)
  .pipe(csv())
  .on('data', (row) => {
    // Assign a random genre to each book
    const genre = assignRandomGenre();

    // Add the genre to the book data
    books.push({
      ...row,
      genre: genre
    });
  })
  .on('end', () => {

    const csvWriter = createObjectCsvWriter({
      path: outputFilePath,
      header: [
        { id: 'id', title: 'id' },
        { id: 'title', title: 'title' },
        { id: 'author', title: 'author' },
        { id: 'publication_year', title: 'publication_year' },
        { id: 'publisher', title: 'publisher' },
        { id: 'price', title: 'price' },
        { id: 'genre', title: 'genre' } // New genre column
      ]
    });

    // Write the books with genres to a new CSV file
    csvWriter.writeRecords(books)
      .then(() => {
        console.log('CSV file with genres has been written successfully.');
      })
      .catch((err: Error) => {
        console.error('Error writing CSV file:', err);
      });
  });
