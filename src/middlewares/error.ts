import { NextFunction, Request, Response } from 'express';
import InputError from '../errors/InputError';
import NotFoundError from '../errors/NotFoundError';
import BadRequestError from '../errors/BadRequestError';

export default (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): Response => {
  if (error instanceof InputError) {
    return res.status(400).json(error.serializeError());
  }

  if (error instanceof BadRequestError) {
    return res.status(400).json(error.serializeError());
  }

  if (error instanceof NotFoundError) {
    return res.status(404).json(error.serializeError());
  }

  // eslint-disable-next-line no-console
  console.error(error);

  return res
    .status(500)
    .json({ status: 500, errors: ['Something went wrong'] });
};
