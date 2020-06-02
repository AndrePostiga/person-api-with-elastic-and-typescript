/* eslint-disable class-methods-use-this */

export class ProductController {
  handle(httpRequest: any): any {
    if (!httpRequest.body.name) {
      return {
        statusCode: 400,
        body: new Error('Missing parameter name'),
      };
    }

    return {
      statusCode: 200,
    };
  }
}
