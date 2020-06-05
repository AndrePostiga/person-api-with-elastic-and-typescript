/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { badRequest } from '../helpers/HttpHelper';
import { MissingParamError } from '../errors/MissingParameter';
import { HttpRequest, HttpResponse } from '../interfaces/http';
import { Controller } from '../interfaces/controller';
import { Validator } from '../interfaces/validator';
import { InvalidParamError } from '../errors/InvalidParameter';
import { ServerError } from '../errors/ServerError';

export class PersonController implements Controller {
  private readonly validator: Validator;

  constructor(validator: Validator) {
    this.validator = validator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'last_name', 'color', 'gender', 'birth_date', 'profession'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValid = this.validator.isValid(httpRequest.body.color);
      if (!isValid) {
        return badRequest(new InvalidParamError('color'));
      }

      return {
        statusCode: 200,
        body: true,
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: new ServerError(),
      };
    }
  }
}
