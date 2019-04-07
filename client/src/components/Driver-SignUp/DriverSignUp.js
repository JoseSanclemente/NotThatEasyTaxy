import React, { Component } from 'react'
import './DriverSignUp.css'
import logo from './img/logo.png'

class UserSignUp extends Component {
    render(){
        return(
            <div className="SignUp">
                <div className="SignUp-Container">
                    <img src={logo}/>
                    <label for="userSign">Registrarse</label>
                    <input type="text" placeholder=" Nombre"/>
                    <input type="text" placeholder=" Número de celular"/>
                    <input type="text" placeholder=" Número de tarjeta"/>
                    <input type="password" placeholder=" Contraseña"/>

                    <input type="submit" value="Listo!"/>
                </div>
            </div>   
        )
    }
}

export default UserSignUp;