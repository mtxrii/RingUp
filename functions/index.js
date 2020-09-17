/*eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


exports.addUser = functions.auth.user().onCreate((user) => {
   console.log(user);
   console.log(user.email);
  });

/*eslint-enable */

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
