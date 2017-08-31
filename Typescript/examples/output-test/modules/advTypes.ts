
// Union Types


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


// Index Types


// Mapped Types - Readonly


// Mapped Types - Partial


// Mapped Types - Proxy


