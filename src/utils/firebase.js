import firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyBv911RqDQQLIgJql6iiohGT9QdR8efcZE',
  authDomain: 'gabel-furniture.firebaseapp.com',
  databaseURL: 'https://gabel-furniture.firebaseio.com',
  projectId: 'gabel-furniture',
  storageBucket: 'gabel-furniture.appspot.com',
  messagingSenderId: '540273776049'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
