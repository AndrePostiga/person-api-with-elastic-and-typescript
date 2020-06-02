/* eslint-disable no-undef */

import { ProductController } from './ProductController';

// const httpRequest = {
//   body: {
//     name: 'any_name',
//     description: 'any_desc',
//     image_url: 'any_url',
//     category: 'any_cat',
//     price: 99,
//     brand: 'any_brand',
//   },
// };

describe('Product Controller', () => {
  it('Should return 400 if no name if passed', () => {
    const sut = new ProductController();
    const httpRequest = {
      body: {
        description: 'any_desc',
        image_url: 'any_url',
        category: 'any_cat',
        price: 99,
        brand: 'any_brand',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing parameter name'));
  });
});
