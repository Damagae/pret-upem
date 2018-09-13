import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class Unauthorized extends Component {

    render() {
        return (
          <div className="container-full">
            <MenuPrincipal links={{}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Vous n'êtes pas autorisé à accéder à cette page.</h1>
                  <div>
                    <a href="/etudiant">
                      <button className='btn btn-orange'>Accueil étudiant</button>
                    </a>
                    <a href="/personnel">
                      <button className='btn btn-orange'>Accueil personnel</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

if (document.getElementById('unauthorized')) {
    ReactDOM.render(<Unauthorized />, document.getElementById('unauthorized'));
}
