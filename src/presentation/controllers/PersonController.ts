/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { HttpRequest, HttpResponse, Controller, Validator } from '../interfaces';
import { MissingParamError, InvalidParamError } from '../errors';
import { badRequest, serverError } from '../helpers/HttpHelper';
import { AddPerson } from '../../domain/usecases/addPerson';

export class PersonController implements Controller {
  private readonly addPerson: AddPerson;

  private readonly validator: Validator;

  constructor(validator: Validator, addPerson: AddPerson) {
    this.validator = validator;
    this.addPerson = addPerson;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const {
        name,
        lastName,
        color,
        gender,
        birthDate,
        profession,
        socialNetwork,
        legalPerson,
        address,
        scholarity,
        family,
        deathDate,
        health,
      } = httpRequest.body;

      const requiredFields = ['name', 'lastName', 'color', 'gender', 'birthDate', 'profession'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const isValid = this.validator.isValid(httpRequest.body.color);
      if (!isValid) {
        return badRequest(new InvalidParamError('color'));
      }

      this.addPerson.add({
        name,
        lastName,
        color,
        gender,
        birthDate,
        profession,
        socialNetwork,
        legalPerson,
        address,
        scholarity,
        family,
        deathDate,
        health,
      });
    } catch (error) {
      return serverError();
    }
  }
}
