import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Demande from '../components/Demande'
import DemandesTable from '../components/DemandesTable'

export default class AdminTableaux extends Component {
    constructor(props) {
      super(props)
      this.state = {
        subMenu: 'utilisateurs',
        users: [],
        bureaux: [],
        bureauxAll: [],
        usersAll: [],
        removeUserId: '',
        removeBureauId: '',
        userModal: false,
        bureauModal: false,
        sort: {
          field: 'type',
          direction: 'up'
        }
      }

      this.getUsers()
      this.getBureaux()
    }

    componentDidUpdate() {
      const sortedUsers = this.sort(this.state.users, 'users')
      const sortedBureaux = this.sort(this.state.bureaux, 'bureaux')
      if (sortedUsers != this.state.users) {
        this.setState({users: sortedUsers})
      }
      if (sortedBureaux != this.state.bureaux) {
        this.setState({bureaux: sortedBureaux})
      }
    }

    /* INITIALISATION */

    getUsers() {
      axios.get('/api/u')
      .then(response => {
        let users = response.data
        this.setState({users: users})
        this.setState({usersAll: users})
      })
      .catch(error => {
        console.log(error)
      })
    }

    getBureaux() {
      axios.get('/api/b')
      .then(response => {
        let bureaux = response.data
        this.setState({bureaux: bureaux})
        this.setState({bureauxAll: bureaux})
      })
      .catch(error => {
        console.log(error)
      })
    }

    showDeleteUserModal(id) {
      this.setState({userModal: true})
      this.setState({removeUserId: id})
    }

    showDeleteBureauModal(id) {
      this.setState({bureauModal: true})
      this.setState({removeBureauId: id})
    }

    isVisibleUserModal() {
      return this.state.userModal
    }

    isVisibleBureauModal() {
      return this.state.bureauModal
    }

    cancelUserAlert() {
      this.setState({userModal: false})
      this.setState({removeUserId: ''})
    }

    cancelBureauAlert() {
      this.setState({bureauModal: false})
      this.setState({removeBureauId: ''})
    }

    cancelAlertClickingAway(e) {
      const popup = document.getElementById('popup')
      const elements = document.getElementsByClassName('popup-child')
      const popupChildren = Array.prototype.slice.call(elements)
      if (e.target != popup && !popupChildren.includes(e.target)) {
        this.cancelUserAlert()
        this.cancelBureauAlert()
      }
    }

    confirmUserDeletion() {
      this.deleteUser()
      this.setState({userModal: false})
    }

    confirmBureauDeletion() {
      this.deleteBureau()
      this.setState({bureauModal: false})
    }

    deleteUser() {
      axios.delete('/api/u/delete/' + this.state.removeUserId)
      .then(response => {
        this.getUsers()
      })
      .catch(error => {
        console.log(error)
      })
    }

    deleteBureau() {
      axios.delete('/api/b/delete/' + this.state.removeBureauId)
      .then(response => {
        this.getBureaux()
      })
      .catch(error => {
        console.log(error)
      })
    }

    /* FORMATING */

    getFileName(signature) {
      if (signature === null)
        return 0
      const fullPath = signature.url
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'))
      var filename = fullPath.substring(startIndex)
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1)
      }
      return filename
    }

    /* STATE UPDATERS */

    changeSubMenu(newMenu) {
      this.setState({subMenu: newMenu})
    }

    /* SORTING FUNCTIONS */

    setSort(newField, array) {
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
      if (array === 'users') {
        this.setState({users: this.sort(this.state.users, 'users')})
      }
      else if (array === 'bureaux')
        this.setState({bureaux: this.sort(this.state.bureaux, 'bureaux')})
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

    sort(elements, array) {
      let sortedElements = []
      const field = this.state.sort.field
      const direction = this.state.sort.direction
      if (array == 'users') {
        let users = elements
        if (direction === 'up') {
          switch (field) {
            case 'nom':
              sortedElements = users.sort((a, b) => {
                if (!a.nom && b.nom) { return -1 }
                if (!b.nom && a.nom) { return 1 }
                if (!a.nom && !b.nom) { return 0 }
                if (a.nom.toLowerCase() > b.nom.toLowerCase()) { return 1 }
                if (a.nom.toLowerCase() < b.nom.toLowerCase()) { return -1 }
                return 0
              })
              break
            case 'prenom':
              sortedElements = users.sort((a, b) => {
                if (!a.prenom && b.prenom) { return -1 }
                if (!b.prenom && a.prenom) { return 1 }
                if (!a.prenom && !b.prenom) { return 0 }
                if (a.prenom.toLowerCase() > b.prenom.toLowerCase()) { return 1 }
                if (a.prenom.toLowerCase() < b.prenom.toLowerCase()) { return -1 }
                if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                if (this.getTypeId(a.type) > b.type) { return -1 }
                return 0
              })
              break
            case 'mail':
              sortedElements = users.sort((a, b) => {
                if (!a.mail && b.mail) { return -1 }
                if (!b.mail && a.mail) { return 1 }
                if (!a.mail && !b.mail) { return 0 }
                if (a.mail.toLowerCase() > b.mail.toLowerCase()) { return 1 }
                if (a.mail.toLowerCase() < b.mail.toLowerCase()) { return -1 }
                if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return -1 }
                return 0
              })
              break
            case 'type':
              sortedElements = users.sort((a, b) => {
                if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return -1 }
                return 0
              })
              break
            case 'signature':
              sortedElements = users.sort((a, b) => {
                if (!a.signature && b.signature) { return -1 }
                if (!b.signature && a.signature) { return 1 }
                if (!a.signature && !b.signature) { return 0 }
                if (this.getFileName(a.signature) > this.getFileName(a.signature)) { return 1 }
                if (this.getFileName(a.signature) < this.getFileName(a.signature)) { return -1 }
                if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return -1 }
                return 0
              })
            default:
              sortedElements = users
              break
            }
          } else {
            switch (field) {
              case 'nom':
                sortedElements = users.sort((a, b) => {
                  if (!a.nom && b.nom) { return 1 }
                  if (!b.nom && a.nom) { return -1 }
                  if (!a.nom && !b.nom) { return 0 }
                  if (a.nom.toLowerCase() < b.nom.toLowerCase()) { return 1 }
                  if (a.nom.toLowerCase() > b.nom.toLowerCase()) { return -1 }
                  return 0
                })
                break
              case 'prenom':
                sortedElements = users.sort((a, b) => {
                  if (!a.prenom && b.prenom) { return 1 }
                  if (!b.prenom && a.prenom) { return -1 }
                  if (!a.prenom && !b.prenom) { return 0 }
                  if (a.prenom.toLowerCase() < b.prenom.toLowerCase()) { return 1 }
                  if (a.prenom.toLowerCase() > b.prenom.toLowerCase()) { return -1 }
                  if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                  if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return -1 }
                  return 0
                })
                break
              case 'mail':
                sortedElements = users.sort((a, b) => {
                  if (!a.mail && b.mail) { return 1 }
                  if (!b.mail && a.mail) { return -1 }
                  if (!a.mail && !b.mail) { return 0 }
                  if (a.mail.toLowerCase() < b.mail.toLowerCase()) { return 1 }
                  if (a.mail.toLowerCase() > b.mail.toLowerCase()) { return -1 }
                  if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                  if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return -1 }
                  return 0
                }
                )
                break
              case 'type':
                sortedElements = users.sort((a, b) => {
                  if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return 1 }
                  if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return -1 }
                  return 0
                })
                break
              case 'signature':
                sortedElements = users.sort((a, b) => {
                  if (!a.signature && b.signature) { return 1 }
                  if (!b.signature && a.signature) { return -1 }
                  if (!a.signature && !b.signature) { return 0 }
                  if (this.getFileName(a.signature) > this.getFileName(a.signature)) { return 1 }
                  if (this.getFileName(a.signature) < this.getFileName(a.signature)) { return -1 }
                  if (this.getTypeId(a.type) < this.getTypeId(b.type)) { return 1 }
                  if (this.getTypeId(a.type) > this.getTypeId(b.type)) { return -1 }
                  return 0
                })
                break
              default:
                sortedElements = users
                break
              }
            }
      } else if (array == 'bureaux') {
        let bureaux = elements
        if (direction === 'up') {
            sortedElements = bureaux.sort((a, b) => {
              if (a.nom.toLowerCase() > b.nom.toLowerCase()) { return 1 }
              if (a.nom.toLowerCase() < b.nom.toLowerCase()) { return -1 }
              return 0
            })
          } else {
            sortedElements = bureaux.sort((a, b) => {
              if (a.nom.toLowerCase() < b.nom.toLowerCase()) { return 1 }
              if (a.nom.toLowerCase() > b.nom.toLowerCase()) { return -1 }
              return 0
            })
          }
      }
      return sortedElements
    }

    /* SEARCH */

    searchUsers() {
      let sb = document.getElementById("search")
      if (sb.value) {
        const prevUsers = this.state.usersAll
        let newUsers = prevUsers.filter(e =>
          e.mail.toLowerCase().includes(sb.value.toLowerCase()) ||
          (e.type.nom && e.type.nom.toLowerCase().includes(sb.value.toLowerCase()))
        )
        this.setState({users: newUsers})
      } else {
        this.setState({users: this.state.usersAll})
      }
    }

    searchBureaux() {
      let sb = document.getElementById("search")
      if (sb.value) {
        const prevBureaux = this.state.bureauxAll
        let newBureaux = prevBureaux.filter(e =>
          e.nom.toLowerCase().includes(sb.value.toLowerCase()) ||
          ((e.agents.length > 0 ) && e.agents.some(e => e.mail.toLowerCase().includes(sb.value.toLowerCase())))
        )
        this.setState({bureaux: newBureaux})
      } else {
        this.setState({bureaux: this.state.bureauxAll})
      }
    }

    /* DELETE CONVENTION */

    setSelectElementId(id) {
      this.setState({selectElementId: id})
    }

    unsetSelectElementId() {
      this.setState({selectElementId: ''})
    }

    showDeleteModal(id) {
      this.setState({modal: true})
      this.setState({removeElementId: id})
    }

    isVisibleModal() {
      return this.state.modal
    }

    cancelAlert() {
      this.setState({modal: false})
      this.setState({removeElementId: ''})
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

    /* GETTERS */

    getTypeId(type) {
      if (type.length > 0) {
        if (type.some(e => e.usertype_id === 3)) { // administrateur
          return 3
        }
        else if (type.some(e => e.usertype_id === 2)) {
          return 2 // Delegataire
        }
      }
      return 1 // agent
    }

    /* RENDER FUNCTIONS */

    renderSubMenu() {
      return (
        <div style={{display: 'inline'}} className="demandes-sub-menu">
          <div className={this.state.subMenu === 'utilisateurs' ? 'selected' : ''} onClick={() => this.changeSubMenu('utilisateurs')}>Utilisateurs</div>
          <div className={this.state.subMenu === 'bureaux' ? 'selected' : ''} onClick={() => this.changeSubMenu('bureaux')}>Bureaux de prêt</div>
        </div>
      )
    }

    renderSearchBar() {
      const version = this.state.subMenu
      return (
        <div style={{display: 'inline'}}>
          <input onChange={() => {if (version == 'utilisateurs') {this.searchUsers()}
          else if (version == 'bureaux') {this.searchBureaux()}} }
            id="search" name="search-bar" className="search-bar form-control" type="text" placeholder="Rechercher..."></input><i className="fas fa-search"></i>
        </div>
      )
    }

    renderUtilisateursHeader() {
      return (
        <thead>
          <tr>
            <th className="nom selectable" onClick={() => this.setSort('nom', 'users')}>
              Nom
              <i id="nom-up" className="sort-icon fas fa-caret-up invisible"></i>
              <i id="nom-down" className="sort-icon fas fa-caret-down invisible"></i>
            </th>
            <th className="prenom selectable" onClick={() => this.setSort('prenom', 'users')}>
              Prénom
              <i id="prenom-up" className="sort-icon fas fa-caret-up invisible"></i>
              <i id="prenom-down" className="sort-icon fas fa-caret-down invisible"></i>
            </th>
            <th className="mail selectable" onClick={() => this.setSort('mail', 'users')}>
              Mail
              <i id="mail-up" className="sort-icon fas fa-caret-up invisible"></i>
              <i id="mail-down" className="sort-icon fas fa-caret-down invisible"></i>
            </th>
            <th className="type selectable" onClick={() => this.setSort('type', 'users')}>
              Type
              <i id="type-up" className="sort-icon fas fa-caret-up invisible"></i>
              <i id="type-down" className="sort-icon fas fa-caret-down invisible"></i>
            </th>
            <th className="signature selectable" onClick={() => this.setSort('signature', 'users')}>
              Signature
              <i id="signature-up" className="sort-icon fas fa-caret-up invisible"></i>
              <i id="signature-down" className="sort-icon fas fa-caret-down invisible"></i>
            </th>
            <th className="boutons"></th>
          </tr>
        </thead>
      )
    }

    renderUtilisateurs() {
      const u = this.state.users
      if (u.length > 0) {
        return u.map(e => {
            return (
                <tr key={e.id} onClick={() => {document.location = ("/administration/utilisateur/" + e.id)}
                } className={e.type ? ('etat type-'+ this.getTypeId(e.type)) : ''}>
                  <td>{e.nom && e.nom}</td>
                  <td>{e.prenom && e.prenom}</td>
                  <td>{e.mail && e.mail}</td>
                  <td>{e.type && e.type.map((e) =>
                    {return e.nom + ' '}
                  )}</td>
                  <td onClick={(event) => {
                    if (e.signature) {
                      event.stopPropagation()
                      window.open("/document/signature/" + e.id,'_blank')
                    }
                  }} >{e.signature && 'Voir signature'}</td>
                  <td className="boutons">
                    <i className="fas fa-eye"></i>
                    <i onClick={(event) => {
                      event.stopPropagation()
                      this.showDeleteUserModal(e.id)
                    }} className="fas fa-times"></i>
                  </td>
                </tr>
            )
        })
      }
    }

    renderBureauxHeader() {
      return (
        <thead>
          <tr>
            <th className="nom selectable" onClick={() => this.setSort('nom-bureau', 'bureaux')}>
              Nom
              <i id="nom-bureau-up" className="sort-icon fas fa-caret-up invisible"></i>
              <i id="nom-bureau-down" className="sort-icon fas fa-caret-down invisible"></i>
            </th>
            <th className="agents">
              Agents responsables
            </th>
          </tr>
        </thead>
      )
    }

    renderBureaux() {
      const b = this.state.bureaux
      if (b.length > 0) {
        return b.map(e => {
            return (
                <tr key={e.id} onClick={() => {document.location = ("/administration/bureau/" + e.id)}
                } className='etat bureau'>
                  <td>{e.nom && e.nom}</td>
                  <td>
                    {e.agents.map(a => {
                      return <span>{a.mail} <br/> </span>
                    })}
                  </td>
                  <td className="boutons">
                    <i className="fas fa-eye"></i>
                    <i onClick={(event) => {
                      event.stopPropagation()
                      this.showDeleteBureauModal(e.id)
                    }} className="fas fa-times"></i>
                  </td>
                </tr>
            )
        })
      }
    }

    renderButtonAddNewUser() {
      return (
        <button id="add-user" className={"btn btn-add"}
          onClick={() => { document.location = '/administration/nouvel-utilisateur' }}>
          <i className="fas fa-plus"></i>
          Ajouter un nouvel utilisateur
        </button>
      )
    }

    renderButtonAddNewBureau() {
      return (
        <button id="add-bureau" className={"btn btn-add"}
          onClick={() => { document.location = '/administration/nouveau-bureau' }}>
          <i className="fas fa-plus"></i>
          Ajouter un nouveau bureau de prêt
        </button>
      )
    }

    render() {
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='admin' admin
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />

              <div className="container end etudiant-demandes administration">
                <div className="row justify-content-center align-items-end">
                  <div className="col">
                    <h1>Administration</h1>
                    { this.renderSubMenu() }
                    { this.renderSearchBar() }
                  </div>

                </div>
                <div className="row justify-content-center">
                  <div className={"col" + (this.state.subMenu === 'bureaux' ? " col-lg-8" : "")}>
                    <table>
                      { this.state.subMenu === 'utilisateurs' && this.renderUtilisateursHeader()}
                      { this.state.subMenu === 'bureaux' && this.renderBureauxHeader()}
                      <tbody>
                        { this.state.subMenu === 'utilisateurs' && this.renderUtilisateurs()}
                        { this.state.subMenu === 'bureaux' && this.renderBureaux()}
                      </tbody>
                    </table>
                  </div>
                </div>
                { this.state.subMenu === 'utilisateurs' && this.renderButtonAddNewUser() }
                { this.state.subMenu === 'bureaux' && this.renderButtonAddNewBureau() }
              </div>

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleUserModal() ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer un utilisateur.</strong></p>
                  <p>Une fois supprimé, l'utilisateur ne pourra plus accéder à son interface. <br/> Son nom sera toutefois conservé sur les conventions qui le portent.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelUserAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmUserDeletion() }}>Confirmer la suppression</p>
                  </div>
                </div>
              </div>

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleBureauModal() ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer un bureau de prêt.</strong></p>
                  <p>Une fois le bureau de prêt supprimé, les agents associés à celui-ci ne pourront plus accéder à son interface et les étudiants ne pourront plus le choisir. <br/> Son nom sera toutefois conservé sur les conventions qui le portent.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelBureauAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmBureauDeletion() }}>Confirmer la suppression</p>
                  </div>
                </div>
              </div>

          </div>
        )
    }
}

if (document.getElementById('administration')) {
    ReactDOM.render(<AdminTableaux />, document.getElementById('administration'));
}
