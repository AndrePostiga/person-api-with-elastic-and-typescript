/* eslint-disable class-methods-use-this */
import { badRequest } from '../helpers/HttpHelper';

export class ProductController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return badRequest(new Error('Missing parameter name'));
    }

    if (!httpRequest.body.description) {
      return badRequest(new Error('Missing parameter description'));
    }

    if (!(httpRequest.body.category && httpRequest.body.category.length)) {
      return badRequest(new Error('Missing parameter category'));
    }

    if (!httpRequest.body.price) {
      return badRequest(new Error('Missing parameter price'));
    }
    return {
      statusCode: 200,
    };
  }
}
