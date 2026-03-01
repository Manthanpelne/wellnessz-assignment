const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require("./routes/leadRoutes")


dotenv.config();

const app = express();

// 1. GLOBAL MIDDLEWARE
app.use(cors()); 
app.use(express.json()); 


// 2. DATABASE CONNECTIONS
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB Connection Successful ✅'))
  .catch(err => console.error('DB Connection Error ❌', err));


// 3. ROUTES
app.use('/api/auth', authRoutes);
app.use("/api/leads",leadRoutes);


// 4. GL)OBAL ERROR HANDLER 
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});