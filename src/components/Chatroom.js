import React, { Component } from 'react';


class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state= {
      rooms: [],
      currentRoom: 'room[0]'
    }
  };


  getchatline = function(chatline, index) {
    if (index % 2 === 0) {
      return (
      <div className="chatline" key={index}>
        {chatline.text}
      </div>
      )
    } else {
    return (
      <div className="chatline odd" key={index}>
        {chatline.text}
      </div>
      )
    }
  }

  fullchat = function(room, index) {
    //get the list of chatlines from from rooms
    const chatRoomIndex = this.state.rooms.findIndex(function(chatroom) {
      return chatroom.name === room
        }
      );
    console.log(chatRoomIndex);
    const chatLines = this.state.rooms[0].chatlines;
    //pass each room line to the chatline() method
    return (
      chatLines.map((chatline, index) =>
      this.getchatline(chatline, index)
      )
    )
  }



  render() {
    return (
        <section>
          
          {/* <div className="chat-container">
            {this.fullchat(this.state.currentRoom)}
            <div className="chat-input-container">
              <input className="chat-input-text" type="text" name="chat-text" />
              <div className="chat-input-submit">
            <div className="send-button-text">
            <h4>Send</h4>
            </div>
              </div>
            </div>
          </div> */}
        </section>
    );
  }
}

export default Chatroom;
