import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class PersonnelConfirmationSuppression extends Component {
  constructor() {
    super()
    let urlString = window.location.href
    let url = urlString.split('/')
    url.pop()
    let n = url.pop()
    this.state = {
      numEng: n
    }
  }
    render() {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='see' links={{see:'/personnel/conventions'}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Suppression de la demande de prêt {this.state.numEng}</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Votre demande de prêt vient d'être supprimée. Si vous voulez emprunter du matériel, veuillez créer une nouvelle demande de prêt.
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

if (document.getElementById('personnel-confirmation-suppression')) {
    ReactDOM.render(<PersonnelConfirmationSuppression />, document.getElementById('personnel-confirmation-suppression'));
}
