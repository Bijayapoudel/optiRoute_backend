import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

//load environment variables from .env file into process.env
dotenv.config();

const app=express();
const PORT= process.env.PORT || 3000;

//security middleware
app.use(helmet());
app.use(cors());

//performance middleware
app.use(compression());

//logging middleware
app.use(morgan('combined'));

//rate limiting middleware
const limiter=rateLimit({
    windowMs: 15*60*1000,               //15 minutes
    max:100,                            // Limit each IP to 100 requests per windowMs
});

app.use(limiter);


app.get('/', (req, res) => {
    res.send('Hello, World!');
  });
  
  
  // Error Handling Middleware
  app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
  });
  
  // Start Server
  const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  
  // Graceful Shutdown Setup
  const shutdown = (signal) => {
    console.log(`${signal} signal received: closing HTTP server`);
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  };
  
  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);

