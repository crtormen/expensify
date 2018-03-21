const person = {
    name: 'Claudio',
    age: '31',
    location: {
        city: 'Porto Alegre',
        temp: 28
    }
};


//Default value (=) and Renaming (:)
const { name: firstName = 'Anonymous', age } = person;
//is the same that const name = person.name and const age = person.age


const { city: actualCity, temp : temperature } = person.location;


console.log(`${firstName} is ${age}.`);
console.log(`it's ${temperature} in ${actualCity}`);


/****** Array *******/

const address = ['Felipe Neri, 296', 'Porto Alegre', 'Rio Grande do Sul','90440-150'];

const [street, city, state, zip] = address;

console.log(`You are in ${city}, ${state}.`)


/******** Coffee ********/
const item = ['Coffee (hot)', '$2,00', '$2,50', '$2,75'];

const [product, , mediumPrice] = item;

console.log(`A medium ${product} costs ${mediumPrice}.`);

/****** ADD *******/
const add = (data, c) => (data.a + data.b + c);
console.log(add({a: 1, b: 12}, 100));

//é o mesmo que
const add2 = ({a, b}, c) => (a + b + c);
console.log(add({a:1, b:12}, 100));