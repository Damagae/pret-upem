import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Demande from '../components/Demande'
import DemandesTable from '../components/DemandesTable'

export default class DelegataireLesConventions extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: null,
        subMenu: 'valider',
        conventions: [],
        removeConventionId: '',
        selectConventionId: '',
        modal: false,
        sort: {
          field: 'etat',
          direction: 'up'
        }
      }
      this.getCurrentUser()
      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.setSelectConventionId = this.setSelectConventionId.bind(this)
      this.setSubMenu = this.setSubMenu.bind(this)
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

    isAdmin() {
      if (this.state.user.type.some(e => e.usertype_id == 3)) { return true }
      return false
    }

    getConventions() {
      axios.get('/api/c/')
      .then(response => {
        let conventions = response.data
        conventions = conventions.filter(e => e.etat.id >= 3)
        this.setState({conventions: conventions})
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

    setSubMenu(newMenu) {
      this.setState({subMenu: newMenu})
    }

    render() {
      if (this.state.user) {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='see' admin={this.isAdmin() ? 'admin' : ''}
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />

            <DemandesTable user={this.state.user} conventions={ this.state.subMenu === "valider" ? this.state.conventions.filter(e => e.etat.id === 3) : this.state.conventions} showDeleteModal={this.showDeleteModal} subMenu={this.state.subMenu} changeSubMenu={this.setSubMenu} />

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
        return (<div></div>)
      }

    }
}

if (document.getElementById('les-conventions')) {
    ReactDOM.render(<DelegataireLesConventions />, document.getElementById('les-conventions'));
}
