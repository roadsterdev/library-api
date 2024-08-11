import express from 'express';
import { borrowBook, returnBook, getUserById, topUpWallet } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         walletBalance:
 *           type: number
 *           description: The user's wallet balance
 *         borrowedBooks:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *                 description: The ID of the borrowed book
 *               borrowDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date the book was borrowed
 *               returnDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date the book was returned
 *               isReturned:
 *                 type: boolean
 *                 description: Whether the book has been returned
 *       example:
 *         _id: 60c72b2f9b1d8b4d3c4f6360
 *         username: "John Doe"
 *         email: "johndoe@example.com"
 *         walletBalance: 50
 *         borrowedBooks:
 *           - bookId: "60c72b2f9b1d8b4d3c4f6359"
 *             borrowDate: "2021-06-14T10:00:00Z"
 *             returnDate: null
 *             isReturned: false
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A single user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get('/:id', getUserById);

/**
 * @swagger
 * /api/users/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user borrowing the book
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to be borrowed
 *             required:
 *               - userId
 *               - bookId
 *             example:
 *               userId: "60c72b2f9b1d8b4d3c4f6360"
 *               bookId: "60c72b2f9b1d8b4d3c4f6359"
 *     responses:
 *       200:
 *         description: The book was successfully borrowed
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or book not found
 */
router.post('/borrow', borrowBook);

/**
 * @swagger
 * /api/users/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user returning the book
 *               bookId:
 *                 type: string
 *                 description: The ID of the book to be returned
 *             required:
 *               - userId
 *               - bookId
 *             example:
 *               userId: "60c72b2f9b1d8b4d3c4f6360"
 *               bookId: "60c72b2f9b1d8b4d3c4f6359"
 *     responses:
 *       200:
 *         description: The book was successfully returned
 *       400:
 *         description: Bad request
 *       404:
 *         description: User or book not found
 */
router.post('/return', returnBook);

/**
 * @swagger
 * /api/users/topup:
 *   post:
 *     summary: Top up user's wallet
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user whose wallet is to be topped up
 *               amount:
 *                 type: number
 *                 description: The amount to top up
 *             required:
 *               - userId
 *               - amount
 *             example:
 *               userId: "60c72b2f9b1d8b4d3c4f6360"
 *               amount: 50
 *     responses:
 *       200:
 *         description: The wallet was successfully topped up
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *                 walletBalance:
 *                   type: number
 *                   description: The updated wallet balance
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.post('/topup', topUpWallet);

export { router as userRoutes };
