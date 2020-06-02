/* eslint-disable no-unused-vars */
import { HttpResponse } from '../interfaces/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
