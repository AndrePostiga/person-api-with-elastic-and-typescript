/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { badRequest } from '../helpers/HttpHelper';
import { MissingParamError } from '../errors/MissingParameter';
import { HttpRequest, HttpResponse } from '../interfaces/http';

export class PersonController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'last_name', 'color', 'gender', 'birth_date', 'profession'];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field));
      }
    }

    return {
      statusCode: 400,
      body: new MissingParamError('something'),
    };
  }
}
