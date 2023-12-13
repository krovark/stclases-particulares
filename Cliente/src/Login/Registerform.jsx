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
    imgProfile: 'https://res.cloudinary.com/dstqx4yk0/image/upload/f_auto,q_auto/hnctdvnktwij9ova4ey4',
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

    if (!formData.nombre || !formData.apellido || !formData.email || !formData.telefono || !formData.experiencia) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/users/registration', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        //console.error(data.message); 
      } else {
        
        alert('Usuario registrado con éxito. Por favor termine de completar su perfil en la sección "Perfil" ');
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
                                  autoComplete='false'
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
                                  autoComplete='false'
                                  required
                                />
                              </div>

                              <div className="input-container">
                                <label htmlFor="telefono">Teléfono:<span id='rq'> *</span></label>
                                <input
                                  type="tel"
                                  id="telefono"
                                  name="telefono"
                                  placeholder="Tu número de teléfono"
                                  onChange={handleInputChange}
                                  autoComplete='false'
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
                                  autoComplete='false'
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
                                  autoComplete='false'
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
                                  autoComplete='false'
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
                                  autoComplete='false'
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