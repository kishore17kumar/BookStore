// backend/index.js

import express from 'express';
import mongoose from 'mongoose';
import bookRouts from './routes/bookRouts.js';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());
// app.use(
//     cors({
//         origin:'http://localhost:3000',
//         methods:['GET','POST','PUT','DELETE'],
//         allowedHeaders:['Content-Type'],
//     })
// );
// Define routes
app.get('/', (req, res) => {
    return res.status(200).send("Welcome to the bookstore API");
});

app.use('/books',bookRouts);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bookstore', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
