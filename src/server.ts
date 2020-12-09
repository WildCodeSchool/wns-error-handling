import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import wilderRouter from './routes/wilder';
import InputError from './errors/InputError';
import NotFoundError from './errors/NotFoundError';
import BadRequestError from './errors/BadRequestError';

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (error instanceof InputError) {
    return res.status(400).json({
      status: 400,
      errors: error.validationErrors.map(({ msg }) => msg),
    });
  }

  if (error instanceof BadRequestError) {
    return res.status(400).json({
      status: 400,
      errors: [error.message],
    });
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json({
      status: 404,
      errors: ['Ressource not found'],
    });
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return res
    .status(500)
    .json({ status: 500, errors: ['Something went wrong'] });
});

// Start Server
// eslint-disable-next-line no-console
app.listen(5000, () => console.log('Server started on 5000'));
