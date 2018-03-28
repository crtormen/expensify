import * as firebase from 'firebase'; //import all named exports and store it in firebase object
import moment from 'moment';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
  };


firebase.initializeApp(config);

const database = firebase.database();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export { firebase, googleAuthProvider, database as default };

// const onChildRemoved = database.ref('expenses')
//     .on('child_removed', (snapshot) => {
//         console.log("Removed: ", snapshot.key, snapshot.val());
// });

// const onChildChanged = database.ref('expenses')
//     .on('child_changed', (snapshot) => {
//         console.log("Changed: ", snapshot.key, snapshot.val());
// });

// const onChildAdded = database.ref('expenses')
//     .on('child_added', (snapshot) => {
//         console.log("Added: ", snapshot.key, snapshot.val());
// });

// const onValueChange = database.ref('expenses').on('value', (snapshot) => {
//     let expenses = [];

//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id:  childSnapshot.key,
//             ...childSnapshot.val()
//         });
//     });

//     console.log(expenses);
// });
    


// setTimeout(() => {
//     database.ref('expenses').push({
//         description: "Gas",
//         amount: 400,
//         note: 'important',
//         createdAt: '421218717374'
//     })
// }, 2000);
// database.ref('expenses').push({
//     description: 'Food',
//     amount: 3000,
//     note: 'important',
//     createdAt: '0913848783272'
// });
// database.ref('expenses').push({
//     description: 'accessories',
//     amount: 200,
//     note: '',
//     createdAt: '1201291281'
// });


// const onValueChange = database.ref().on('value', (snapshot) => {
//     const info = snapshot.val();
//     console.log(`${info.name} is a ${info.job.title} at ${info.job.company}`);
// }, (e) => {
//     console.log("Error with data fetching, ", e);
// })

// setTimeout(() => {
//     database.ref('job/title').set("CEO");
// }, 2000);

// database.ref().off(onValueChange);

// database.ref('job/title').set("Founder");

// database.ref().set({
//     name: 'Claudio Tormen',
//     age: 27,
//     stressLevel: 8,
//     job: {
//         title: 'Software Developer',
//         company: 'Datacom'
//     },
//     location: {
//         city: 'Porto Alegre',
//         country: 'Brasil'
//     }
// }).then(() => {
//     console.log("Data is saved");
// }).catch((e) => {
//     console.log("This failed. ", e);
// });

// database.ref().update({
//     age: 33,
//     stressLevel: 6,
//     'job/company': 'Mentor',
//     'location/city': 'Floripa'
// }).then(() => {
//     console.log("Data is updated");
// }).catch((e) => {
//     console.log("Update failed. ", e);
// });

// database.ref().remove()
//   .then(() => {
//     console.log("Remove succeeded");    
//   })
//   .catch((e) => {
//     console.log("Remove failed: ", e.message)
//   })