/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
import { badRequest } from '../helpers/HttpHelper';
import { MissingParamError } from '../errors/MissingParameter';
import { HttpRequest, HttpResponse } from '../interfaces/http';

export class ProductController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'));
    }

    if (!httpRequest.body.description) {
      return badRequest(new MissingParamError('description'));
    }

    if (!(httpRequest.body.category && httpRequest.body.category.length)) {
      return badRequest(new MissingParamError('category'));
    }

    if (!httpRequest.body.price) {
      return badRequest(new MissingParamError('price'));
    }

    if (!httpRequest.body.brand) {
      return badRequest(new MissingParamError('brand'));
    }
  }
}
