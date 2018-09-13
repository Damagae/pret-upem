import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class PersonnelConfirmationReserve extends Component {
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
                  <h1>Remise du matériel de la demande {this.state.numEng} avec réserves</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Vous avez confirmé la remise du matériel par l'emprunteur avec réserves.
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

if (document.getElementById('personnel-confirmation-reserve')) {
    ReactDOM.render(<PersonnelConfirmationReserve />, document.getElementById('personnel-confirmation-reserve'));
}
