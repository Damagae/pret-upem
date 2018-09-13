import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class PersonnelConfirmationCreation extends Component {
    render() {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='see' links={{see:'/personnel/conventions'}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Nouvelle demande de prêt</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Votre demande vient d'être créée. Vous pouvez dorénavant la valider.
                    </p>
                    <a href="/personnel/conventions">
                      <button className='btn btn-orange'>Voir mes demandes de prêt</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

if (document.getElementById('personnel-confirmation-creation')) {
    ReactDOM.render(<PersonnelConfirmationCreation />, document.getElementById('personnel-confirmation-creation'));
}
