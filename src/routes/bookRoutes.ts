import express from 'express';
import { getBooks, getBookById, addBook, deleteBook } from '../controllers/bookController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - publicationYear
 *         - publisher
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of the book
 *         author:
 *           type: string
 *           description: The author of the book
 *         genre:
 *           type: string
 *           description: The genre of the book
 *         publicationYear:
 *           type: number
 *           description: The year the book was published
 *         publisher:
 *           type: string
 *           description: The publisher of the book
 *         price:
 *           type: number
 *           description: The price of the book
 *         availableCopies:
 *           type: number
 *           description: The number of available copies of the book
 *       example:
 *         _id: 60c72b2f9b1d8b4d3c4f6359
 *         title: "The Great Gatsby"
 *         author: "F. Scott Fitzgerald"
 *         genre: "Fiction"
 *         publicationYear: 1925
 *         publisher: "Charles Scribner's Sons"
 *         price: 10.99
 *         availableCopies: 4
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/', getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: A single book
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: Book not found
 */
router.get('/:id', getBookById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       400:
 *         description: Bad request
 */
router.post('/', addBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Remove a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: Book not found
 */
router.delete('/:id', deleteBook);

export { router as bookRoutes };
