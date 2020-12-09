abstract class CustomError extends Error {
  abstract serializeError(): { status: number; errors: string[] };
}

export default CustomError;
