const express = require('express');
const app = express();

app.use(express.json());

// Sample book data
let books = [
  { id: 1, title: "Atomic Habits", author: "James Clear", status: "available" },
  { id: 2, title: "The Alchemist", author: "Paulo Coelho", status: "issued" }
];

// Get all books
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Get book by ID
app.get('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
});

// Add a new book
app.post('/api/books', (req, res) => {
  const { title, author, status } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    status: status || "available"
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Update book details
app.put('/api/books/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).send("Book not found");

  const { title, author, status } = req.body;
  book.title = title || book.title;
  book.author = author || book.author;
  book.status = status || book.status;

  res.json(book);
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Book not found");

  const deletedBook = books.splice(index, 1);
  res.json(deletedBook[0]);
});

const PORT = 3000;
app.listen(PORT, "0.0.0.0" ,() => {
  console.log(`Library server is running on port ${PORT}`);
});