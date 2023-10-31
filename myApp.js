require('dotenv').config();

/** 1) Install & Set up mongoose */
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

/** 2) Create a 'Person' Model */
var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
const Person = mongoose.model('Person', personSchema);
const  createAndSavePerson = function(done) {
  const janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};


/** 4) Create many People with `Model.create()` */
var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

var createManyPeople = function(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
};




/** 5) Use `Model.find()` */
var findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
}; 

/*
// Call the findPeopleByName function
findPeopleByName('Sol', function(err, personFound) {
  if (err) {
    console.error('An error occurred:', err);
    return;
  }

  // Print out the found result
  console.log('Found people:', personFound);
});
*/

/** 6) Use `Model.findOne()` */
var findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};


/** 7) Use `Model.findById()` */
var findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};


/** 8) findEditThenSave */

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};


/** 9) findAndUpdate */

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};



/** 10) findByIdAndRemove() */

var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

/** 11) removeManyPeople */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) return console.log(err);
    done(null, response);
  })
};


/** 12) queryChain */


const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
      .sort({ name: 1 })
      .limit(2)
      .select({ age: 0 })
      .exec(function (err, deletedPersons) { 
        return (err) ? done(err) : done(null, deletedPersons)
        });
};



/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
