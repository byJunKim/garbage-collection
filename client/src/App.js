import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: 'No response', selectedFile: null };
    this.onDrop = this.onDrop.bind(this);
  }

  callApi() {
    fetch('http://localhost:9000/api')
      .then((res) => res.text())
      .then((res) => this.setState({ apiResponse: res }))
      .catch((err) => err);
  }

  componentDidMount() {
    this.callApi();
  }

  onDrop(img) {
    this.setState({
      selectedFile: img,
    });
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  uploadFile() {
    const imgData = new FormData();
    console.log('file', this.state.selectedFile)
    imgData.append('file', this.state.selectedFile[0]);

    axios.post('http://localhost:9000/api/upload', imgData, {
    })
      .then((res => {
        console.log('res', res.statusText)
      }));
  }

render() {
    return (
      <div className="App" >
        <header className="App-header" style = {{background: "linear-gradient(180deg, #38EF7D 0%, rgba(255, 255, 255, 0) 100%), #11998E"}}>
        <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
          <Button onClick= {this.uploadFile.bind(this)}>Is it Recyclable?</Button>
          <p>[{this.state.apiResponse}]</p>
          
        </header>
        
      </div>
    );
  }
}

export default App;

