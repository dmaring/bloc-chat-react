import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
    this.roomsRef = this.props.firebase.database().ref('Rooms');
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    })
  }

  render() {
    return (
      <div className="nav-side-bar">
        <div className="logo">
          <h1>BlocChat</h1>
        </div>
        <ul className="room-ul">
          {
            this.state.rooms.map((room) =>
              <li className="room-name-text" key={room.key}>
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
