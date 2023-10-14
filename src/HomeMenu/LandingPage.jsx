import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './estilos-menu/landingPage.css'
import Class1 from '../Img/supportClass.png'
import Class2 from '../Img/supportClass2.png'
const LandingPage = () => {
    return (
        <div className="container">
            <div className="palabras">
            <p>¿Deseas mejorar tus habilidades o adquirir nuevos conocimientos?</p>
            <p>Nuestro servicio conecta estudiantes con expertos apasionados.</p>
            </div>

            <div className="imagenes">
            <img src={Class2} alt="LandingPage" />
            <img src={Class1} alt="LandingPage" />
            </div>
            
            


            <div className="button-container">
                <Link to="/home">
                    <button><h1>Ir al menu</h1></button>
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;