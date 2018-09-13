import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Demande from '../components/Demande'
import DemandesTable from '../components/DemandesTable'

export default class EtudiantMesDemandes extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: currentUser,
        conventions: [],
        removeConventionId: '',
        selectConventionId: '',
        modal: false,
        sort: {
          field: 'etat',
          direction: 'up'
        }
      }
      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.setSelectConventionId = this.setSelectConventionId.bind(this)
      this.getConventions()

      this.state.user.type = [0]
    }

    getConventions() {
      axios.get('/api/c/byemprunteurmail/' + this.state.user.mail)
      .then(response => {
        this.setState({conventions: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    setSelectConventionId(id) {
      this.setState({selectConventionId: id})
    }

    unsetSelectConventionId() {
      this.setState({selectConventionId: ''})
    }

    showDeleteModal(id) {
      this.setState({modal: true})
      this.setState({removeConventionId: id})
    }

    isVisibleModal() {
      return this.state.modal
    }

    cancelAlert() {
      this.setState({modal: false})
      this.setState({removeConventionId: ''})
    }

    cancelAlertClickingAway(e) {
      const popup = document.getElementById('popup')
      const elements = document.getElementsByClassName('popup-child')
      const popupChildren = Array.prototype.slice.call(elements)
      if (e.target != popup && !popupChildren.includes(e.target)) {
        this.cancelAlert()
      }
    }

    confirmAlert() {
      this.deleteConvention()
      this.setState({modal: false})
    }

    deleteConvention() {
      axios.put('/api/c/cancel/' + this.state.removeConventionId)
      .then(response => {
        this.getConventions()
      })
      .catch(error => {
        console.log(error)
      })
    }

    render() {
        return (
          <div className="container-full">
            <MenuPrincipal new='Nouvelle demande de prêt' see='Mes demandes de prêt' active='see'
              links={{new:'/etudiant/nouvelle-demande', see:'/etudiant/mes-demandes'}} />
            <DemandesTable user={this.state.user} conventions={this.state.conventions} showDeleteModal={this.showDeleteModal} />

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal() ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer une demande de prêt.</strong></p>
                  <p>Une fois la demande de prêt supprimée, vous ne pourrez plus la faire valider ni récupérer le matériel demandé. <br/> Si vous voulez emprunter à nouveau du matériel, vous devrez remplir un nouveau formulaire de demande de prêt.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmAlert() }}>Confirmer la suppression</p>
                  </div>
                </div>
              </div>

          </div>
        )
    }
}

if (document.getElementById('etudiant-mes-demandes')) {
    ReactDOM.render(<EtudiantMesDemandes />, document.getElementById('etudiant-mes-demandes'));
}
