/* eslint-disable max-classes-per-file */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { MissingParamError, InvalidParamError, ServerError } from '../errors';
import { PersonController } from './PersonController';
import { HttpRequest } from '../interfaces';
import { Validator } from '../interfaces/validator';

const person = {
  id: '0051',
  name: 'Joseph',
  last_name: 'Da Silva',
  color: 'branco',
  gender: 'masculino',
  legal_person: false,
  birth_date: '2012-12-01',
  address: {
    city: 'Uruguaiana',
    state: 'SC',
    country: 'Brasil',
    latitude: 107.21,
    longitude: 79.62,
  },
  scholarity: ['ensino basico incompleto'],
  family: {
    father: '0034',
    mother: '0027',
    sons: ['false'],
    partner: 'false',
  },
  death_date: {
    date: '2999-01-01',
    causes: ['murder'],
  },
  health: {
    diseases: ['cancer'],
    disabilities: [],
    blood: {
      type: 'AB',
      rh_factor: false,
    },
    smoker: true,
  },
  profession: ['Student'],
  social_networks: ['twitter', 'facebook'],
};

interface SutTypes {
  sut: PersonController;
  validatorStub: Validator;
}

const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    isValid(param: string): boolean {
      return true;
    }
  }

  return new ValidatorStub();
};
const makeValidatorWithError = (): Validator => {
  class ValidatorStub implements Validator {
    isValid(param: string): boolean {
      throw new Error();
    }
  }

  return new ValidatorStub();
};
const makeSut = (): SutTypes => {
  const validatorStub = makeValidator();
  const sut = new PersonController(validatorStub);
  return {
    sut,
    validatorStub,
  };
};

describe('Product Controller', () => {
  it('Should return 400 if no name is passed', () => {
    const { sut } = makeSut();
    const { name, ...mock } = person;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });
  it('Should return 400 if no last name is provided', () => {
    const { sut } = makeSut();
    const { last_name, ...mock } = person;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('last_name'));
  });
  it('Should return 400 if no color is provided', () => {
    const { sut } = makeSut();
    const { color, ...mock } = person;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('color'));
  });
  it('Should return 400 if no gender is provided', () => {
    const { sut } = makeSut();
    const { gender, ...mock } = person;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('gender'));
  });
  it('Should return 400 if no birth date is provided', () => {
    const { sut } = makeSut();
    const { birth_date, ...mock } = person;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('birth_date'));
  });
  it('Should return 400 if no profession date is provided', () => {
    const { sut } = makeSut();
    const { profession, ...mock } = person;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('profession'));
  });
  it('Should return 400 if no wrong color is provided', () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, 'isValid').mockReturnValueOnce(false);
    const httpRequest: HttpRequest = {
      body: person,
    };

    httpRequest.body.color = 'any_color';

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('color'));
  });
  it('Should call validator with correct argument', () => {
    const { sut, validatorStub } = makeSut();
    const isValidySpy = jest.spyOn(validatorStub, 'isValid');
    const httpRequest: HttpRequest = {
      body: person,
    };

    httpRequest.body.color = 'any_color';

    sut.handle(httpRequest);
    expect(isValidySpy).toHaveBeenCalledWith('any_color');
  });
  it('Should return 500 if validator throws exception', () => {
    const validatorStub = makeValidatorWithError();
    const sut = new PersonController(validatorStub);

    const httpRequest: HttpRequest = {
      body: person,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
});
