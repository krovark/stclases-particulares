import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './login.css';

const RecoverPw = ({ show, handleClose, handleShow }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Solicitar token de recuperación de contraseña
  const requestPasswordReset = async () => {
    if (!email) {
      alert('Por favor, ingresa tu email');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: JSON.stringify({ email }),
      });
      console.log(email);
      if (!response.ok) {
        throw new Error('Error al solicitar el cambio de contraseña');
      }

      alert('Se te ha enviado un token al email para reinciar la contraseña');
      
      setStep(step + 1);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Cambiar la contraseña
  const changePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/users/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetPasswordToken: token, password: newPassword }),
      });

      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña');
      }

      // Cerrar modal y reiniciar el paso
      handleClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Reiniciar el modal al cerrarlo
  const handleModalClose = () => {
    setStep(1);
    setEmail('');
    setToken('');
    setNewPassword('');
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} className="my-custom-modal">
      <Modal.Header closeButton>
        <Modal.Title>Recuperar contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 1 && (
          <div className="recover-pwd">
            <div className="input-container">
              <label htmlFor="email">Email:<span id='rq'> *</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Tu email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <br></br>
            <Button onClick={requestPasswordReset} variant="primary">
              Confirmar
            </Button>
          </div>
        )}
        {step === 2 && (
          <div className="recover-pwd">
            <form onSubmit={changePassword}>
              <div className="input-container">
                <label htmlFor="token">Token:<span id='rq'> *</span></label>
                <input
                  type="text"
                  id="token"
                  name="token"
                  placeholder="Ingresa el token"
                  required
                  onChange={(e) => setToken(e.target.value)}
                />
              </div>
              <div className="input-container">
                <label htmlFor="newPassword">Nueva Contraseña:<span id='rq'> *</span></label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  placeholder="Nueva contraseña"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <br></br>
              <Button type="submit" variant="primary">
                Cambiar contraseña
              </Button>
            </form>
          </div>
        )}
      </Modal.Body>
      </Modal>
  );
}

export default RecoverPw;


