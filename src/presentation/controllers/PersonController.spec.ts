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
import { PersonModel } from '../../domain/models/person';
import { AddPerson, AddPersonModel } from '../../domain/usecases/addPerson';
import { Profession } from '../../domain/models/profession';
import { Scolarity } from '../../domain/models/scolarity';
import { BloodType } from '../../domain/models/health';
import { SocialNetwork } from '../../domain/models/socialNetwork';

const personMock: PersonModel = {
  id: '0051',
  name: 'Joseph',
  lastName: 'Da Silva',
  color: 'branco',
  gender: 'masculino',
  legalPerson: false,
  birthDate: new Date(),
  address: {
    city: 'Uruguaiana',
    state: 'SC',
    country: 'Brasil',
    latitude: 107.21,
    longitude: 79.62,
  },
  scholarity: [Scolarity.ENSINO_MEDIO],
  family: {
    father: '0034',
    mother: '0027',
    sons: ['false'],
    partner: '0028',
  },
  deathDate: {
    date: new Date(),
    causes: ['murder'],
  },
  health: {
    diseases: ['cancer'],
    disabilities: [],
    blood: {
      type: BloodType.AB,
      rhFactor: true,
    },
    smoker: true,
  },
  profession: [Profession.ESTUDANTE],
  socialNetwork: [SocialNetwork.FACEBOOK, SocialNetwork.TWITTER],
};

const makeAddPerson = (): AddPerson => {
  class AddPersonStub implements AddPerson {
    add(person: AddPersonModel): PersonModel {
      const fakePerson = {
        id: 'valid_id',
        name: 'any_name',
        lastName: 'any_last_name',
        color: 'any_color',
        gender: 'any_gender',
        legalPerson: true,
        birthDate: new Date(),
        profession: [Profession.ENGENHEIRO, Profession.ESTUDANTE],
      };
      return fakePerson;
    }
  }

  return new AddPersonStub();
};
const makeValidator = (): Validator => {
  class ValidatorStub implements Validator {
    isValid(param: string): boolean {
      return true;
    }
  }

  return new ValidatorStub();
};

interface SutTypes {
  sut: PersonController;
  validatorStub: Validator;
  addPersonStub: AddPerson;
}
const makeSut = (): SutTypes => {
  const validatorStub = makeValidator();
  const addPersonStub = makeAddPerson();
  const sut = new PersonController(validatorStub, addPersonStub);
  return {
    sut,
    validatorStub,
    addPersonStub,
  };
};

describe('Product Controller', () => {
  it('Should return 400 if no name is passed', () => {
    const { sut } = makeSut();
    const { name, ...mock } = personMock;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });
  it('Should return 400 if no last name is provided', () => {
    const { sut } = makeSut();
    const { lastName, ...mock } = personMock;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('lastName'));
  });
  it('Should return 400 if no color is provided', () => {
    const { sut } = makeSut();
    const { color, ...mock } = personMock;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('color'));
  });
  it('Should return 400 if no gender is provided', () => {
    const { sut } = makeSut();
    const { gender, ...mock } = personMock;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('gender'));
  });
  it('Should return 400 if no birth date is provided', () => {
    const { sut } = makeSut();
    const { birthDate, ...mock } = personMock;
    const httpRequest: HttpRequest = {
      body: mock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('birthDate'));
  });
  it('Should return 400 if no profession date is provided', () => {
    const { sut } = makeSut();
    const { profession, ...mock } = personMock;
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
      body: personMock,
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
      body: personMock,
    };

    httpRequest.body.color = 'any_color';

    sut.handle(httpRequest);
    expect(isValidySpy).toHaveBeenCalledWith('any_color');
  });
  it('Should return 500 if validator throws exception', () => {
    const { sut, validatorStub } = makeSut();
    jest.spyOn(validatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    const httpRequest: HttpRequest = {
      body: personMock,
    };

    const httpResponse = sut.handle(httpRequest);
    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError());
  });
  it('Should call AddPerson with correct values', () => {
    const { sut, addPersonStub } = makeSut();
    const addSpy = jest.spyOn(addPersonStub, 'add');
    const httpRequest: HttpRequest = {
      body: {
        name: 'Joseph',
        lastName: 'Da Silva',
        color: 'any_color',
        gender: 'masculino',
        birthDate: new Date(),
        profession: [Profession.ENGENHEIRO],
        socialNetwork: [SocialNetwork.FACEBOOK],
      },
    };

    sut.handle(httpRequest);
    expect(addSpy).toHaveBeenCalledWith({
      name: 'Joseph',
      lastName: 'Da Silva',
      color: 'any_color',
      gender: 'masculino',
      birthDate: new Date(),
      profession: [Profession.ENGENHEIRO],
      socialNetwork: [SocialNetwork.FACEBOOK],
    });
  });
});
