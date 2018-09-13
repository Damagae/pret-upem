import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'


export default class AdminUser extends Component {
    constructor(props) {
      super(props)

      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.modifier = this.modifier.bind(this)

      this.state = {
        userSelected: {},
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
      this.getUser()
    }

    getUser() {
      let url = window.location.href
      let id = url.split('/').pop()
      axios.get('/api/u/' + id)
      .then(response => {
        this.setState({userSelected: response.data})
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

    deleteUser() {
      const url = window.location.href + '/suppression'
      axios.delete('/api/u/delete/' + this.state.userSelected.id)
      .then(response => {
        window.location.href = url
      })
      .catch(error => {
        console.log(error)
      })
    }

    modifier() {
      document.location = '/administration/utilisateur/' + this.state.userSelected.id + '/modifier'
    }

    renderOptions() {
      const options = this.state.options
      return options.map((e) => {
        return <div key={e.key} className={"option option-" + e.key} onClick={() => { e.fonction() }}>{e.nom}{e.key === 'telecharger' && <i id="telecharger" className="fas fa-circle-notch"></i>}</div>
      })
    }

    formateType(type) {
      if (type == 'agent') {
        return 'Agent'
      }
      if (type == 'delegataire') {
        return 'Délégataire'
      }
      if (type == 'administrateur') {
        return 'et Administrateur'
      }
    }

    getFileName(fullPath) {
      if (fullPath != '') {
        var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'))
        var filename = fullPath.substring(startIndex)
        if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
            filename = filename.substring(1)
        }
        return filename
      }
    }

    renderTypes() {
      const types = this.state.userSelected.type
      if (types) {
        return types.map((e) => {
          return (
            <span key={e.id}>{this.formateType(e.nom)} </span>
          )
        })
      }
    }

    renderSignature() {
      const u = this.state.userSelected
      if (u.signature) {
        return (
          <div className="row justify-content-center">
            <div className="col col-lg-1">
              <p><strong>Signature&#8239;:</strong></p>
            </div>
            <div className="col col-lg-3">
              <a href={u.id && ("/document/signature/" + u.id)} target="_blank"><p>Voir signature</p></a>
            </div>
            <div className="col  col-lg-4"></div>
          </div>
        )
      }
    }

    renderBureaux() {
      const u = this.state.userSelected
      if (u.bureaux && u.bureaux.length > 0) {
        return (
          <div className="row justify-content-center">
            <div className="col col-lg-1">
              <p><strong>Bureaux de prêt associés&#8239;:</strong></p>
            </div>
            <div className="col col-lg-3">
              { u.bureaux.map(e => {
                return (
                  <span>{e.nom} <br/></span>
                )
              }) }
            </div>
            <div className="col  col-lg-4"></div>
          </div>
        )
      }
    }


    render() {
      const u = this.state.userSelected
        return (
          <div className="container-full end">
            <MenuPrincipal see='Les conventions' active='admin' admin
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />

              <div className="container etudiant-demande">
                <div className="row justify-content-center">
                  <div className="col col-lg-8">
                    <h1>Utilisateur {u.prenom} {u.nom}</h1>
                    { this.renderOptions() }
                  </div>
                </div>
                <div className="row row justify-content-center">
                  <div className="col col-lg-8">
                    <h2>{ this.renderTypes() }</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-1">
                    <p><strong>Nom&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>{u.nom}</p>
                  </div>
                  <div className="col col-lg-1">
                    <p><strong>Prénom&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p> {u.prenom} </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-1">
                    <p><strong>Adresse Email&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>{u.mail}</p>
                  </div>
                  <div className="col col-lg-4">
                  </div>
                </div>
                { this.renderBureaux() }
                { this.renderSignature() }
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

if (document.getElementById('administration-utilisateur')) {
    ReactDOM.render(<AdminUser />, document.getElementById('administration-utilisateur'));
}
