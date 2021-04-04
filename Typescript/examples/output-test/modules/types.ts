import {Action, GetItemsPayload, DeleteItemsPayload} from './interfaces';

// String literal Types
export type Easing = "ease-in" | "ease-out" | "ease-in-out";

// Generics
export class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}

// Type Aliases
export type GetItems = string;
export type GetItemsAction = Action<GetItems, GetItemsPayload>;
export type DeleteItemsAction = Action<"DeleteItems", DeleteItemsPayload>;

// Type alias refering to itself
export type Tree<T> = {
    value: T;
    left: Tree<T>;
    right: Tree<T>;
}
export type LinkedList<T> = T & { next: LinkedList<T> };


// Type Guards
export function IsGetItemsAction(action: UIAction): action is GetItemsAction {
  return  (<GetItemsAction>action).type === "GetItems";
}

// Union Types
export type UIAction = GetItemsAction | DeleteItemsAction;

// Intersection Types
export function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}


// Disciminated Unions


// Polymorphic Types
export class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
}

export class ScientificCalculator extends BasicCalculator {
    public constructor(value = 0) {
        super(value);
    }
    public sin() {
        this.value = Math.sin(this.value);
        return this;
    }
}

/*let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();

// Without this types, ScientificCalculator would not have been able to extend BasicCalculator and keep the fluent interface.
// multiply would have returned BasicCalculator, which doesn’t have the sin method.
// However, with this types, multiply returns this, which is ScientificCalculator here.
let v = new ScientificCalculator(2)
        .multiply(5)
        .sin()
        .add(1)
        .currentValue();*/

// Index Types
export function pluck<T, K extends keyof T>(obj: T, names: K[]): T[K][] {
    return names.map(n => obj[n]);
}

/*interface Person {
    name: string;
    age: number;
}

let person: Person = {
    name: 'Jarid',
    age: 35
};

let strings: string[] = pluck(person, ['name']); // ok, string[]*/


// Mapped Types - Readonly
/*
interface PersonReadonly {
    readonly name: string;
    readonly age: number;
}
type ReadonlyPerson = Readonly<Person>;
*/
export type ReadOnly<T> = {
    readonly [P in keyof T]: T[P];
}


// Mapped Types - Partial
/*
interface PersonPartial {
    name?: string;
    age?: number;
}
type PersonPartial = Partial<Person>;
*/
export type Partial<T> = {
    [P in keyof T]?: T[P];
}

// Mapped Types
/*type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };
type Flags = {
    option1: boolean;
    option2: boolean;
}*/

// Mapped Types - Proxy











