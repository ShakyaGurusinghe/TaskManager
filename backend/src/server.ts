import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import 'dotenv/config';
import taskRoutes from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';
import mongoose from 'mongoose';
import { config } from './config';
const bodyParser = require("body-parser");
dotenv.config();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', // Your Vite URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow methods
  allowedHeaders: ['Content-Type'],
  credentials: true
}));
console.log('CORS configured for:', 'http://localhost:5173');
app.use(express.json());

app.use('/api/tasks', taskRoutes);



// Database Connection
connectDB();
mongoose.connect(config.dbUri);
// Basic route
app.get('/', (req, res) => {
  res.send('Task Management API');
});


console.log('\nRegistered Routes:');
app._router.stack.forEach((middleware: any) => {
  if (middleware.route) {
    // Routes registered directly on app
    const methods = Object.keys(middleware.route.methods).join(', ').toUpperCase();
    console.log(`${methods} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    // Routes registered on routers
    middleware.handle.stack.forEach((handler: any) => {
      if (handler.route) {
        const methods = Object.keys(handler.route.methods).join(', ').toUpperCase();
        console.log(`${methods} /api/tasks${handler.route.path}`); // Adjust prefix if different
      }
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



console.log('Available routes:');
app._router.stack.forEach((r: any) => {
  if (r.route?.path) {
    console.log(`${Object.keys(r.route.methods)[0].toUpperCase()} ${r.route.path}`);
  }
});

app.use(errorHandler);


