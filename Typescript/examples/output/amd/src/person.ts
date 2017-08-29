export interface IPerson {
  firstName: string;
  lastName: string;
}

export class Person implements IPerson {
  public firstName: string;
  public lastName: string;

  constructor(fn: string, ln:string) {
    this.firstName = fn;
    this.lastName = ln;
  }
}

export enum Region {
  East,
  West,
  Central
}

export const Constants = {
  Test: "test",
  Test1: "test1"
}