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


  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      console.log(email, password);
      // Preparar los datos para enviar al servidor
      const userData = {
        email: email,
        password: password
      };
  
      // Realizar la solicitud al servidor
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(userData)
      });

      console.log("response ok");

      const data = await response.json();
  
      if (response.ok) {
        // Aquí manejas el inicio de sesión exitoso
        // Por ejemplo, almacenar el token de acceso y actualizar el estado de Redux
        dispatch(logIn(data)); // Asume que 'data' contiene la información necesaria
        history.push('/home');
      } else {
        // Manejar respuesta de error del servidor
        alert(data.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      // Manejar errores de red o de conexión
      console.error('Error en el proceso de inicio de sesión:', error);
      alert('Error al conectar con el servidor');
    }
  };

    return ( 



        <div className="Login">
        <div className="loginContainer">
          <br></br>
          <h1>Iniciar Sesion</h1>
  
          <div className="input-container">
            <label>Email </label>
            <input type="text" name="email" required onChange={(e) => setEmail(e.target.value)}/>
            {/* {renderErrorMessage("uname")} */}
          </div>
          <div className="input-container">
            <label>Contraseña </label>
            <input type="password" name="pass" required onChange={(e) => setPassword(e.target.value)}/>
            {/* {renderErrorMessage("pass")} */}
          </div>
  
        <div className="links">

          <a href="#hola" onClick={handleShow2}>Olvidaste la contraseña?</a>
          <a href="#hola"onClick={handleShow} >Crear nueva cuenta </a>
  
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