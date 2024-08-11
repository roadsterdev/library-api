import cron from 'node-cron';
import nodemailer from 'nodemailer';
import { User } from '../models/userModel';
import { Book } from '../models/bookModel';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const reminderService = () => {
  // This cron job runs every day at 09:00 AM
  cron.schedule('0 9 * * *', async () => {
    try {
      // Find users who have borrowed books
      const users = await User.find({ 'borrowedBooks.isReturned': false });

      for (const user of users) {
        for (const borrowedBook of user.borrowedBooks) {
          if (!borrowedBook.isReturned) {
            const book = await Book.findById(borrowedBook.bookId);
            const dueDate = new Date(borrowedBook.borrowDate);
            dueDate.setDate(dueDate.getDate() + 14); // 14 days is the borrowing period

            const currentDate = new Date();
            const daysUntilDueDate = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
            const daysAfterDueDate = Math.ceil((currentDate.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24));

            // Send reminder 2 days before the due date
            if (daysUntilDueDate === 2) {
              await sendEmail(
                user.email,
                'Book Due Date Reminder',
                `Dear ${user.username},\n\nThis is a reminder that your borrowed book "${book?.title}" is due in 2 days on ${dueDate.toDateString()}. Please return the book on time to avoid late fees.\n\nThank you!`
              );
            }

            // Send reminder every day starting 7 days after due date
            if (daysAfterDueDate >= 7) {
              await sendEmail(
                user.email,
                'Overdue Book Reminder',
                `Dear ${user.username},\n\nThis is a reminder that your borrowed book "${book?.title}" was due on ${dueDate.toDateString()}. It has now been ${daysAfterDueDate} days since the due date. Please return the book immediately to avoid late fees.\n\nThank you!`
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Error in reminder service:', error);
    }
  });
};
