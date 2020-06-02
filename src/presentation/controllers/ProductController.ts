/* eslint-disable class-methods-use-this */

export class ProductController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter name'),
      };
    }

    if (!httpRequest.body.description) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter description'),
      };
    }

    if (!(httpRequest.body.category && httpRequest.body.category.length)) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter category'),
      };
    }

    return {
      statusCode: 200,
    };
  }
}
