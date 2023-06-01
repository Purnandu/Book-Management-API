const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/booksDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
});

const Book = mongoose.model('Book', bookSchema);

// GET /books: Retrieve all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    console.error('Failed to get books', error);
    res.status(500).json({ error: 'Failed to get books' });
  }
});

// GET /books/:id: Retrieve a specific book by ID
app.get('/books/:id', async (req, res) => {
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
});

// POST /books: Create a new book
app.post('/books', async (req, res) => {
  try {
    const { title, author, description, publishedYear } = req.body;
    const book = new Book({ title, author, description, publishedYear });
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Failed to create book', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// PUT /books/:id: Update a book by ID
app.put('/books/:id', async (req, res) => {
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
});

// DELETE /books/:id: Delete a book by ID
app.delete('/books/:id', async (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
