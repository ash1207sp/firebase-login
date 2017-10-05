import React, { Component } from 'react';

var firebase = require('firebase');
require('firebase/auth');
require('firebase/database');

// Initialize Firebase
var config = {
  apiKey: "AIzaSyC_pxkvFj9Ov-cL1rhqLYQsLKcSxqWcbEg",
  authDomain: "fir-login-85d6f.firebaseapp.com",
  databaseURL: "https://fir-login-85d6f.firebaseio.com",
  projectId: "fir-login-85d6f",
  storageBucket: "fir-login-85d6f.appspot.com",
  messagingSenderId: "876583588466"
};
firebase.initializeApp(config);


class Authen extends Component{

  login(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var logout = document.getElementById('logout');
      var error = "You are logged in";
      logout.classList.remove('hide');
      this.setState({error: error});
    })
    .catch(e => {
      var error = e.message;
      console.log(error);
      this.setState({error: error});
    });
  }

  signin(){
    const email = this.refs.email.value;
    const password = this.refs.password.value;
    console.log(email, password);

    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, password);

    promise
    .then(user => {
      var error = "Welcome "+ user.email;
      firebase.database().ref('users/'+user.uid).set({
        email: user.email
      });
      console.log(error);
      this.setState({error: error});
    })
    .catch(e => {
      var error = e.message;
      console.log(error);
      this.setState({error: error});
    });
  }

  logout(){
    const logout = document.getElementById('logout');
    logout.classList.add('hide');

    const auth = firebase.auth();

    const promise = auth.signOut();

    promise
    .then(user => {
      var error = "Thank you. You are logged out !"
      this.setState({error: error});
    })
    .catch(e => {
      var error = e.message;
      console.log(error);
      this.setState({error: error});
    });
  }

  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
    this.login = this.login.bind(this);
    this.signin = this.signin.bind(this);
    this.logout = this.logout.bind(this);
  }


  render(){
    return(
      <div>
        <input id='email' ref='email' type='email' placeholder='Enter your email' /><br />
        <input id='pass' ref='password' type='password' placeholder='Enter your password' /><br />
        <p>{this.state.error}</p>
        <button onClick={this.login} type="login">LOG IN</button>
        <button onClick={this.signin} type="signin">SIGN IN</button>
        <button onClick={this.logout} id="logout" className="hide" type="logout">LOG OUT</button>
      </div>
    );
  }
}

export default Authen;
