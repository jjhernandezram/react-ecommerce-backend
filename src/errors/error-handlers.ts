import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode: number = 400;
  constructor(public error: ValidationError[]) {
    super('Invalid request params.');
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.error.map((err) => {
      return { field: err.param, message: err.msg };
    });
  }
}

export class RequestError extends CustomError {
  constructor(public errors: string, public statusCode: number) {
    super('Invalid request params.');
    Object.setPrototypeOf(this, RequestError.prototype);
  }

  serializeErrors() {
    return [{ status: this.statusCode, message: this.errors }];
  }
}

export class UnhandledError extends CustomError {
  statusCode: number = 500;
  reasons: string = 'Internal Server Error.';
  constructor() {
    super('Internal Server Error.');
    console.log(this.reasons);
    Object.setPrototypeOf(this, UnhandledError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reasons }];
  }
}
