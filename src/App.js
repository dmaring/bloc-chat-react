import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import Chatroom from './components/Chatroom.js';
import RoomList from './components/RoomList.js';

// Firebase config
const config = {apiKey: "AIzaSyDj-uohZGkixW8r4j9jjbsYZo7q9nTE8aQ",
authDomain: "bloc-chat-react-d31ec.firebaseapp.com",
databaseURL: "https://bloc-chat-react-d31ec.firebaseio.com",
projectId: "bloc-chat-react-d31ec",
storageBucket: "bloc-chat-react-d31ec.appspot.com",
messagingSenderId: "853809125214"
};


// Initialize Firebase
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <main>
          <div className="view-container">
            <RoomList firebase={firebase}/>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
