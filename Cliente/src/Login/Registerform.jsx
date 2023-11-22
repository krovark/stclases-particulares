import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './login.css';



const RegistrationForm = ({ show, handleClose, handleShow }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
    experiencia: '',
    calificacionPromedio: '',
    imgProfile: '',
    titulo:'',
    resetPasswordToken: '',
    resetPasswordExpires: '', 
  });

  const [errorMessage, setErrorMessage] = useState('');


  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrorMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    

    try {
      const response = await fetch('http://192.168.0.103:4000/api/users/registration', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Manejar los errores del servidor
        console.error(data.message); // Puedes modificar esto para mostrar errores al usuario
      } else {
        // Manejar registro exitoso
        console.log('Registro exitoso:', data);
        handleClose(); 
      }
    } catch (error) {
     
      console.error('Fallo en el registro:', error);
    }
  };
  return (
    
    <Modal show={show} onHide={handleClose} className="my-custom-modal">
    <Modal.Header closeButton>
      <Modal.Title>Formulario de Registro</Modal.Title>
        </Modal.Header>
          <Modal.Body>
          
          <div className="regist-form">
                                <form onSubmit={handleSubmit}>
                              <div className="input-container">
                                <label htmlFor="nombre">Nombre:<span id='rq'> *</span></label>
                                <input
                                  type="text"
                                  id="nombre"
                                  name="nombre"
                                  placeholder="Tu nombre"
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div className="input-container">
                                <label htmlFor="apellido">Apellido:<span id='rq'> *</span></label>
                                <input
                                  type="text"
                                  id="apellido"
                                  name="apellido"
                                  placeholder="Tu apellido"
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              {/* <div className="input-container">
                                <label htmlFor="dni">DNI:<span id='rq'> *</span></label>
                                <input
                                  type="text"
                                  id="dni"
                                  name="dni"
                                  placeholder="Tu número de DNI"
                                  required
                                />
                              </div> */}

                              <div className="input-container">
                                <label htmlFor="telefono">Teléfono:<span id='rq'> *</span></label>
                                <input
                                  type="tel"
                                  id="telefono"
                                  name="telefono"
                                  placeholder="Tu número de teléfono"
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div className="input-container">
                                <label htmlFor="email">Email:<span id='rq'> *</span></label>
                                <input
                                  type="email"
                                  id="email"
                                  name="email"
                                  placeholder="Tu correo electrónico"
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div className="input-container">
                                <label htmlFor="password">Contraseña:<span id='rq'> *</span></label>
                                <input
                                  type="password"
                                  id="password"
                                  name="password"
                                  placeholder="Tu contraseña"
                                  onChange={handleInputChange}
                                  required
                                />
                              </div>

                              <div className="input-container">
                                <label htmlFor="confirmPassword">Confirmar Contraseña:<span id='rq'> *</span></label>
                                <input
                                  type="password"
                                  id="confirmPassword"
                                  name="confirmPassword"
                                  placeholder="Confirmar contraseña"
                                  required
                                  onChange={handleInputChange}
                                />
                              </div>
                              
                              <div className="input-container">
                                <label htmlFor="experiencia">Experiencia: <span id='rq'> *</span></label>
                                <textarea
                                  id="experiencia"
                                  name="experiencia"
                                  rows="4"
                                  cols="50"
                                  placeholder="Escribe aquí tu experiencia (máximo 200 caracteres)"
                                  maxLength="200"
                                  onChange={handleInputChange}
                                  required
                                ></textarea>
                              </div>

                              <br></br>
                              {errorMessage && <div className="error-message">{errorMessage}</div>}
                                    <Button type="submit" variant="primary">
                                    Confirmar
                                    
                                    </Button>
                              
                                </form>
                                </div>

          </Modal.Body>

           <Modal.Footer>
        
        
        </Modal.Footer>
          
  </Modal>


  );
};
    
export default RegistrationForm;