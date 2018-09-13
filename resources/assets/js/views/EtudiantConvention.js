import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Convention from '../components/Convention'

export default class EtudiantConvention extends Component {
    render() {
        return (
          <div className="container-full">
            <MenuPrincipal links={{new:'', see:''}} />
            <div className="container end">
              <Convention niveau="1" />
            </div>
          </div>
        )
    }
}

if (document.getElementById('etudiant-convention')) {
    ReactDOM.render(<EtudiantConvention />, document.getElementById('etudiant-convention'));
}
