import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import './estilos-menu/Pagelanding.css'
import './estilos-menu/SVGs/ProfileSvG.svg'
import { ReactComponent as DotPattern1 } from './estilos-menu/SVGs/ProfileSvG.svg';
// import { ReactComponent as DotPattern2 } from './estilos-menu/SVGs/DotPattern2.svg';
// import { ReactComponent as DotPattern3 } from './estilos-menu/SVGs/DotPattern3.svg';
// import { ReactComponent as DotPattern4 } from './estilos-menu/SVGs/DotPattern4.svg';


const LandingPage = () => {
    return (
       
      

    
    <main className="d-flex flex-column h-100">
        <main className="flex-shrink-0">

          
            <header className="py-5">
                <div className="container px-5 pb-5">
                    <div className="row gx-5 align-items-center">
                        <div className="col-xxl-5">
                           
                            <div className="text-center text-xxl-start">
                                <div className="badge bg-gradient-primary-to-secondary text-white mb-4"><div className="text-uppercase">Diseño &middot; Finanzas &middot; Marketing &middot; Inglés</div></div>
                                <div className="badge bg-gradient-primary-to-secondary text-white mb-4"><div className="text-uppercase">Gastronimia &middot; Defensa Personal</div></div>
                                <div className="fs-3 fw-light text-muted">Desarrollamos tus conocimientos</div>
                                <h1 className="display-3 fw-bolder mb-5"><span className="text-gradient d-inline">Empezá a potenciarte</span></h1>
                                <div className="d-flex justify-content-center mb-3">
                                    <Link to="/home">
                                    <a className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="resume.html">COMENZAR</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xxl-7">
                          
                            <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div className="profile bg-gradient-primary-to-secondary">
                                  
                                    <img className="profile-img" src="/persona2.png" alt="..." />

                                    <div className="dots-1">
                                    <DotPattern1></DotPattern1>

                                    </div>
                                    {/* <div className="dots-2">
                                      <DotPattern2></DotPattern2>
                                    </div>
                                    <div className="dots-3">
                                   <DotPattern3></DotPattern3>
                                    </div>
                                    <div className="dots-4">
                                  <DotPattern4></DotPattern4>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
         
            <section className="bg-light py-5">
                <div className="container px-5">
                    <div className="row gx-5 justify-content-center">
                        <div className="col-xxl-8">
                            <div className="text-center my-5">
                                <h2 className="display-5 fw-bolder"><span className="text-gradient d-inline">Acerca de nosotros</span></h2>
                                <p className="lead fw-light mb-4">Somos ClaseYa eMarket lider en la venta de clases y cursos necesarias para potenciar tu desarrollo personal.</p>
                                <p className="text-muted">Ayudamos a crear posibilidades y éxito en tu carrera.
                                    En nuestro compromiso con tu desarrollo profesional, trabajamos día a día para brindarte las herramientas y oportunidades que necesitas.</p>
                              
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
     
        <footer className="bg-white py-4 mt-auto">
            <div className="container px-5">
                <div className="row align-items-center justify-content-between flex-column flex-sm-row">
                    <div className="col-auto"><div className="small m-0">Copyright &copy; tuClaseYa 2023</div></div>
                </div>
            </div>
        </footer>
      
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
     
        <script src="js/scripts.js"></script>
    </main>


    );
}

export default LandingPage;