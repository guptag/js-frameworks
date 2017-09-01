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

export type LinkedList<T> = T & { next: LinkedList<T> };




// Disciminated Unions


// Polymorphic Types


// Index Types


// Mapped Types - Readonly


// Mapped Types - Partial


// Mapped Types - Proxy











