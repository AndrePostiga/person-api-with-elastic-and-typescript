/* eslint-disable no-unused-vars */

export enum BloodType {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

export interface Blood {
  type: BloodType;
  rhFactor: boolean;
}

export interface Health {
  diseases: Array<string>;
  disabilities: Array<string>;
  blood: Blood;
  smoker: boolean;
}
