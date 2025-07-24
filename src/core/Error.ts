export class QBError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QueryBuilder";
    Error.captureStackTrace(this, this.constructor);
  }
}
