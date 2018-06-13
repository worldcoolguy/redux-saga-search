import React, { Component } from 'react';
import {Container,Row,Col} from 'reactstrap'
import './App.css';
import SearchForm from './SearchForm';


class App extends Component {
  constructor(props) {
    super(props);
    this.fetchGit = this.fetchGit.bind(this);
    const {initval} = this.props;
    //console.log("---");console.log(initval);
    this.fetchGit(initval);
  }
  fetchGit(options) {
    this.props.fetchGit(options);
  }
  render() {
    const {loading,userdata,initval} = this.props;
    //console.log(userdata)
    return (
      <Container>
        <Row>
          <Col align = 'center' className="title-class">
            <h1>GitHub Gallery Saga</h1>
          </Col>
        </Row>
        <Row>
          <Col className="ml-20">
            <SearchForm onSubmit={this.fetchGit} initValues={initval}/>
          </Col>
        </Row>
        { loading && <div className = "loading">
          <img src="./loading.gif" alt ="loading"/>
        </div> }
        { !loading && userdata && userdata.length > 0 &&
          userdata.map((user, index) => {
            return (
              <Row key={index} >
                <Col> <div className="block-class">
                  <img src={user.owner.avatar_url} alt="avatar" className="avatar-class"/>
                  <a href={user.owner.html_url}><h5>{user.owner.login}</h5></a><br />
                  <a href={user.html_url}><h5>{user.name}</h5></a>
                  </div>
                </Col>
              </Row>)
          })
        }
      </Container>
    );
  }
}

export default App;
