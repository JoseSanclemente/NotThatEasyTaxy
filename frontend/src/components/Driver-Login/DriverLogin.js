import React, { Component } from 'react';
import logo from './img/logo.png'
import './DriverLogin.css';

class UserLogin extends Component {
  render() {
    return (
      <div className="Login">
          <div className="Login-Container">
            <img src={logo}/>
            <label for="username">Usuario</label>

            <input type="text" placeholder=" Ingresar usuario"/>
            <input type="password" placeholder=" Ingresar contraseña"/>
            <input type="submit" value="Iniciar Sesión"/>
            
            <p className="Login-NewUser" for="newUser">¿Nuevo Usuario? 
              <a href="/driver-signup" > Registrate aquí</a> 
            </p>   
          </div>
        </div>
    ); 
  }
}

export default UserLogin;
