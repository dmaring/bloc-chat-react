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
      <div className='top-container'>
        <button onClick={this.handleSignInClick}>Sign in</button>
        <button onClick={this.handleSignOutClick}>Sign out</button>
        <div className='user-display'>
          <p>{this.props.activeUser ? "Hello, " + this.props.activeUser.displayName : "Hello, Guest"}</p>
        </div>
      </div>
    )
  }
}

export default User;
