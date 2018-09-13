import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import logo from '../../img/logo-upem-white.png'

export default class NotFound extends Component {
    render() {
        return (
          <div className="container-full">
            <MenuPrincipal light links={{new:'/', see:'/'}} />
            <div className="container margin-top">
              <div className="row justify-content-center align-items-center notfound-animation">
                <img src={logo}></img>
                <div className='col col-md-12 text-align-center notfound'>
                  <h1>La page que vous cherchez n'existe pas ou n'existe plus.</h1>
                </div>
                <img width='400' src='/images/404.gif'></img>
              </div>
            </div>
          </div>
        );
    }
}

if (document.getElementById('notfound')) {
    ReactDOM.render(<NotFound />, document.getElementById('notfound'));
}
