import React, { useState } from 'react'
import RegistrationForm from './Registerform';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import RecoverPw from './recoverPw'
import './login.css'



const Login = () => {

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

    return ( 



        <div className="Login">
        <div className="loginContainer">
          <br></br>
          <h1>Iniciar Sesion</h1>
  
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
            {/* {renderErrorMessage("pass")} */}
          </div>
  
        <div className="links">

          <a href="#" onClick={handleShow2}>Olvidaste la contraseña?</a>
          <a href="#"onClick={handleShow} >Crear nueva cuenta </a>
  
          </div>

          <button className="loginBut" >
            <p>Login</p>
          </button>

              <RecoverPw show={show2} handleClose={handleClose2} handleShow={handleShow2} className="my-custom-modal2" ></RecoverPw>
              <RegistrationForm show={show} handleClose={handleClose} handleShow={handleShow} className="my-custom-modal"></RegistrationForm>

              
  
        </div>
        
          </div>
      
     );
}
 
export default Login;