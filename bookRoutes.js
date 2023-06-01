const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// GET /books: Retrieve all books
router.get('/', bookController.getAllBooks);

// GET /books/:id: Retrieve a specific book by ID
router.get('/:id', bookController.getBookById);

// POST /books: Create a new book
router.post('/', bookController.createBook);

// PUT /books/:id: Update a book by ID
router.put('/:id', bookController.updateBookById);

// DELETE /books/:id: Delete a book by ID
router.delete('/:id', bookController.deleteBookById);

module.exports = router;
