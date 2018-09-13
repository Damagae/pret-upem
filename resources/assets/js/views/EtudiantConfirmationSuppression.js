import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class EtudiantConfirmationSuppression extends Component {
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
            <MenuPrincipal new='Nouvelle demande de prêt' see='Mes demandes de prêt' active='new'
              links={{new:'/etudiant/nouvelle-demande', see:'/etudiant/mes-demandes'}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Suppression de demande de prêt {this.state.numEng}</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Votre demande de prêt vient d'être vient d'être supprimée. Si vous voulez emprunter du matériel, veuillez créer une nouvelle demande de prêt.
                    </p>
                    <a href="/etudiant/mes-demandes">
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

if (document.getElementById('etudiant-confirmation-suppression')) {
    ReactDOM.render(<EtudiantConfirmationSuppression />, document.getElementById('etudiant-confirmation-suppression'));
}
