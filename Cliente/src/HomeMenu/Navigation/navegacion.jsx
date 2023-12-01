import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../Home'; // Asegúrate de que la ruta sea correcta
import Perfil from '../../Perfil/TabComponents/VistasTab/profile-content'; // Asume que existe este componente
import userLogin from '../../Login/LoginForm'; // Asume que existe este componente
import LandingPage from '../LandingPage'
import NavigationBar from '../NavBar';

const Navegacion = () => {
    return ( 


<Router>
      <NavigationBar />
      
        <Switch>
          <Route path='/' exact component={LandingPage}/>
          <Route path="/perfil" component={Perfil} />
          <Route path="/iniciarsesion" component={userLogin} />
          <Route path="/home" component={Home} /> 
        </Switch>   
    </Router>

     );
}
 
export default Navegacion;