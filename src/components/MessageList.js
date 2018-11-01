import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMessages: [],
      newMessage: ''
    }
    this.messagesRef = this.props.firebase.database().ref('Messages');
  }

  componentWillMount() {
      this.setState({
        activeMessages: []
      })
  }

  convertEpochTime(time) {
    let newTime = new Date(time);
    newTime = newTime.toLocaleTimeString() + " " + newTime.toLocaleDateString();
    return newTime;
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = {
          content: snapshot.child("content").val(),
          sender: snapshot.child("sender").val(),
          sentAt: this.convertEpochTime(snapshot.child("sentAt").val()),
          roomId: snapshot.child("roomId").val(),
          key: snapshot.key
          };

      // console.log(message);
      this.setState({ activeMessages: this.state.activeMessages.concat( message ) });
      })
  }

  updateRoomMessages(room) {
    let temp = [];
    this.messagesRef.orderByChild('roomId').equalTo(this.props.activeRoom.key).on('child_added', snapshot => {
      const message = {
          content: snapshot.child("content").val(),
          sender: snapshot.child("sender").val(),
          sentAt: this.convertEpochTime(snapshot.child("sentAt").val()),
          roomId: snapshot.child("roomId").val(),
          key: snapshot.key
          };
      temp.push(message);
      // console.log(message);
      this.setState({ activeMessages: temp });
    })

  }

  handleMessageOnChange(e) {
    this.setState({
      newMessage: e
    })
  }

  createNewMessage() {
    const message = {
      content: this.state.newMessage,
      sender: this.props.activeUser.displayName,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.props.activeRoom.key,
      };
    console.log(message);
    this.messagesRef.push(message);
    }

  isEven(index) {
    console.log(index)
    return (index % 2 === 0 ? "chatline chatline-even" : "chatline");
  }


  render() {
    const activeRoom = this.props.activeRoom.key;

    let result = this.state.activeMessages.map((message, index) => {
      if (message.roomId === activeRoom) {
        return <li key={message.key}>
          <div className={this.isEven(index)}>
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
          <div className="messages-container">
            <div>
              {this.props.activeRoom ? this.props.activeRoom.name: " "}
            </div>
            <ul className='chatgroup-list'>
              { result }
            </ul>
          </div>
          <div className="chat-input-container">
            <input className="chat-input-text" type="text" name="chat-text" onChange={(e) => this.handleMessageOnChange(e.target.value)}>
            </input>
            <div className="chat-input-submit" >
              <div onClick={() => this.createNewMessage()} className="send-button-text">
                <h4>Send</h4>
              </div>
            </div>
          </div>
        </div>

        );
  }
}

export default MessageList;
