import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class PersonnelConfirmationModification extends Component {
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
                  <h1>Modification de la convention {this.state.numEng}</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      La convention vient d'être vient d'être modifiée.
                    </p>
                    <a href="/personnel/conventions">
                      <button className='btn btn-orange'>Voir les conventions</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

if (document.getElementById('personnel-confirmation-modification')) {
    ReactDOM.render(<PersonnelConfirmationModification />, document.getElementById('personnel-confirmation-modification'));
}
