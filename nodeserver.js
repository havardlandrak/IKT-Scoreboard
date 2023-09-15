// Import required modules
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';

// Create an instance of Express
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define MongoDB connection string (replace with your own)
const uri = "mongodb+srv://havardlandrak:ve7CPOBxqnAccwIK@iktscoreboard.jaay6i8.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Define a MongoDB schema and model (example)
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
  name: String,
  description: String,
});

const Item = mongoose.model('Item', ItemSchema);

// Define a route to get all items from the database
app.get('/api/items', (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(404).json({ error: 'No items found' }));
});

// Define a route to add a new item to the database
app.post('/api/items', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
    description: req.body.description,
  });

  newItem.save().then((item) => res.json(item));
});

// Define a route to serve static files (e.g., HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Define a default route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the server to listen on a specific port (e.g., 3000)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
