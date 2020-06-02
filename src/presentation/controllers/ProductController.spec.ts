/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { ProductController } from './ProductController';
import { HttpRequest } from '../interfaces/http';

// const httpRequest: HttpRequest = {
//   body: {
//     name: 'any_name',
//     description: 'any_desc',
//     image_url: 'any_url',
//     category: ['any_cat', 'another_cat'],
//     price: 99,
//     brand: 'any_brand',
//   },
// };

describe('Product Controller', () => {
  it('Should return 400 if no name if passed', () => {
    const sut = new ProductController();
    const httpRequest: HttpRequest = {
      body: {
        description: 'any_desc',
        image_url: 'any_url',
        category: ['any_cat', 'another_cat'],
        price: 99,
        brand: 'any_brand',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing parameter name'));
  });

  it('Should return 400 if no description is provided', () => {
    const sut = new ProductController();
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        image_url: 'any_url',
        category: ['any_cat', 'another_cat'],
        price: 99,
        brand: 'any_brand',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing parameter description'));
  });

  it('Should return 400 if no category is provided', () => {
    const sut = new ProductController();
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        description: 'any_desc',
        image_url: 'any_url',
        price: 99,
        brand: 'any_brand',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing parameter category'));
  });

  it('Should return 400 if no price is provided', () => {
    const sut = new ProductController();
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        description: 'any_desc',
        image_url: 'any_url',
        category: ['any_cat', 'another_cat'],
        brand: 'any_brand',
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing parameter price'));
  });

  it('Should return 400 if no brand is provided', () => {
    const sut = new ProductController();
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        description: 'any_desc',
        image_url: 'any_url',
        category: ['any_cat', 'another_cat'],
        price: 99,
      },
    };
    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing parameter brand'));
  });
});
