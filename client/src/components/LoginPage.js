import React from 'react';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  sendPostRequest = () => {
    fetch('http://localhost:9000/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: 'yourOtherValue',
        })
      })
  } 

  render() {
    return (
        <form className='Login-form'>
            <input placeholder='Username'></input>
            <input placeholder='Password'></input>
            <button onClick={this.sendPostRequest}>Login</button>
        </form>
    );
  }
}

export default LoginPage;
