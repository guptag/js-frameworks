
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

export class ConsoleLogger implements ILoggable {
    log() {
         for (let id in this) {
            if (!this.hasOwnProperty(id)) {
                console.log(`id:{id}, value: {this[id]}`);
            }
        }
    }
}