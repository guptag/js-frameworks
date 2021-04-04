import { Person, ConsoleLogger } from '../../../modules/classes';
import { extend } from '../../../modules/advTypes';


// Testing intersection types
var testUser = extend(new Person("Test", "User"), new ConsoleLogger());
console.log(testUser.log());

