import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import wilderRouter from './routes/wilder';
import errorMiddleware from './middlewares/error';
import NotFoundError from './errors/NotFoundError';

const app = express();

// Database
mongoose
  .connect('mongodb://127.0.0.1:27017/wilderdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('Connected to database'))
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.log(err));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(wilderRouter);

app.get('*', () => {
  const error = new NotFoundError();
  throw error;
});

app.use(errorMiddleware);

// Start Server
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on 5000'));
