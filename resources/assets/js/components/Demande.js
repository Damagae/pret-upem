import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Convention from '../components/Convention'

HTMLElement.prototype.click = function() {
   var evt = this.ownerDocument.createEvent('MouseEvents');
   evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
   this.dispatchEvent(evt);
}

class Demande extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: this.props.user,
        convention: this.props.convention,
        modal: false,
        goBack: this.props.goBack,
        validations: '',
        options: [
          { //0
            key: 'modifier',
            nom: 'modifier',
            fonction: this.props.modifier,
            available: false
          },
          { //1
            key: 'supprimer',
            nom: 'supprimer',
            fonction: this.props.showDeleteModal,
            available: false
          },
          { //2
            key: 'valider',
            nom: 'valider',
            fonction: this.props.showValidateModal,
            available: false
          },
          { //3
            key: 'remise',
            nom: 'confirmer la remise',
            fonction: this.props.showRemiseModal,
            available: false
          },
          { //4
            key: 'reserve',
            nom: 'confirmer la remise avec réserves',
            fonction: this.props.showReserveModal,
            available: false
          },
          { //5
            key: 'telecharger',
            nom: 'télécharger',
            fonction: this.props.telecharger,
            available: true
          }
        ],
        optionsDetermined: false
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.convention !== prevProps.convention) {
        this.setState({convention: this.props.convention})
      }
      if (this.props.convention.validations !== prevProps.convention.validations) {
        const validations = this.props.convention.validations
        if (validations) {
          let v = {
            enseignant: validations.find(e => e.type.nom === 'enseignant'),
            agent: validations.find(e => e.type.nom === 'agent'),
            delegataire: validations.find(e => e.type.nom === 'delegataire'),
            reserve: validations.find(e => e.type.nom === 'reserve'),
            remise: validations.find(e => e.type.nom === 'remise'),
          }
          this.setState({validations: v})
        }
      }
      if (!this.state.optionsDetermined) {
        this.determineOptions()
      }
    }

    getTypeId(type) {
      if (!type) {
        return 0
      }
      if (type.length == 1) {
        return type[0].usertype_id
      }
      if (type.length > 0) {
        if (type.some(e => e.usertype_id == 3)) { // administrateur
          return 3
        }
        else if (type.some(e => e.usertype_id == 2)) {
          return 2 // Delegataire
        }
        else if (type.some(e => e.usertype_id == 1)) {
          return 1 // agent
        }
      }
      return 0 // etudiant
    }

    isSet(element) {
      if (element != undefined && element != '') {
        return true
      }
      return false
    }

    renderMateriel(materiel) {
      return materiel.map(e => {
        return (
          <li key={e.id}> {e.nom} ({e.quantite})</li>
        )
      })
    }

    getFileName(fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'))
      var filename = fullPath.substring(startIndex)
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1)
      }
      return filename
    }

    determineOptions() {
      const c = this.state.convention
      const s = this.state
      const o = this.state.options
      if (c.etat) {
        if (this.getTypeId(s.user.type) == 0) { // ETUDIANT
          if (c.etat.id <= 2) {
            o[1].available = true // Supprimer
          }
        } else if (this.getTypeId(s.user.type) == 1) { // AGENT
          if (c.etat.id <= 2) {
            o[0].available = true // Modifier
            o[1].available = true // Supprimer
            o[2].available = true // Valider
          }
          if (c.etat.id == 4 || c.etat.id == 5) { /* Validation de remise */
            o[3].available = true // Valider
            if (c.etat.id == 4) {
              o[4].available = true
            }
          }
        } else if (this.getTypeId(s.user.type) > 1) { // DELEGATAIRE
          if (c.etat.id <= 3) {
            o[2].available = true // Valider
          }
        }
        this.setState({options: o})
        this.setState({optionsDetermined: true})
      }
    }

    renderOptions() {
      let options = this.state.options.filter(e => e.available === true)
      return options.map((e) => {
        return <div key={e.key} className={"option option-" + e.key} onClick={() => { e.fonction() }}>{e.nom}{e.key === 'telecharger' && <i id="telecharger" className="fas fa-circle-notch"></i>}</div>
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

    getDeletionUserName(deletion) {
      if (deletion.user) {
        return user.nom
      } else if (deletion.user_id == 0) {
        return "l'étudiant"
      } else {
        return "l'enseignant"
      }
    }

    renderDoc(doc) {
      const c = this.state.convention
      let fileUrl = ''
      if (doc === "assurance") {
        fileUrl = c.assurance_url
      } else if (doc === "carte") {
        fileUrl = c.carte_etud_url
      }
      // si c'est IE
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        alert("Vous ne pouvez pas télécharger cette convention avec ce navigateur. Essayez avec Chrome ou Mozilla Firefox.")
    }
      return <a href={"/document/"+ doc +"/" + c.num_eng} target="_blank"><p>Voir le document</p></a>
  }

    render() {
        const c = this.state.convention
        const v = this.state.validations
        if (c && v) {
          return (
              <div className="container etudiant-demande">
                <div className="row justify-content-center">
                  <div className="col col-lg-8">
                    <h1>Demande {c.num_eng}</h1>
                    { this.renderOptions() }
                    <div className={"barre-etat etat-" + c.etat.id}><p className={"etat-nom"}>{c.etat.nom}</p></div>
                  </div>
                </div>
                <div className="row row justify-content-center">
                  <div className="col col-lg-8">
                    <h2>UPEM</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-1">
                    <p><strong>Nom&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>Université PARIS-EST MARNE-LA-VALLEE, <br/> Etablissement Public à Caractère Scientifique, Culturel et Professionnel</p>
                  </div>
                  <div className="col col-lg-1">
                    <p><strong>Adresse&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>
                      Cité Descartes, <br/>
                      Champs-sur-Marne, <br/>
                      5 boulevard Descartes, <br/>
                      77454 Marne-la-Vallée Cedex 2 <br/>
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-1">
                    <p><strong>Président&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>Monsieur Gilles ROUSSEL, <br/>
                      Agissant au nom et pour le compte du Campus Numérique
                    </p>
                  </div>
                  <div className="col col-lg-1">
                    <p><strong>Représentant du Campus Numérique&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-3">
                    <p>Monsieur Feriel GOULAMHOUSSEN
                    </p>
                  </div>
                </div>
                <div className="row row justify-content-center">
                  <div className="col col-lg-8">
                    <h2>Emprunteur</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Nom&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p> {c.emprunteur_nom} </p>
                  </div>
                  <div className="col col-lg-2">
                    <p><strong>Prénom&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p> {c.emprunteur_prenom} </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Adresse&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p> {c.emprunteur_adr}, <br/>
                    {c.emprunteur_ville}, {c.emprunteur_postal}</p>
                  </div>
                  <div className="col col-lg-2">
                  <p> <strong>Études poursuivies&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p> {c.emprunteur_formation}
                    </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Nom de l'assurance&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p> {c.assurance_nom} </p>
                  </div>
                  <div className="col col-lg-2">
                    <p><strong>Numéro de police&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p> {c.assurance_num} </p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-8">
                    <h2>Fiche de prêt</h2>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Nom du projet&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{c.nom_projet}</p>
                  </div>
                  <div className="col col-lg-2">
                    <p><strong>Etudiants participants&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{c.membres_equipe}</p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Enseignant responsable&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{c.enseignant_nom}</p>
                  </div>
                  <div className="col col-lg-2">
                    <p><strong>Bureau de prêt&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{c.bureaupret.nom}</p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Numéro de téléphone de l'emprunteur&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{c.emprunteur_tel}</p>
                  </div>
                  <div className="col col-lg-4">
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Date de début&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{this.dateFormate(c.date_debut)}</p>
                  </div>
                  <div className="col col-lg-2">
                    <p><strong>Date de fin&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-2">
                    <p>{this.dateFormate(c.date_fin)}</p>
                  </div>
                </div>
                <div className="row justify-content-center">
                  <div className="col col-lg-2">
                    <p><strong>Matériel&#8239;:</strong></p>
                  </div>
                  <div className="col col-lg-6">
                    <ul>
                    { c.materiel && this.renderMateriel(c.materiel) }
                    </ul>
                  </div>
                </div>
                <Convention niveau='2' />
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h2>Documents</h2>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h3>Copie de la carte étudiante</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      {this.isSet(c.carte_etud_url) ? this.renderDoc('carte') : <p>La carte n'a pas été fournie via le formulaire, l'emprunteur devra l'apporter au bureau de prêt pour validation.</p>}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h3>Copie de l'attestation d'assurance</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      {this.isSet(c.assurance_url) ? this.renderDoc('assurance') : <p>L'attestation d'assurance n'a pas été fournie via le formulaire, l'emprunteur devra l'apporter au bureau de prêt pour validation.</p>}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h2>Validations</h2>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h3>Validation de l'enseignant responsable du projet</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      {v.enseignant ? <p>Validé le {this.dateFormate(v.enseignant.created_at)} par {c.enseignant_nom}.</p> : <p>En attente.</p>}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h3>Validation du technicien audiovisuel</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      {v.agent ? <p>Validé le {this.dateFormate(v.agent.created_at)} par {v.agent.user && v.agent.user.prenom} {v.agent.user && v.agent.user.nom}.</p> : <p>En attente.</p>}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h3>Validation de Gilles Roussel</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-4">
                      {v.delegataire ? <p>Validé le {this.dateFormate(v.delegataire.created_at)} par délégation par {v.delegataire.user && v.delegataire.user.prenom} {v.delegataire.user && v.delegataire.user.nom}.</p> : <p>En attente.</p>}
                    </div>
                    <div className="col col-lg-4">
                      {(v.delegataire && v.delegataire.signature) && <img className="signature" src={"/document/signature/" + v.delegataire.user_id}></img>}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      <h3>Retour du matériel</h3>
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="col col-lg-8">
                      {v.reserve ? <p>Matériel remis avec réserves le {this.dateFormate(v.reserve.created_at)} à {v.reserve.user && v.reserve.user.prenom} {v.reserve.user && v.reserve.user.nom}.</p> : ''}
                      {v.remise ? <p>Matériel remis le {this.dateFormate(v.remise.created_at)} à {v.reserve.user && v.remise.user.prenom} {v.reserve.user && v.remise.user.nom}.</p> : <p>En attente.</p>}
                    </div>
                  </div>
                  <div className="row justify-content-center">
                    <div className="modifications col col-lg-8">
                      Créée le {this.dateFormate(c.created_at)} <br/>
                      {c.modifications ? 'Modifiée ' + c.modifications.length + ' fois' : 'Modifiée 0 fois'}
                      <ul>
                      {c.modifications && c.modifications.map(e => {
                        return <li key={e.id}>le {this.dateFormate(e.created_at)} par {e.user && (e.user.prenom + " " + e.user.nom)}</li>
                      }) }
                      </ul>
                      {c.deletion && ('Supprimée le ' + this.dateFormate(c.deletion.created_at) + ' par ' + (this.getDeletionUserName(c.deletion)))}
                    </div>
                  </div>
              </div>
          )
        }
        return (
          <div className="container end etudiant-demande">
          </div>
        )
    }
}

  export default Demande
