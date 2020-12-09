class NotFoundError extends Error {
  // eslint-disable-next-line class-methods-use-this
  serializeError(): { status: number; errors: string[] } {
    return {
      status: 404,
      errors: ['Ressource not found'],
    };
  }
}

export default NotFoundError;
