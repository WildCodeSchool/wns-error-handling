import CustomError from './CustomError';

class NotFoundError extends CustomError {
  // eslint-disable-next-line class-methods-use-this
  serializeError(): { status: number; errors: string[] } {
    return {
      status: 404,
      errors: ['Ressource not found'],
    };
  }
}

export default NotFoundError;
