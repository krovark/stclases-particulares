import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './estilos-menu/landingPage.css'
import Class1 from '../Img/hero-banner.png'
import Class2 from '../Img/about-banner.png'

const LandingPage = () => {
    return (
       
        <div className="main-container">

            <div className="hero">
                <div className="container">

                    <figure className="hero-banner">
                        <img src={Class1} alt="A young lady sits, holding a pen and a notebook."/>
                    </figure>

                    <div className="hero-content">
                        <h1 className="h1 hero-title">Desarrollá tus conocimientos</h1>
                        <p className="section-text">
                            ¿Deseas mejorar tus habilidades o adquirir nuevos conocimientos?
                            Nuestro servicio conecta estudiantes con expertos apasionados.
                        </p>
                        <Link to="/home">
                            <button className="btn btn-primary">Ir al menu</button>
                        </Link>
                    </div>
                </div>
            </div>

                    <div className="about">
                 <div className="container">

                     <figure className="about-banner">
                         <img src={Class2} alt="Eduland students" className="about-img" />
                        
                     </figure>

                     <div className="about-content">
                         <h2 className="h2 about-title">Ayudamos a Crear Posibilidades y Éxito en Tu Carrera.</h2>
                         <p className="section-text">
                         En nuestro compromiso con tu desarrollo profesional, trabajamos día a día para brindarte las herramientas y oportunidades que necesitas.
                         </p>
                         
                   </div>
                 </div> 
            


</div>
</div>


    );
}

export default LandingPage;