import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import firebase from "firebase";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Iniciar extends React.Component {
  constructor(props) {
    super(props);
    this.config = {
      apiKey: "AIzaSyCcAbh51zL7PXfKkYTwV3w0iaJkBsgAr-I",
      //authDomain: "test-50a74.firebaseapp.com",
      databaseURL: "https://tomaundescanso-4134d.firebaseio.com"
      // projectId: "test-50a74",
      //storageBucket: "test-50a74.appspot.com",
      // messagingSenderId: "785976169922",
      //appId: "1:785976169922:web:987f31cb133ec419"
    };
    this.state = {
      email: "",
      password1: "",
      password2: " ",
      error: " ",
      user_details: null
    };
    firebase.initializeApp(this.config);
  }

  handle_email_change = e => {
    this.setState({ email: e.target.value });
  };

  handle_password_change1 = e => {
    this.setState({ password1: e.target.value });
  };

  sign_in_with_email = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password1)
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ error: errorMessage });

        // ...
      });
    window.location = "/stats";
  };
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user_details: user });
      } else {
        this.setState({ user_details: null });
      }
    });
  };
  render() {
    return (
      <div className="w3-bar-block social_login w3-padding w3-round">
        <h2 className="w3-margin">Iniciar Sesion </h2>
        <input
          type="email"
          className="w3-input w3-border w3-margin-bottom"
          placeholder="Email"
          onChange={this.handle_email_change}
        />
        <input
          className="w3-input w3-border w3-margin-bottom"
          type="password"
          placeholder="Contraseña"
          onChange={this.handle_password_change1}
        />
        <button className="w3-button w3-teal" onClick={this.sign_in_with_email}>
          Iniciar Sesion
        </button>
      </div>
    );
  }
}

export { Iniciar as default };
