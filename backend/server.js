const express = require('express');
const connectDB = require('./config/db'); // Import correctly
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

connectDB();

const app = express();
app.use(express.json());

app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
