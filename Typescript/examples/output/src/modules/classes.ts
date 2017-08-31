
import {IPerson, ILoggable} from './interfaces';

// Class
export class Person implements IPerson {
  public firstName: string;
  public lastName: string;

  constructor(fn: string, ln:string) {
    this.firstName = fn;
    this.lastName = ln;
  }
}

class ConsoleLogger implements ILoggable {
    log() {
        // ...
    }
}