/* eslint-disable no-unused-vars */
import { PersonModel } from '../models/person';
import { Address } from '../models/address';
import { Scolarity } from '../models/scolarity';
import { Family } from '../models/family';
import { Death } from '../models/death';
import { Health } from '../models/health';
import { Profession } from '../models/profession';
import { SocialNetwork } from '../models/socialNetwork';

export interface AddPersonModel {
  name: string;
  lastName: string;
  color: string;
  gender: string;
  legalPerson?: boolean;
  birthDate: Date;
  address?: Address;
  scholarity?: Array<Scolarity>;
  family?: Family;
  deathDate?: Death;
  health?: Health;
  profession: Array<Profession>;
  socialNetwork?: Array<SocialNetwork>;
}

export interface AddPerson {
  add(person: AddPersonModel): PersonModel;
}
