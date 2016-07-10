const Firebase = require('firebase');

const firebase = Firebase.initializeApp({
  apiKey: "AIzaSyAI3T71Zx0acIQzwzsUVOZr8zk7DCy111s",
  authDomain: "helperupper.firebaseapp.com",
  databaseURL: "https://helperupper.firebaseio.com",
  storageBucket: "helperupper.appspot.com",
  serviceAccount: JSON.parse(process.env.CREDENTIALS) || "./config/credentials.json"
});

module.exports = firebase;
