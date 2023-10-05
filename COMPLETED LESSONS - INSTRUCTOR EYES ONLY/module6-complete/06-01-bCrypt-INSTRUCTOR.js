'use strict';
const express     = require('express');
const bodyParser  = require('body-parser');
const app         = express();

//////////////**********************//////////////
///////////////PCC Module 6 Challenges////////////
//////// Information Security w/ HelmetJS ////////
//////////////**********************//////////////

// # 12 ) Understand BCrypt Hashes

const bcrypt = require('bcrypt')


// # 13 ) Hash and Compare Passwords Asynchronously
//Example data: 
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';

//START_ASYNC - place code between correct pair of notes.

// bcrypt.hash(myPlaintextPassword, saltRounds, (error, hash) => { //hash the user input
//     if ( error ) return console.log(error)
//     console.log(hash)                                        // console.log the hash itself - save as var
//     bcrypt.compare(myPlaintextPassword, hash, (error, result) => { /// then in cb, .compare with the user input - vs hashed pw
//         if (error) return console.log(error)
//         console.log( `The Result of the input vs the hash is ${result}.`) // result is bool
//     })
// })

const hashedLine19 = "$2b$12$O3/RahCzdcUuaR0bqBWd9.w2swhafXLHM0YetuzRiQJFrc6MSds2m"

// bcrypt.compare(myPlaintextPassword, hashedLine19, (error, result) => {
//     if (error ) return error;
//     console.log(result)
// })



// # 14 )  Hash and Compare Passwords Synchronously

// this is useful when you want code to run synchronously / in order - for logins etc - both work 
//START_SYNC
let pass = myPlaintextPassword
let salts = 9;

let syncHash = bcrypt.hashSync(pass, salts)
console.log(syncHash)

let result = bcrypt.compareSync(myPlaintextPassword, hashedLine19); // checking the last challenge hash vs hashSync - works.

console.log(result)
































app.listen(process.env.PORT || 3000, () => {console.log('...Server running on port 3000...')});
