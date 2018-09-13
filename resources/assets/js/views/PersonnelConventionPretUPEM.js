import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Convention from '../components/Convention'

export default class PersonnelConventionPretUPEM extends Component {
    render() {
        return (
          <div className="container-full">
          <MenuPrincipal see='Les conventions' active='see' links={{see:'/personnel/conventions'}} />
            <div className="container end">
              <Convention niveau="1" />
            </div>
          </div>
        )
    }
}

if (document.getElementById('personnel-convention-UPEM')) {
    ReactDOM.render(<PersonnelConventionPretUPEM />, document.getElementById('personnel-convention-UPEM'));
}
