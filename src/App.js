import React, { Component } from 'react';
import * as firebase from 'firebase';
import { FirebaseConfig } from "./config/keys.js";
import './App.css';
import Chatroom from './components/Chatroom.js';
import RoomList from './components/RoomList.js';

// Initialize Firebase
firebase.initializeApp(FirebaseConfig);

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
