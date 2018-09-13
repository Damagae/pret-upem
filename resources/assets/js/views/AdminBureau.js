import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'


export default class AdminBureau extends Component {
    constructor(props) {
      super(props)

      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.modifier = this.modifier.bind(this)

      this.state = {
        bureau: {},
        modal: false,
        options: [
          { //0
            key: 'modifier',
            nom: 'modifier',
            fonction: this.modifier
          },
          { //0
            key: 'supprimer',
            nom: 'supprimer',
            fonction: this.showDeleteModal
          }
        ]
      }
      this.getBureau()
    }

    getBureau() {
      let url = window.location.href
      let id = url.split('/').pop()
      axios.get('/api/b/' + id)
      .then(response => {
        this.setState({bureau: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    showDeleteModal() {
      this.setState({modal: true})
    }

    isVisibleModal() {
      return this.state.modal
    }

    cancelAlert() {
      this.setState({modal: false})
      this.setState({removeUserId: ''})
    }

    cancelAlertClickingAway(e) {
      const popup = document.getElementById('popup')
      const elements = document.getElementsByClassName('popup-child')
      const popupChildren = Array.prototype.slice.call(elements)
      if (e.target != popup && !popupChildren.includes(e.target))
        this.cancelAlert()
    }

    confirmAlert() {
      this.deleteUser()
      this.setState({modal: false})
    }

    deleteBureau() {
      const url = window.location.href + '/suppression'
      axios.delete('/api/b/delete/' + this.state.bureau.id)
      .then(response => {
        window.location.href = url
      })
      .catch(error => {
        console.log(error)
      })
    }

    modifier() {
      document.location = ('/administration/bureau/' + this.state.bureau.id + '/modifier')
    }

    renderOptions() {
      const options = this.state.options
      return options.map((e) => {
        return <div key={e.key} className={"option option-" + e.key} onClick={() => { e.fonction() }}>{e.nom}{e.key === 'telecharger' && <i id="telecharger" className="fas fa-circle-notch"></i>}</div>
      })
    }

    renderAgents() {
      const b = this.state.bureau
      if (b.agents && b.agents.length > 0) {
        return (
          <div className="row justify-content-center">
            <div className="col col-lg-1">
              <p><strong>Agents associés&#8239;:</strong></p>
            </div>
            <div className="col col-lg-3">
              { b.agents.map(e => {
                return (
                  <span>{e.mail} <br/></span>
                )
              }) }
            </div>
            <div className="col  col-lg-4"></div>
          </div>
        )
      }
    }

    render() {
      const b = this.state.bureau
        return (
          <div className="container-full end">
            <MenuPrincipal see='Les conventions' active='admin' admin
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />

              <div className="container etudiant-demande">
                <div className="row justify-content-center">
                  <div style={{marginBottom: 3 + 'rem'}} className="col col-lg-8">
                    <h1>Bureau {b.nom}</h1>
                    { this.renderOptions() }
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-1">
                    <p><strong>Nom&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>{b.nom}</p>
                  </div>
                  <div className="col  col-lg-4"></div>
              </div>
              { this.renderAgents() }
            </div>


              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal() ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer un bureau de prêt.</strong></p>
                  <p>Une fois le bureau de prêt supprimé, les agents associés à celui-ci ne pourront plus accéder à son interface et les étudiants ne pourront plus le choisir. <br/> Son nom sera toutefois conservé sur les conventions qui le portent.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmAlert() }}>Confirmer la suppression</p>
                  </div>
                </div>
              </div>

            <div className="end-div"></div>
          </div>
        )
    }
}

if (document.getElementById('administration-bureau')) {
    ReactDOM.render(<AdminBureau />, document.getElementById('administration-bureau'));
}
