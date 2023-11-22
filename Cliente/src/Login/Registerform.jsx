import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './login.css';



const RegistrationForm = ({ show, handleClose, handleShow }) => {
    
  return (
    
    <Modal show={show} onHide={handleClose} className="my-custom-modal">
    <Modal.Header closeButton>
      <Modal.Title>Formulario de Registro</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            
          <div className="regist-form">
                                <form>
                              <div className="input-container">
                                <label htmlFor="nombre">Nombre:<span id='rq'> *</span></label>
                                <input
                                  type="text"
                                  id="nombre"
                                  name="nombre"
                                  placeholder="Tu nombre"
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
                                  required
                                />
                              </div>

                              <div className="input-container">
                                <label htmlFor="dni">DNI:<span id='rq'> *</span></label>
                                <input
                                  type="text"
                                  id="dni"
                                  name="dni"
                                  placeholder="Tu número de DNI"
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
                                  required
                                ></textarea>
                              </div>

                              <br></br>
                              
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