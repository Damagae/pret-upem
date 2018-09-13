import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class EnseignantConfirmationValidation extends Component {$
    constructor() {
      super()
      this.state = {
        numEng: ''
      }
      this.getConvention()
    }

    getConvention() {
      let urlString = window.location.href
      let url = urlString.split('/')
      url.pop()
      let token = url.pop()
      axios.get('/api/c/bytoken/' + token)
      .then(response => {
        this.setState({numEng: response.data.num_eng})
      })
      .catch(error => {
        console.log(error)
        document.location = '/notfound'
      })
    }

    render() {
        return (
          <div className="container-full">
            <MenuPrincipal links={{}} />
            <div className="container end">
              <div className="row justify-content-center confirmation-etudiant">
                <div className="col col-md-8">
                  <h1>Validation de la demande {this.state.numEng}</h1>
                  <h2>Confirmation</h2>
                  <div>
                    <p>
                      Vous avez validé la demande de prêt.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

if (document.getElementById('confirmation-validation')) {
    ReactDOM.render(<EnseignantConfirmationValidation />, document.getElementById('confirmation-validation'));
}
