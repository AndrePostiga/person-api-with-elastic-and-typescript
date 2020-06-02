/* eslint-disable class-methods-use-this */
import { badRequest } from '../helpers/HttpHelper';
import { MissingParamError } from '../errors/MissingParameter';

export class ProductController {
  handle(httpRequest: any): any {
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
    return {
      statusCode: 200,
    };
  }
}
