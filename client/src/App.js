import React from 'react';
import './App.css';
import LoginPage from './components/LoginPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: '',
    };
  }

  showLoginPage = () => {
    this.setState({ showLoginPage: true });
  }

  callApi() {
    fetch('http://localhost:9000/testApi')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callApi();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <LoginPage></LoginPage>
          <p>Don't have an account?</p>
          <button>Sign Up</button>
          <p>{this.state.apiResponse}</p>
        </header>
      </div>
    );
  }
}

export default App;
