/* eslint-disable no-unused-vars */
import { HttpResponse } from '../interfaces/http';
import { ServerError } from '../errors/ServerError';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});
