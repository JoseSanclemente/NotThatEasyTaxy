import React, { Component } from 'react';
import { BrowserRouter as Router} from 'react-router-dom'
import Route from 'react-router-dom/Route'
import UserLogin from './components/User-Login/UserLogin'
import UserSignUp from './components/User-SignUp/UserSIgnUp'
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route path='/' exact strict render = {
            () => {
              return (<UserLogin/>) 
            }
          }/>

          <Route path='/user-signup' exact strict render = {
            () => {
              return (<UserSignUp/>) 
            }
          }/>
          
        </div>
      </Router>
       
    ); 
  }
}

export default App;
