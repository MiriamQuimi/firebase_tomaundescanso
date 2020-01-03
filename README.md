### Simple firebase authentication component for reactjs apps.

This module has two components-- One for authentcation and another for displaying the status/logout. The **FirebaseAuth** component contains the login and register page. Where as the **AuthStatusButton** is a button compoent to show the loggedin user. Clicking on it will logout the user. You can use the **AuthStatusButton** in the navbar.

### Usage



 **Step 1**

` import FirebaseAuth, { AuthStatusButton } from "./login"; `

 **Step 2**

Then create a firebase configuration object. You can get this from your firebase project console. 

```

this.config = {
      apiKey: "AIzaSyB8bjuXzrereV1fJNKHDvicd6MToB-XJ8gxk",
      authDomain: "test-43tu8.firebaseapp.com",
      databaseURL: "https://test-43tu8.firebaseio.com",
      projectId: "test-50a74",
      storageBucket: "test-43tu8.appspot.com",
      messagingSenderId: "4464544544d55",
      appId: "1:4654454546:web:dfds6f4df6d4fd4"
    };

``` 
 **Step 3**

```
render() {
    return (
      <div>
        <FirebaseAuth fireBaseConfig={this.config} />
      </div>
    );
  }

  ```

  Pass firebase configuration object as the props. ` fireBaseConfig={this.config} `

  ### Display the loggedin user and logout button
  ` <AuthStatusButton login_link="/login" /> `

Props:
login_link= 'route to login path'
Example: `  login_link="/login" ` 
If the user is not loggedin, a link to login will be displayed else a button to logout. 
