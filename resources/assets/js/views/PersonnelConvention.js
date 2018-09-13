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

export default class PersonnelConvention extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: null,
        convention: '',
        deleteModal: false,
        validateModal: false,
        remiseModal: false,
        reserveModal: false,
      }
      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.showValidateModal = this.showValidateModal.bind(this)
      this.showRemiseModal = this.showRemiseModal.bind(this)
      this.showReserveModal = this.showReserveModal.bind(this)
      this.telecharger = this.telecharger.bind(this)
      this.modifier = this.modifier.bind(this)
      this.getCurrentUser()
      this.getConvention()
    }

    /* Récupère l'agent */
    getCurrentUser() {
      axios.get('/api/u/bymail/' + currentUser.mail)
      .then(response => {
        this.setState({user: response.data})
      })
      .catch(error => {
        console.log(error)
      })
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
      if (key === 'remise') {
        return this.state.remiseModal
      }
      if (key === 'reserve') {
        return this.state.reserveModal
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
        else if (this.state.reserveModal) {
          this.cancelReserveAlert()
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

    /* REMISE Modal ------------------- */
    showRemiseModal() {
      this.setState({remiseModal: true})
    }
    cancelRemiseAlert() {
      this.setState({remiseModal: false})
    }
    confirmRemise() {
      this.remiseConvention()
      this.setState({remiseModal: false})
    }

    /* RESERVE Modal ------------------- */
    showReserveModal() {
      this.setState({reserveModal: true})
    }
    cancelReserveAlert() {
      this.setState({reserveModal: false})
    }
    confirmReserve() {
      this.reserveConvention()
      this.setState({reserveModal: false})
    }

    /* Fonctions d'action API */
    deleteConvention() {
      const url = '/personnel/conventions/' + this.state.convention.num_eng + '/suppression'
      axios.put('/api/c/cancel/' + this.state.user.id + '/' + this.state.convention.id)
      .then(response => {
        document.location = url
      })
      .catch(error => {
        console.log(error)
      })
    }
    validateConvention() {
      const url = '/personnel/conventions/' + this.state.convention.num_eng + '/validation'
      axios.put('/api/v/validation/' + this.state.convention.id + '/' + this.state.user.id)
      .then(response => {
        console.log(response)
        document.location = url
      })
      .catch(error => {
        console.log(error)
      })
    }
    remiseConvention() {
      const url = '/personnel/conventions/' + this.state.convention.num_eng + '/remise'
      axios.put('/api/v/remise/' + this.state.convention.id + '/' + this.state.user.id)
      .then(response => {
        console.log(response)
        document.location = url
      })
      .catch(error => {
        console.log(error)
      })
    }
    reserveConvention() {
      const url = '/personnel/conventions/' + this.state.convention.num_eng + '/reserve'
      axios.put('/api/v/reserve/' + this.state.convention.id + '/' + this.state.user.id)
      .then(response => {
        console.log(response)
        document.location = url
      })
      .catch(error => {
        console.log(error)
      })
    }

    /* Autres fonctions d'action */
    modifier() {
      document.location = '/personnel/conventions/' + this.state.convention.num_eng + '/modifier'
    }

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
            <MenuPrincipal see='Les conventions' active='see' links={{see:'/personnel/conventions'}} />
            <Demande user={this.state.user} convention={ this.state.convention } showDeleteModal={this.showDeleteModal} showValidateModal={this.showValidateModal} showRemiseModal={this.showRemiseModal} showReserveModal={this.showReserveModal} goBack={this.unsetSelectConventionId} modifier={this.modifier} telecharger={this.telecharger} />

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('delete') ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer une demande de prêt.</strong></p>
                  <p>Une fois la demande de prêt supprimée, vous ne pourrez plus la valider. <br/> L'étudiant devra créer une nouvelle demande afin de pouvoir emprunter du matériel.</p>
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

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="remise-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('remise') ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de confirmer la remise du matériel.</strong></p>
                  <p>Une fois la remise du matériel confirmée, la demande de prêt sera clôturée et vous ne pourrez plus y revenir.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelRemiseAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmRemise() }}>Confirmer la remise du matériel</p>
                  </div>
                </div>
              </div>

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="reserve-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('reserve') ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de confirmer la remise du matériel avec réserves.</strong></p>
                  <p>Vous pourrez revenir plus tard sur cette demande de prêt afin de la clôturer.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelReserveAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmReserve() }}>Confirmer la remise du matériel avec réserve</p>
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

if (document.getElementById('personnel-convention')) {
    ReactDOM.render(<PersonnelConvention />, document.getElementById('personnel-convention'));
}
