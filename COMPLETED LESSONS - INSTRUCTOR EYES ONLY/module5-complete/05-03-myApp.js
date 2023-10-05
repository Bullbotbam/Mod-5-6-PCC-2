require('dotenv').config();
const mongoose = require("mongoose");


//Challenge 1: 
const Schema = mongoose.Schema;

const db = process.env.MONGO_URI

mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log(".... connected to db !!!"))
  .catch(err => console.log(err))

///Challenge 2:

let PersonSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  favFoods: [{
    type: String,
    required: true
  }]
});

let Person = mongoose.model("Person", PersonSchema);

//
///Challenge 3: 
let aPerson = {
  name: "Mr Biggs - refactor",
  age: 25,
  favFoods: ["Rice", "Soup"]
};

const createAndSavePerson = (createMe, done) => {
  create = new Person(createMe)
  create.save((err, thePersonCreated) => {
    if (err) {
      console.log(err);
      throw err
    } else {
      console.log(thePersonCreated)
      return thePersonCreated
    }
    
  })
};

createAndSavePerson(aPerson);


// challenge 4: 

const createManyPeople = (makeThesePeople, done) => {
  Person.create( makeThesePeople, (err, peopleMade ) => {
    if (err) return err;
    console.log(peopleMade);
    return peopleMade;
  })
};

let thePeopleToMake = [{
  name: "Jaggers",
  age: 0,
  favFoods: [ "Soup"]
},
{
  name: "Garcia",
  age: 0,
  favFoods: ["Rice"]
},
{
  name: "Ireland",
  age: 0,
  favFoods: ["Rice", "Soup"]
}

]

// createManyPeople(thePeopleToMake);


//challenge 5: 
const findPeopleByName = (personName, done) => {
  Person.find({name: personName }, (err, data) => {
    if (err) throw err;
    console.log(data)
    return data
  })
};
// findPeopleByName("Ireland");


//Challenge 6: 
const findOneByFood = (food, done) => {
  Person.findOne({ favFoods: food }, (err, foundFood ) => {
    if (err) throw err;
    console.log(foundFood);
    return foundFood;
  })
  };
  // findOneByFood("Rice")

  //Challenge 7

  const findPersonById = (personId, done) => {
    Person.findById( { _id: personId }, (err, personFound) => {
      if ( err ) throw err;
      console.log(personFound)
      // res.json(personFound)
      return personFound;
    } )
    
    };
    
    var testId = "6320c9e6d9dd4095d3908e6a";
    // findPersonById(testId)


    const foodToAdd = "tacos";
    //Challenge 8: 

const findEditThenSave = (personId, addtoFoods, done) => {
  Person.findById({_id: personId}, (err, personFound) => {
    if (err) throw err;
    personFound.favFoods.push(addtoFoods);
    personFound.save( (err, updatedPerson)=> {
      if (err) throw err;
      console.log(updatedPerson);
      return updatedPerson;
    })
  })
};

// findEditThenSave(testId, foodToAdd) //the call that runs it 


// Challenge 9:
const findAndUpdate = (personName, ageToSet, done) => {
  Person.findOneAndUpdate({name: personName}, 
                          {age: ageToSet}, 
                          {new: true}, 
                          (err, updatedPerson) => {
                              if ( err ) throw err;
                              console.log(updatedPerson)
                              return updatedPerson
  } )
};


// findAndUpdate("Mr Biggs", 77)


//challenge 10
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if ( err ) throw err;
    console.log(deletedPerson)
    return deletedPerson;
  })
};

// removeById("6320c9e6d9dd4095d3908e6a")
// findPersonById("6320c9e6d9dd4095d3908e6a")
// findOneByFood("Rice")


// Challenge 11:
const nameToRemove = "Ireland";


const removeManyPeople = (theName, done) => {
  Person.remove({name: theName}, (err, data) => {
    if ( err) throw err;
    console.log(data)
    return data;
  })
};

// removeManyPeople(nameToRemove)

const foodToSearch = "Rice";
//Challenge 12:
const queryChain = (searchFor, done) => {
  Person.find({ favFoods: searchFor })
              .sort({ name: "asc" })
              .limit(5)
              .select("-age")
              .select("-favFoods")
              .exec((err, sortedPeople ) => {
                if (err) throw err;
                console.log(sortedPeople);
                return sortedPeople
              })
};

// queryChain(foodToSearch);

// /** **Well Done !!**
// /* You completed these challenges, let's go celebrate !
//  */

// //----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

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
