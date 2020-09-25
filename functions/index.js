// /*eslint-disable */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();


exports.addUser = functions.auth.user().onCreate((user) => {
  console.log(user);
  console.log(user.email);

  const uid = user.uid;
  const userFields = {
    email: user.email,
    name: user.displayName,
    total_txs: 0,
  }
  console.log(userFields);

  //add uid to the users collection
  async function setData() {
    await db.collection('users').doc(uid).set(userFields);
  }
  setData();
  return 0;

});



// /*eslint-enable */

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
