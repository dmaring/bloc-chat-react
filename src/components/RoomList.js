import React, { Component } from 'react';
import Modal from './Modal.js';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      show: "display-none",
      newRoom: "",
    };

    this.roomsRef = this.props.firebase.database().ref('Rooms');

    this.showModal = () => {
      this.setState({ show: "display-block" });
    };

    this.hideModal = () => {
      this.setState({ show: "display-none" });
    };
  }

  componentDidMount() {
    // listener that triggers callback every time new room is added
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      // console.log(room);
      this.setState({ rooms: this.state.rooms.concat( room ) });
    })
  }



  handleRoomAddClick() {
    this.roomsRef.push({
      name: this.state.newRoom
    });
    this.setState({ newRoom: "" });
    this.hideModal();
  }

  handleRoomOnChange(e) {
    const newRoom = e.target.value;
    this.setState({ newRoom: newRoom });
  }

  isActiveRoom(room) {
    if (room.key === this.props.activeRoom.key) {
      // console.log(room.key, this.props.activeRoom.key);
      return ("room-name-text-active");
      } else {
      return ("room-name-text");
    }
  }

  render() {
    return (
      <div className="nav-side-bar">
        <div className="logo">
          <h1>BlocChat</h1>
        </div>
        <Modal show={this.state.show} handleClose={this.hideModal} onRoomChange={(e) => this.handleRoomOnChange(e)} handleRoomAddClick={() => this.handleRoomAddClick()} newRoom={this.state.newRoom} />
        <div className="new-chatroom-button-container">
          <div className="new-chatroom-button" onClick={this.showModal}>
            Add new room
          </div>
        </div>
        <ul className="room-ul">
          {
            this.state.rooms.map((room) =>
              <li data-key={room.key} className={this.isActiveRoom(room)}  key={room.key} onClick={this.props.handleSetRoom}>
                {room.name}
                </li>
            )
          }
        </ul>
      </div>
    );
  }
}

export default RoomList;
