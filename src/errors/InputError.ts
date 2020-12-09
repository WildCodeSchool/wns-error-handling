import { ValidationError } from 'express-validator';
import CustomError from './CustomError';

class InputError extends CustomError {
  constructor(public validationErrors: ValidationError[]) {
    super('Validation errors occured in input');
  }

  serializeError(): { status: number; errors: string[] } {
    return {
      status: 400,
      errors: this.validationErrors.map(({ msg }) => msg),
    };
  }
}

export default InputError;
