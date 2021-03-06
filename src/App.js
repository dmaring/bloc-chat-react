import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import MessageList from './components/MessageList.js';
import RoomList from './components/RoomList.js';
import User from './components/User.js';

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
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: {
        name: "room1",
        key: "1"
      },
      activeUser: ""
      }
  };

  handleSetRoom(e) {
    this.setState({
      activeRoom: {
        name: e.target.innerHTML,
        key: String(e.target.dataset.key)
      }
    });
  }

  handleSetUser(user) {
    this.setState({
      activeUser: user
    })
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <main>
          <User
            setUser={(user) => this.handleSetUser(user)}
            firebase={firebase}
            activeUser={this.state.activeUser}
          />
          <div className="view-container">
            <RoomList
              firebase={firebase}
              handleSetRoom={(e) => this.handleSetRoom(e)} activeRoom={this.state.activeRoom}
            />
            <MessageList
              firebase={firebase}
              activeRoom={this.state.activeRoom}
              activeUser={this.state.activeUser}
            />

          </div>
        </main>
      </div>
    );
  }
}

export default App;
