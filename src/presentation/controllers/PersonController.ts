/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { HttpRequest, HttpResponse, Controller, Validator } from '../interfaces';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/HttpHelper';

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
      return serverError();
    }
  }
}
