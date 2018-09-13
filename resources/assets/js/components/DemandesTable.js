import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Objectif from '../components/Objectif'

class DemandesTable extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: this.props.user,
        conventions: this.props.conventions,
        conventionsAll: this.props.conventions,
        showDeleteModal: this.props.showDeleteModal,
        changeSubMenu: this.props.changeSubMenu,
        subMenu: this.props.subMenu,
        updateConventions: this.props.updateConventions,
        sort: {
          field: 'etat',
          direction: 'up'
        }
      }
      if (this.props.user.bureaux) {
        this.state.bureau = this.props.user.bureaux[0]
      }
    }

    componentWillReceiveProps(props) {
      this.setState({conventions: this.sort(props.conventions)})
      this.setState({conventionsAll: this.sort(props.conventions)})
      if (props.subMenu != this.state.subMenu)
        this.setState({subMenu: props.subMenu})
    }

    isConventionsEmpty() {
      if (this.state.conventions.length > 0)
        return false
      return true
    }

    changeBureau(bureau) {
      if (bureau != this.state.bureau)
      this.setState({bureau: bureau})
      this.state.updateConventions(bureau.bureaupret_id)
    }

    getTypeId(type) {
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

    /* Transforme un format de date aaaa-mm-jj en jj/mm/aaaa */
    dateFormate(d) {
      const date = new Date(d)
      const j = date.getDate()
      const m = (date.getUTCMonth() + 1)
      const a = date.getUTCFullYear()
      return ("0" + j).slice(-2) + '/' + ("0" + m).slice(-2) + '/' + a
    }

    canDelete(c) {
      const user = this.state.user
      if (this.getTypeId(user.type) == 1 && c.etat.id <= 2) { // Agent
        return true
      }
      else if (this.getTypeId(user.type) == 0 && c.etat.id <= 2) {
        return true
      }
      return false
    }

    renderConventions() {
      const c = this.state.conventions
      const u = this.state.user
      if (c.length > 0) {
        return c.map(e => {
          if (e.bureaupret) {
            return (
                <tr key={e.id} onClick={() => {
                    if (this.getTypeId(u.type) == 1) {document.location = ("/personnel/conventions/" + e.num_eng)}
                    if (this.getTypeId(u.type) == 0) {document.location = ("/etudiant/mes-demandes/" + e.num_eng)}
                    if (this.getTypeId(u.type) > 1) {document.location = ("/campus-numerique/conventions/" + e.num_eng)}
                  }} className={e.etat ? ('etat etat-'+e.etat.id) : ''}>
                  <td  >{e.num_eng}</td>
                  {this.getTypeId(u.type) != 0 && <td>{e.emprunteur_mail}</td>}
                  <td>{e.nom_projet}</td>
                  <td>{this.dateFormate(e.date_debut)}</td>
                  <td>{this.dateFormate(e.date_fin)}</td>
                  <td>{e.bureaupret ? e.bureaupret.nom : ' '}</td>
                  <td>{e.enseignant_nom}</td>
                  <td>{e.materiel ? this.renderMateriel(e.materiel) : ' '}</td>
                  <td>{e.etat ? e.etat.nom : ''}</td>
                  <td className="boutons">
                    <i className="fas fa-eye"></i>
                    {this.canDelete(e) ? (<i onClick={(event) => {
                      event.stopPropagation()
                      this.state.showDeleteModal(e.id)
                    }} className="fas fa-times"></i>) : ''}
                  </td>
                </tr>
            )
          }
        })
      }
    }

    renderMateriel(materiel) {
      return materiel.map(e => {
        return (
          <p key={e.id}> {e.nom} ({e.quantite})</p>
        )
      })
    }

    setSort(newField) {
      const up = document.getElementById(newField + '-up')
      const down = document.getElementById(newField + '-down')
      const sortIcons = document.getElementsByClassName('sort-icon')
      let otherFields = Array.from(sortIcons)
      otherFields = otherFields.filter(e => e != up && e != down)
      let newSort = this.state.sort
      // Si on reclique sur un champ déjà trié
      if (this.state.sort.field === newField) {
        if (this.state.sort.direction === 'up') {
          down.classList.remove('invisible')
          down.classList.add('visible')
          up.classList.remove('visible')
          up.classList.add('invisible')
          newSort.field = newField
          newSort.direction = 'down'
          this.setState({sort: newSort})
        }
        else {
          down.classList.remove('visible')
          down.classList.add('invisible')
          up.classList.remove('invisible')
          up.classList.add('visible')
          newSort.field = newField
          newSort.direction = 'up'
          this.setState({sort: newSort})
        }
      }
      else {
        down.classList.remove('visible')
        down.classList.add('invisible')
        up.classList.remove('invisible')
        up.classList.add('visible')
        newSort.field = newField
        newSort.direction = 'up'
        this.setState({sort: newSort})
      }
      otherFields.map(e => {
        e.classList.remove('visible')
        e.classList.add('invisible')
      })
      this.setState({conventions: this.sort(this.state.conventions)})
    }

    sortInf(a, b, c, d) {
        if (a < b) { return 1 }
        if (a > b) { return -1 }
        // Tri secondaire
        if (c > d) { return 1 }
        if (c < d) { return -1 }
        return 0
    }

    sortSup(a, b, c, d) {
        if (a > b) { return 1 }
        if (a < b) { return -1 }
        // Tri secondaire
        if (c > d) { return 1 }
        if (c < d) { return -1 }
        return 0
    }

    sort(conventions) {
      let sortedConventions = []
      const field = this.state.sort.field
      const direction = this.state.sort.direction
      if (direction === 'up') {
        switch (field) {
          case 'num_eng':
            sortedConventions = conventions.sort((a, b) => {
              if (a.num_eng > b.num_eng) { return 1 }
              if (a.num_eng < b.num_eng) { return -1 }
              return 0
            })
            break
          case 'emprunteur_mail':
            sortedConventions = conventions.sort((a, b) => {
              if (a.emprunteur_mail.toLowerCase() > b.emprunteur_mail.toLowerCase()) { return 1 }
              if (a.emprunteur_mail.toLowerCase() < b.emprunteur_mail.toLowerCase()) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
            break
          case 'nom_projet':
            sortedConventions = conventions.sort((a, b) => {
              if (a.nom_projet.toLowerCase() > b.nom_projet.toLowerCase()) { return 1 }
              if (a.nom_projet.toLowerCase() < b.nom_projet.toLowerCase()) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
            break
          case 'date_debut':
            sortedConventions = conventions.sort((a, b) => {
              if (a.date_debut < b.date_debut) { return 1 }
              if (a.date_debut > b.date_debut) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
            break
          case 'date_fin':
            sortedConventions = conventions.sort((a, b) => {
              if (a.date_fin < b.date_fin) { return 1 }
              if (a.date_fin > b.date_fin) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
            break
          case 'bureaupret':
            sortedConventions = conventions.sort((a, b) => {
              if (a.bureaupret.id > b.bureaupret.id) { return 1 }
              if (a.bureaupret.id < b.bureaupret.id) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
          case 'enseignant':
            sortedConventions = conventions.sort((a, b) => {
              if (!a.enseignant_nom && b.enseignant_nom) { return -1 }
              if (a.enseignant_nom && !b.enseignant_nom) { return 1 }
              if (!a.enseignant_nom && !b.enseignant_nom) { return 0 }
              if (a.enseignant_nom.toLowerCase() > b.enseignant_nom.toLowerCase()) { return 1 }
              if (a.enseignant_nom.toLowerCase() < b.enseignant_nom.toLowerCase()) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
            break
          case 'etat':
            sortedConventions = conventions.sort((a, b) => {
              if (a.etat.id > b.etat.id) { return 1 }
              if (a.etat.id < b.etat.id) { return -1 }
              if (a.num_eng < b.num_eng) { return 1 }
              if (a.num_eng > b.num_eng) { return -1 }
              return 0
            })
            break
          default:
            sortedConventions = conventions
            break
          }
        } else {
          switch (field) {
            case 'num_eng':
              sortedConventions = conventions.sort((a, b) => {
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              })
              break
            case 'emprunteur_mail':
              sortedConventions = conventions.sort((a, b) => {
                if (a.emprunteur_mail.toLowerCase() < b.emprunteur_mail.toLowerCase()) { return 1 }
                if (a.emprunteur_mail.toLowerCase() > b.emprunteur_mail.toLowerCase()) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              })
              break
            case 'nom_projet':
              sortedConventions = conventions.sort((a, b) => {
                if (a.nom_projet.toLowerCase() < b.nom_projet.toLowerCase()) { return 1 }
                if (a.nom_projet.toLowerCase() > b.nom_projet.toLowerCase()) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              }
              )
              break
            case 'date_debut':
              sortedConventions = conventions.sort((a, b) => {
                if (a.date_debut > b.date_debut) { return 1 }
                if (a.date_debut < b.date_debut) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              })
              break
            case 'date_fin':
              sortedConventions = conventions.sort((a, b) => {
                if (a.date_fin > b.date_fin) { return 1 }
                if (a.date_fin < b.date_fin) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              })
              break
            case 'bureaupret':
              sortedConventions = conventions.sort((a, b) => {
                if (a.bureaupret.id < b.bureaupret.id) { return 1 }
                if (a.bureaupret.id > b.bureaupret.id) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              })
            case 'enseignant':
              sortedConventions = conventions.sort((a, b) => {
                if (a.enseignant_nom && !b.enseignant_nom) { return -1 }
                if (!a.enseignant_nom && b.enseignant_nom) { return 1 }
                if (!a.enseignant_nom && !b.enseignant_nom) { return 0 }
                if (a.enseignant_nom.toLowerCase() < b.enseignant_nom.toLowerCase()) { return 1 }
                if (a.enseignant_nom.toLowerCase() > b.enseignant_nom.toLowerCase()) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              }
              )
              break
            case 'etat':
              sortedConventions = conventions.sort((a, b) => {
                if (a.etat.id < b.etat.id) { return 1 }
                if (a.etat.id > b.etat.id) { return -1 }
                if (a.num_eng < b.num_eng) { return 1 }
                if (a.num_eng > b.num_eng) { return -1 }
                return 0
              })
              break
            default:
              sortedConventions = conventions
              break
            }
        }
        return sortedConventions
    }

    renderDelegataireMenu() {
      return (
        <div style={{display: 'inline'}} className="demandes-sub-menu">
          <div className={this.state.subMenu === 'valider' ? 'selected' : ''} onClick={() => this.state.changeSubMenu('valider')}>A valider</div>
          <div className={this.state.subMenu === 'toutes' ? 'selected' : ''}  onClick={() => this.state.changeSubMenu('toutes')}>Toutes les conventions</div>
        </div>
      )
    }

    renderSearchBar() {
      return (
        <div style={{display: 'inline'}}>
          <input onChange={() => this.searchConvention()} id="search" name="search-bar" className="search-bar form-control" type="text" placeholder="Rechercher une convention"></input><i className="fas fa-search"></i>
        </div>
      )
    }

    searchConvention() {
      let sb = document.getElementById("search")
      if (sb.value) {
        const prevConventions = this.state.conventionsAll
        let newConventions = prevConventions.filter(e =>
          e.num_eng.toLowerCase().includes(sb.value.toLowerCase()) ||
          e.emprunteur_mail.toLowerCase().includes(sb.value.toLowerCase()) ||
          e.nom_projet.toLowerCase().includes(sb.value.toLowerCase()) ||
          this.dateFormate(e.date_debut).toLowerCase().includes(sb.value.toLowerCase()) ||
          this.dateFormate(e.date_fin).toLowerCase().includes(sb.value.toLowerCase()) ||
          e.bureaupret.nom.toLowerCase().includes(sb.value.toLowerCase()) ||
          (e.enseignant_nom && e.enseignant_nom.toLowerCase().includes(sb.value.toLowerCase())) ||
          e.etat.nom.toLowerCase().includes(sb.value.toLowerCase()) ||
          e.materiel.some(e => e.nom.toLowerCase().includes(sb.value.toLowerCase()))
        )
        this.setState({conventions: newConventions})
      } else {
        this.setState({conventions: this.state.conventionsAll})
      }
    }

    renderBureauDropdown() {
      const b = this.state.user.bureaux
      return (
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Selectionner un autre bureau
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            { b.map(e => {
              return (
                <button key={e.id} className="dropdown-item" type="button" onClick={() => { this.changeBureau(e) }}>{e.nom}</button>
              )
            }) }
          </div>
        </div>
      )
    }

    render() {
      const u = this.state.user
      const s = this.state
        return (
            <div className="container end etudiant-demandes">
              <div className="row justify-content-center align-items-end">
                <div className="col col-lg-9"></div>
                <div style={{marginTop: '3rem'}} className="col col-lg-3">
                  { (this.getTypeId(u.type) == 1 && u.bureaux) && this.renderBureauDropdown()}
                </div>
              </div>
              <div className="row justify-content-center align-items-end">
                <div className="col">
                  <h1>
                    {this.getTypeId(u.type) == 0 && "Mes demandes"}
                    { (this.getTypeId(u.type) == 1) && "Demandes de prêt " + s.bureau.nom}
                    {this.getTypeId(u.type) > 1 && "Demandes de prêt"}
                  </h1>
                  { this.getTypeId(u.type) > 1 && this.renderDelegataireMenu()}
                  { this.getTypeId(u.type) != 0 && this.renderSearchBar()}
                </div>

              </div>
              <div className="row justify-content-center">
                <div className="col">
                  <table>
                    <thead>
                      <tr>
                        <th className="num-eng selectable" onClick={() => this.setSort('num_eng')}>
                          Numéro d'enregistrement
                          <i id="num_eng-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="num_eng-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        {this.getTypeId(u.type) != 0 && <th className="emprunteur-mail selectable" onClick={() => this.setSort('emprunteur_mail')}>
                          Emprunteur
                          <i id="emprunteur_mail-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="emprunteur_mail-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>}
                        <th className="nom-projet selectable" onClick={() => this.setSort('nom_projet')}>
                          Nom du projet
                          <i id="nom_projet-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="nom_projet-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        <th className="date-debut selectable" onClick={() => this.setSort('date_debut')}>
                          Date de début
                          <i id="date_debut-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="date_debut-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        <th className="date-fin selectable" onClick={() => this.setSort('date_fin')}>
                          Date de fin
                          <i id="date_fin-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="date_fin-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        <th className="bureau selectable" onClick={() => this.setSort('bureaupret')}>
                          Bureau de prêt
                          <i id="bureaupret-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="bureaupret-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        <th className="enseignant selectable" onClick={() => this.setSort('enseignant')}>
                          Enseignant
                          <i id="enseignant-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="enseignant-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        <th className="materiel">
                          Matériel
                        </th>
                        <th className="etat selectable" onClick={() => this.setSort('etat')}>
                          Etat
                          <i id="etat-up" className="sort-icon fas fa-caret-up invisible"></i>
                          <i id="etat-down" className="sort-icon fas fa-caret-down invisible"></i>
                        </th>
                        <th className="boutons"></th>
                      </tr>
                    </thead>
                    <tbody>
                      { this.renderConventions() }
                      { this.isConventionsEmpty() && <Objectif legend="Il n'y a aucune convention pour l'instant" /> }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        )
    }
}

export default DemandesTable
