import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMessages: []
    }

    this.messagesRef = this.props.firebase.database().ref('Messages');
    }

  componentWillMount() {
      this.setState({
        activeMessages: []
      })
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = {
          content: snapshot.child("content").val(),
          sender: snapshot.child("name").val(),
          sentAt: snapshot.child("sentAt").val(),
          roomId: snapshot.child("roomId").val(),
          key: snapshot.key
          };

      console.log(message);
      this.setState({ activeMessages: this.state.activeMessages.concat( message ) });
      })
  }

  updateRoomMessages(room) {
    let temp = [];
    this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom.key).on('child_added', snapshot => {
      const message = {
          content: snapshot.child("content").val(),
          sender: snapshot.child("name").val(),
          sentAt: snapshot.child("sentAt").val(),
          roomId: snapshot.child("roomId").val(),
          key: snapshot.key
          };
      temp.push(message);
      console.log(message);
      this.setState({ activeMessages: temp });
    })

  }



  render() {
    const activeRoom = this.props.activeRoom.key;

    let result = this.state.activeMessages.map((message, index) => {
      console.log(activeRoom + " active room from messages");
      console.log(message.roomId + " message room id from messages");

      if (message.roomId == activeRoom) {
        return <li key={message.key}>
          <div className='chatline'>
            {message.sender} <br></br>
            {message.content}
            <div>
              {message.sentAt}
            </div>
          </div>
        </li>;
      }
    });

    return (
      <div className="chat-container">
        <div>{this.props.activeRoom ? this.props.activeRoom.name: " "}</div>
        <ul className='chatgroup-list'>
          { result }
        </ul>
        <div className="chat-input-container">
          <input className="chat-input-text" type="text" name="chat-text"></input>
          <div className="chat-input-submit">
            <div className="send-button-text">
              <h4>Send</h4>
            </div>
          </div>
        </div>
      </div>
        );
  }
}

export default MessageList;
