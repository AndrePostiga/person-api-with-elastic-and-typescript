/* eslint-disable no-unused-vars */
import { Address } from './address';
import { Scolarity } from './scolarity';
import { Family } from './family';
import { Death } from './death';
import { Health } from './health';
import { Profession } from './profession';
import { SocialNetwork } from './socialNetwork';

export interface PersonModel {
  id: string;
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
