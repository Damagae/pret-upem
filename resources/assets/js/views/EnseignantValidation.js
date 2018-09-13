import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import axios from 'axios'


export default class EnseignantValidation extends Component {
    constructor(props) {
      super(props)
      this.state = {
        convention: this.getConvention(),
        validationModal: false,
        refusModal: false,
      }
    }

    getConvention() {
      let url = window.location.href
      let token = url.split('/').pop()
      axios.get('/api/c/bytoken/' + token)
      .then(response => {
        this.setState({convention: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    isValidated() {
      return (this.state.convention.etat_id > 1)
    }

    renderMaterielList() {
      return this.state.convention.materiel.map( (e) => {
        return <li key={e.id}> {e.nom + ' (' + e.quantite + ')'} </li>
      })
    }

    /* Transforme un format de date aaaa-mm-jj en jj/mm/aaaa */
    dateFormate(d) {
      const date = new Date(d)
      const j = date.getDate()
      const m = (date.getUTCMonth() + 1)
      const a = date.getUTCFullYear()
      return ("0" + j).slice(-2) + '/' + ("0" + m).slice(-2) + '/' + a
    }

    isVisibleModal(key) {
      if (key === 'validation') {
        return this.state.validationModal
      }
      if (key === 'refus') {
        return this.state.refusModal
      }
      return false
    }

    cancelAlertClickingAway(e) {
      const popup = document.getElementById('popup')
      const elements = document.getElementsByClassName('popup-child')
      const popupChildren = Array.prototype.slice.call(elements)
      if (e.target != popup && !popupChildren.includes(e.target)) {
        if (this.state.validationModal) {
          this.setState({validationModal: false})
        }
        if (this.state.refusModal) {
          this.setState({refusModal: false})
        }
      }
    }

    confirmValidation() {
      // Ajoute la validation 'enseignant' à la convention
      axios.put('/api/v/enseignant/' + this.state.convention.id)
      .then(response => {
        console.log(response)
        // Envoie un mail de notification à l'étudiant
          axios.put('/api/mail/etudiant/validation/' + this.state.convention.id)
          .then(response => {
            console.log(response)
            document.location = '/enseignant/' + this.state.convention.token_convention + '/validation'
          })
          .catch(error => {
            console.log(error)
          })
      })
      .catch(error => {
        console.log(error)
      })
    }

    confirmRefus() {
      axios.put('/api/c/enseignant/cancel/' + this.state.convention.id)
      .then(response => {
        console.log(response)
        axios.put('/api/mail/etudiant/refus/' + this.state.convention.id)
        .then(response => {
          console.log(response)
          document.location = '/enseignant/' + this.state.convention.token_convention + '/annulation'
        })
      })
      .catch(error => {
        console.log(error)
      })
    }

    render() {
      const c = this.state.convention
      if (c) {
        return (
          <div className="container-full end">
            <MenuPrincipal links={{}} />
              <div className="container nouvelle-demande">
                <div className="row justify-content-center">
                  <div className="col col-lg-8">
                    <h1>Demande de prêt de matériel audiovisuel</h1>
                    <h2>Validation du projet par l'enseignant</h2>
                  </div>
                </div>
                <div className="row align-items-center justify-content-center">
                  <div className={"col col-lg-8 validation-section " + (this.isValidated() ? "visible" : "invisible")}>
                    <div className="alert alert-primary" role="alert">
                      Vous avez déjà validé ou annulé cette demande de prêt.
                    </div>
                  </div>
                </div>
                <div className="row align-items-center justify-content-center">
                  <div className="col col-lg-8 validation-section">
                    <h3>Informations sur le projet</h3>
                    <p><b>Numéro d'enregistrement : </b> { c.num_eng } </p>
                    <p><b>Nom du projet : </b> { c.nom_projet } </p>
                    <p><b>Bureau de prêt : </b> { c.bureaupret.nom } </p>
                    <p><b>Date de début de l'emprunt : </b> { this.dateFormate(c.date_debut) } </p>
                    <p><b>Date de fin de l'emprunt : </b> { this.dateFormate(c.date_fin) } </p>
                    <p><b>Etudiants participants au projet : </b> { c.membres_equipe } </p>
                  </div>
                </div>

                <div className="row align-items-center justify-content-center">
                  <div className="col col-lg-8 validation-section">
                    <h3>Enseignant référent</h3>
                    <p><b>Nom : </b> { c.enseignant_nom } </p>
                    <p><b>Mail : </b> { c.enseignant_mail } </p>
                  </div>
                </div>

                <div className="row align-items-center justify-content-center">
                  <div className="col col-lg-8 validation-section">
                    <h3>Matériel</h3>
                    <ul>{ this.renderMaterielList() }</ul>
                  </div>
                </div>

                <div className="row align-items-center justify-content-center">
                  <div className={"col col-lg-8 validation-section " + (this.isValidated() ? 'invisible' : 'visible')}>
                    <button className='btn btn-orange-outlined' onClick={() => { this.setState({refusModal: true}) }}>Refuser la demande</button>
                    <button className='btn btn-orange' onClick={() => { this.setState({validationModal: true}) }}>Valider la demande en tant que responsable enseignant du projet</button>
                  </div>
                </div>
            </div>

            <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="validation-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('validation') ? 'visible' : 'invisible')}>
              <div className="popup">
                <p><strong>Vous êtes sur le point de valider la demande de prêt.</strong></p>
                <p>Une fois la demande de prêt validée, l'étudiant emprunteur pourra poursuivre sa démarche de validation de demande de prêt.</p>
                <p>Vous ne pourrez plus annuler la validation.</p>
                <div className="d-flex justify-content-around popup-child">
                  <p className="cancel popup-child" onClick={() => { this.setState({validationModal: false}) }}>Annuler</p>
                  <p className="confirm orange popup-child" onClick={() => { this.confirmValidation() }}>Confirmer la validation</p>
                </div>
              </div>
            </div>

            <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="refus-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal('refus') ? 'visible' : 'invisible')}>
              <div className="popup">
                <p><strong>Vous êtes sur le point de refuser la validation de la demande de prêt.</strong></p>
                <p>Une fois la demande de prêt refusée, l'étudiant ne pourra plus poursuivre sa démarche de validation de demande de prêt.</p>
                <p>Il devra créer une nouvelle demande afin de pouvoir emprunter du matériel</p>
                <div className="d-flex justify-content-around popup-child">
                  <p className="cancel popup-child" onClick={() => { this.setState({refusModal: false}) }}>Annuler</p>
                  <p className="confirm orange popup-child" onClick={() => { this.confirmRefus() }}>Confirmer le refus</p>
                </div>
              </div>
            </div>

          </div>
        )
      }
      else {
        return (
          <div></div>
        )
      }
    }

  }

  if (document.getElementById('validation')) {
      ReactDOM.render(<EnseignantValidation />, document.getElementById('validation'));
  }
