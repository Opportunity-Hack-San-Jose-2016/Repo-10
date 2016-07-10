const Firebase = require('firebase');


credentials = "./config/credentials.json"
if (process.env.CREDENTIALS) {
	credentials = JSON.parse(process.env.CREDENTIALS)
}

const firebase = Firebase.initializeApp({
  apiKey: "AIzaSyAI3T71Zx0acIQzwzsUVOZr8zk7DCy111s",
  authDomain: "helperupper.firebaseapp.com",
  databaseURL: "https://helperupper.firebaseio.com",
  storageBucket: "helperupper.appspot.com",
  serviceAccount: credentials
});

module.exports = firebase;
