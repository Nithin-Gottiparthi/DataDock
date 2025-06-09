import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database/conn.js'; // Your DB connection
import router from './routes/router.js'; // Correct import here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3003;

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'https://crud-web-app-nine.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin like mobile apps or curl requests
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

// Handle preflight requests for all routes
app.options('*', cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Use your routes
app.use(router);

// Root route
app.get("/", (req, res) => {
  res.send("This is the root route");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
