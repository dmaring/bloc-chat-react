import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyDj-uohZGkixW8r4j9jjbsYZo7q9nTE8aQ",
  authDomain: "bloc-chat-react-d31ec.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-d31ec.firebaseio.com",
  projectId: "bloc-chat-react-d31ec",
  storageBucket: "bloc-chat-react-d31ec.appspot.com",
  messagingSenderId: "853809125214"
};

var firedb = firebase.initializeApp(config);

export default firedb;
