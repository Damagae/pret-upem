import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Demande from '../components/Demande'
import DemandesTable from '../components/DemandesTable'
import TopButton from '../components/TopButton'
import ConventionPDF from '../components/ConventionPDF'

HTMLElement.prototype.click = function() {
   var evt = this.ownerDocument.createEvent('MouseEvents');
   evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
   this.dispatchEvent(evt);
}

export default class DelegataireConvention extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: null,
        convention: '',
        deleteModal: false,
        validateModal: false,
        remiseModal: false
      }
      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.showValidateModal = this.showValidateModal.bind(this)
      this.telecharger = this.telecharger.bind(this)
      this.getCurrentUser()
      this.getConvention()
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
      if (this.state.user.type.some(e => e.usertype_id == 3)) { return true }
      return false
    }

    /* Récupère les conventions d'après le numéro d'enregistrement en URL */
    getConvention() {
      let url = window.location.href
      let numEng = url.split('/').pop()
      axios.get('/api/c/bynumeng/' + numEng)
      .then(response => {
        this.setState({convention: response.data})
      })
      .catch(error => {
        console.log(error)
        document.location = '/campus-numerique/conventions'
      })
    }

    /* ALL Modals ------------------- */
    isVisibleModal(key) {
      if (key === 'delete') {
        return this.state.deleteModal
      }
      if (key === 'validate') {
        return this.state.validateModal
      }
    }

    cancelAlertClickingAway(e) {
      const popup = document.getElementById('popup')
      const elements = document.getElementsByClassName('popup-child')
      const popupChildren = Array.prototype.slice.call(elements)
      if (e.target != popup && !popupChildren.includes(e.target)) {
        if (this.state.deleteModal) {
          this.cancelDeleteAlert()
        }
        else if (this.state.validateModal) {
          this.cancelValidateAlert()
        }
        else if (this.state.remiseModal) {
          this.cancelRemiseAlert()
        }
      }
    }

    /* DELETE Modal ------------------- */
    showDeleteModal() {
      this.setState({deleteModal: true})
    }
    cancelDeleteAlert() {
      this.setState({deleteModal: false})
    }
    confirmDeletion() {
      this.deleteConvention()
      this.setState({deleteModal: false})
    }

    /* VALIDATE Modal ------------------- */
    showValidateModal() {
      this.setState({validateModal: true})
    }
    cancelValidateAlert() {
      this.setState({validateModal: false})
    }
    confirmValidation() {
      this.validateConvention()
      this.setState({validateModal: false})
    }

    /* Fonctions d'action API */
    deleteConvention() {
      const url = window.location.href + '/suppression'
      axios.put('/api/c/cancel/' + this.state.user.id + '/' + this.state.convention.id)
      .then(response => {
        window.location.href = url
      })
      .catch(error => {
        console.log(error)
      })
    }
    validateConvention() {
      const url = window.location.href + '/validation'
      axios.put('/api/v/validation-delegataire/' + this.state.convention.id + '/' + this.state.user.id)
      .then(response => {
        console.log(response)
        window.location.href = url
      })
      .catch(error => {
        console.log(error)
      })
    }

    /* Autres fonctions d'action */
    telecharger() {
      const icon = document.getElementById('telecharger')
      const numEng = this.state.convention.num_eng
      const src = this.conventionPDF()

      // Affiche l'icone
      icon.style.visibility = 'visible'

      // Crée la convention dans une div
      let div = document.createElement('div')
      ReactDOM.render(src, div)
      const conventionHTML = div.innerHTML

      axios.post('/api/pdf', { // Envoie l'html
        html: conventionHTML
      })
      .then(response => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          alert("Vous ne pouvez pas télécharger cette convention avec ce navigateur. Essayez avec Chrome ou Mozilla Firefox.")
        }
        else {
          /* Marche pour faire un download sur Chrome */
          let a = document.createElement("a")
          a.href = response.data
          a.download = "Convention " + numEng + " " + new Date().toDateString() + ".pdf"
          a.click()
        }

        // Enlève l'icone
        icon.style.visibility = 'hidden'
      })
      .catch(error => {
        console.log(error)
        // Enlève l'icone
        icon.style.visibility = 'hidden'
      })
    }

    conventionPDF() {
      return <ConventionPDF user={this.state.user} convention={this.state.convention} />
    }

    render() {
      if (this.state.user) {
        return (
          <div className="container-full end">
            <MenuPrincipal see='Les conventions' active='see' admin={this.isAdmin() ? 'admin' : ''}
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />
            <Demande emprunteur={this.state.emprunteur} user={this.state.user} convention={ this.state.convention } showDeleteModal={this.showDeleteModal} showValidateModal={this.showValidateModal} showRemiseModal={this.showRemiseModal} goBack={this.unsetSelectConventionId} telecharger={this.telecharger} />

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('delete') ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer une demande de prêt.</strong></p>
                  <p>Une fois la demande de prêt supprimée, vous ne pourrez plus la faire valider ni récupérer le matériel demandé. <br/> Si vous voulez emprunter à nouveau du matériel, vous devrez remplir un nouveau formulaire de demande de prêt.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelDeleteAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmDeletion() }}>Confirmer la suppression</p>
                  </div>
                </div>
              </div>

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="validate-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('validate') ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de valider une demande de prêt.</strong></p>
                  <p>Une fois la demande de prêt validée, vous ne pourrez plus la modifier.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelValidateAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmValidation() }}>Confirmer la validation</p>
                  </div>
                </div>
              </div>

              <TopButton />

            <div className="end-div"></div>
          </div>
        )
      } else {
          return (<div></div>)
      }
    }
}

if (document.getElementById('convention')) {
    ReactDOM.render(<DelegataireConvention />, document.getElementById('convention'));
}
