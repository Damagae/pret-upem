import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class DelegataireConfirmationValidation extends Component {
    constructor() {
      super()
      let urlString = window.location.href
      let url = urlString.split('/')
      url.pop()
      let n = url.pop()
      this.state = {
        user: null,
        numEng: n
      }
      this.getCurrentUser()
    }

    getCurrentUser() {
      axios.get('/api/u/bymail/' + currentUser.mail)
      .then(response => {
        this.setState({user: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    isAdmin() {
      if (this.state.user.type === 'administrateur' || this.state.user.type.includes('administrateur')) { return true }
      return false
    }

    render() {
      if (this.state.user) {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='see' admin={this.isAdmin() ? 'admin' : ''}
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Validation de la demande {this.state.numEng}</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Vous avez validé la demande de prêt.
                    </p>
                    <a href="/campus-numerique/conventions">
                      <button className='btn btn-orange'>Voir mes demandes de prêt</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else {
          return (<div></div>)
      }
    }
}

if (document.getElementById('confirmation-validation')) {
    ReactDOM.render(<DelegataireConfirmationValidation />, document.getElementById('confirmation-validation'));
}
