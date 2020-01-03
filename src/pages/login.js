import React, { Children } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import firebase from "firebase";
import Button from "@material-ui/core/Button";
// import firebase from "./firebase_config";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { isNull, isNullOrUndefined } from "util";

import { NavLink } from "react-router-dom";

class Login extends React.Component {
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
      grupo: " ",
      error: " ",
      userlist: [""],
      user_details: null,

      google_provider: new firebase.auth.GoogleAuthProvider(),
      fb_provider: new firebase.auth.FacebookAuthProvider(),
      twitter_provider: new firebase.auth.TwitterAuthProvider(),
      github_provider: new firebase.auth.GithubAuthProvider()
    };

    firebase.initializeApp(this.config);
    this.db = firebase.database();
  }

  login_handler = provider => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        var token = result.credential.accessToken;
        var user = result.user;
        this.setState({ user_details: user });
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        this.setState({ error: errorMessage });

        // ...
      });
  };

  handle_email_change = e => {
    this.setState({ email: e.target.value });
  };

  handle_password_change1 = e => {
    this.setState({ password1: e.target.value });
  };

  handle_grupo = e => {
    this.setState({ grupo: e.target.value });
  };

  create_new_user = () => {
    const refgrupo = this.db.ref("grupo");
    const refusers = this.db.ref("usuario");
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password1)
      .then(
        refusers
          .orderByChild("grupo")
          .equalTo(this.state.grupo)
          .on("value", snapshot => {
            let usuarios = [];
            snapshot.forEach(child => {
              usuarios = [child.key.substring(1), ...usuarios];
              console.log(usuarios);
              this.setState({ userlist: usuarios });
            });
            refgrupo.push().set({
              nombre: this.state.grupo,
              admin: this.state.email,
              usuarios: this.state.userlist
            });
          })
      )

      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.setState({ error: errorMessage });
      });
    window.location = "/stats";
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
      <div className="w3-margin w3-container">
        <div className="w3-padding email_login w3-round">
          <h2 className="w3-margin"> Registrarse </h2>
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="email"
            placeholder="Email"
            onChange={this.handle_email_change}
          />
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="password"
            placeholder="Contraseña"
            onChange={this.handle_password_change1}
          />
          <input
            className="w3-input w3-border w3-margin-bottom"
            type="text"
            placeholder="Grupo"
            onChange={this.handle_grupo}
          />
          <button
            className="w3-button w3-teal"
            component={Link}
            to="/stats"
            onClick={this.create_new_user}
          >
            Registrar
          </button>

          {/* ------------------------------ */}
        </div>
        {/* ------------------------------ */}
      </div>
    );
  }
}

export { Login as default };
