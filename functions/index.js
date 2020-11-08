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
    await db.collection('users').doc(uid).collection('txs').add({
      receipt: {},
      date: Date.now(),
      number: 0,
    });
    await db.collection('users').doc(uid).collection('items').add({
      icon: '🍔',
      name: 'My-First-Item',
      price: 14,
      options: {
        extra_sauce: true
      }
    });
  }
  setData();
  return 0;

});

//called when user is logged in
//gets the items collection for each user
exports.fetchItems = functions.https.onCall((data, context) => {

  console.log("fetchItems is run");

  //reference to the items collection for a particular user
  
  const itemsRef = db.collection('users').doc(data).collection('items');
  

  var items = [];
  async function fetchRef(){
    const snapshot = await itemsRef.get();
    snapshot.forEach(doc => {
      items.push({[doc.id]: doc.data()});
    });
    console.log(items);
    return items;
  }
  return fetchRef();

});



// /*eslint-enable */

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
