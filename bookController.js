const Book = require('../models/book');

// Controller functions for each API endpoint

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Failed to get books', error);
    res.status(500).json({ error: 'Failed to get books' });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Failed to get book', error);
    res.status(500).json({ error: 'Failed to get book' });
  }
};

const createBook = async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({ title, author, description, publishedYear });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Failed to create book', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

const updateBookById = async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, description, publishedYear },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    console.error('Failed to update book', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

const deleteBookById = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Failed to delete book', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
