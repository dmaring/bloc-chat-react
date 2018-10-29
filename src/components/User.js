import React, {Component} from 'react';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSignInClick = this.handleSignInClick.bind(this);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  };

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  handleSignInClick(){
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider)
  }

  handleSignOutClick() {
    this.props.firebase.auth().signOut();
  }

  render(){
    return(
      <div>
        <button onClick={this.handleSignInClick}>Sign in</button>
        <button onClick={this.handleSignOutClick}>Sign out</button>
        <div>
          {this.props.activeUser ? "Hello " + this.props.activeUser.displayName : "Guest"}</div>
      </div>
    )
  }
}

export default User;
