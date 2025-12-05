const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE Book
router.post("/", authMiddleware, async (req, res) => {
  try {
    const newBook = await Book.create({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL Books (Only logged-in user's books)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const books = await Book.find({ createdBy: req.user.id });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET SINGLE Book
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!book) return res.status(404).json({ message: "Book not found" });

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Book
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.id },
      req.body,
      { new: true }
    );

    if (!updatedBook)
      return res.status(404).json({ message: "Book not found" });

    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Book
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Book.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id
    });

    if (!deleted)
      return res.status(404).json({ message: "Book not found" });

    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
