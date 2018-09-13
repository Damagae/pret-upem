import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Demande from '../components/Demande'
import DemandesTable from '../components/DemandesTable'

export default class PersonnelLesConventions extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: null,
        conventions: [],
        removeConventionId: '',
        modal: false,
        sort: {
          field: 'etat',
          direction: 'up'
        }
      }
      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.updateConventions = this.updateConventions.bind(this)
      this.getCurrentUser()
    }

    getCurrentUser() {
      axios.get('/api/u/bymail/' + currentUser.mail)
      .then(response => {
        this.setState({user: response.data})
        this.getConventions()
      })
      .catch(error => {
        console.log(error)
      })
    }

    getConventions() {
      axios.get('/api/c/bybureaupretid/' + this.state.user.bureaux[0].bureaupret_id)
      .then(response => {
        let conventions = response.data
        conventions = conventions.filter(e => e.etat.id >= 2)
        this.setState({conventions: conventions})
      })
      .catch(error => {
        console.log(error)
      })
    }

    updateConventions(id) {
      axios.get('/api/c/bybureaupretid/' + id)
      .then(response => {
        let conventions = response.data
        conventions = conventions.filter(e => e.etat.id >= 2)
        this.setState({conventions: conventions})
      })
      .catch(error => {
        console.log(error)
      })
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
      if (this.state.user) {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='see' links={{see:'/personnel/conventions'}} />
            <DemandesTable user={this.state.user} conventions={this.state.conventions} showDeleteModal={this.showDeleteModal}
              updateConventions={this.updateConventions} />

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
      } else {
        return (
          <div></div>
        )
      }

    }
}

if (document.getElementById('personnel-les-conventions')) {
    ReactDOM.render(<PersonnelLesConventions />, document.getElementById('personnel-les-conventions'));
}
