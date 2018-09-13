import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class AdminConfirmationSuppressionUser extends Component {
    render() {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='admin' admin
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Utilisateur supprimé</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      L'utilisateur vient d'être supprimé.
                    </p>
                    <a href="/administration">
                      <button className='btn btn-orange'>Voir le panneau d'administration</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

if (document.getElementById('admin-user-supprimer-confirmation')) {
    ReactDOM.render(<AdminConfirmationSuppressionUser />, document.getElementById('admin-user-supprimer-confirmation'));
}
