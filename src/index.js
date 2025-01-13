import 'module-alias/register';
import path from 'path';
const { Pool } = require('pg');
import { createClient } from '@supabase/supabase-js';
import hbs from 'express-handlebars';
import bodyParser from 'body-parser';
import app from '@config/express';
import routes from '@routes/index.route';
import swagger from '@config/swagger';
import http from 'http';
import { Server } from 'socket.io';
import tokenAuthentication from '@middlewares/tokenAuthentication';
import * as errorHandler from '@middlewares/errorHandler';
import joiErrorHandler from '@middlewares/joiErrorHandler';
import requestLogger from '@middlewares/requestLogger';
import jsonHandler from '@middlewares/jsonHandler';
// import * as messageService from '@services/user/user_admin_message.service';
// Swagger API documentation
app.get('/swagger.json', (req, res) => {
  res.json(swagger);
});

// Request logger
app.use(requestLogger);

// JSON body validation
app.use(jsonHandler);

// JWT authentication
// app.use(tokenAuthentication);

// Set handlebar
// app.engine('hbs', hbs({ extname: 'hbs', layoutsDir: __dirname + '/views' }));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
app.use('/api', routes);

// Landing page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Joi Error Handler Middleware
app.use(joiErrorHandler);

// Error Handler Middleware
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.notFound);
app.use(errorHandler.methodNotAllowed);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Attach io instance to app
app.set('io', io);

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for sendMessage events from clients
  socket.on('sendMessage', async (messageData) => {
    try {
      const message = await messageService.sendMessage(messageData, io);

      // Emit the message to the recipient's room
      io.to(messageData.recipientId).emit('newMessage', {
        senderId: messageData.senderId,
        senderType: messageData.senderType,
        content: messageData.content,
      });

      // Optionally, acknowledge the message sending to the sender
      socket.emit('messageSent', { success: true, message });
    } catch (error) {
      // Handle error and optionally emit an error message
      socket.emit('messageError', { success: false, message: error.message });
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
const PORT = app.get('port');
const HOST = app.get('host');
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

const supabaseUrl = 'https://ovagnihkmpsmdzuhwldc.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default app;
