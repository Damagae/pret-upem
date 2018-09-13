import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class EtudiantConfirmation extends Component {
    render() {
        return (
          <div className="container-full">
            <MenuPrincipal new='Nouvelle demande de prêt' see='Mes demandes de prêt' active='new'
              links={{new:'/etudiant/nouvelle-demande', see:'/etudiant/mes-demandes'}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Nouvelle demande de prêt</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Votre demande vient d'être créée. Vous devez maintenant attendre la validation de votre enseignant référent. Lorsque vous serez averti, vous devrez vous rendre à votre bureau de prêt le plus tôt possible afin de faire accepter votre demande.
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

if (document.getElementById('etudiant-confirmation')) {
    ReactDOM.render(<EtudiantConfirmation />, document.getElementById('etudiant-confirmation'));
}
