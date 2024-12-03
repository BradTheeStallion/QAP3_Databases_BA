const mongoose = require('mongoose');
require('dotenv').config();

// Connection URL (replace with your MongoDB connection string)
const uri = process.env.CONNECTION_STRING;

// Define Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    year: Number
});

// Create Book Model
const Book = mongoose.model('Book', bookSchema);

// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Function to insert sample books
async function insertSampleBooks() {
    const sampleBooks = [
        { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', year: 1937 },
        { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction', year: 1960 },
        { title: '1984', author: 'George Orwell', genre: 'Dystopian', year: 1949 }
    ];

    try {
        await Book.insertMany(sampleBooks);
        console.log('Sample books inserted successfully');
    } catch (err) {
        console.error('Error inserting sample books', err);
    }
}

// Queries
async function runBookQueries() {
    try {
        // 1. Retrieve titles of all books
        const allTitles = await Book.find({}, 'title');
        console.log('All Book Titles:', allTitles);

        // 2. Find books by J.R.R. Tolkien
        const tolkienBooks = await Book.find({ author: 'J.R.R. Tolkien' });
        console.log('J.R.R. Tolkien Books:', tolkienBooks);

        // 3. Update genre of 1984
        const updatedBook = await Book.findOneAndUpdate(
            { title: '1984' }, 
            { genre: 'Science Fiction' }, 
            { new: true }
        );
        console.log('Updated 1984 Book:', updatedBook);

        // 4. Delete The Hobbit
        const deletedBook = await Book.findOneAndDelete({ title: 'The Hobbit' });
        console.log('Deleted Book:', deletedBook);

    } catch (err) {
        console.error('Error running book queries', err);
    } finally {
        mongoose.connection.close();
    }
}

// Run the functions
insertSampleBooks()
    .then(() => runBookQueries());