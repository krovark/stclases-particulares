import React, { useState } from 'react'
import RegistrationForm from './Registerform';
import Button from 'react-bootstrap/Button';
import RecoverPw from './recoverPw'
import './login.css'
import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../redux/authSlice';
import { useHistory } from 'react-router-dom';



const Login = () => {

  //Manejos de estados para
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);


  const DUMMY_USER = 'admin';
  const DUMMY_PASSWORD = '123';
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = () => {
    if (username === DUMMY_USER && password === DUMMY_PASSWORD) {  
      dispatch(logIn());
      history.push('/home');
      // Aquí puedes agregar más lógica, como redirigir a otra página, etc.
    } else {
      alert('Usuario o contraseña incorrecta!');
    }
  };

    return ( 



        <div className="Login">
        <div className="loginContainer">
          <br></br>
          <h1>Iniciar Sesion</h1>
  
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required onChange={(e) => setUsername(e.target.value)}/>
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)}/>
            {/* {renderErrorMessage("pass")} */}
          </div>
  
        <div className="links">

          <a href="#" onClick={handleShow2}>Olvidaste la contraseña?</a>
          <a href="#"onClick={handleShow} >Crear nueva cuenta </a>
  
          </div>

          <button className="loginBut" onClick={handleLogin}>
            <p>Login</p>
          </button>

              <RecoverPw show={show2} handleClose={handleClose2} handleShow={handleShow2} className="my-custom-modal2" ></RecoverPw>
              <RegistrationForm show={show} handleClose={handleClose} handleShow={handleShow} className="my-custom-modal"></RegistrationForm>

              
  
        </div>
        
          </div>
      
     );
}
 
export default Login;