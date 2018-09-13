import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MenuPrincipal from '../components/MenuPrincipal'
import Input from '../components/Input'
const FormValid = require('../lib/FormValidation.js')

export default class AdminNewUser extends Component {
    /*
     * activeFormSection : partie du formulaire affichée
     * materielNbr : nombre de champs input matériel affichés
     * formSections : liste de toutes les parties du formulaire avec
     * * * [0] : la clé de l'formSection
     * * * [1] : le nom de la partie à afficher dans le titre
     * * * [2] : la validité de la partie (si elle est entièrement remplie correctement = true)
     * formFields : liste de tous les champs du formulaire avec
     * * * id : l'id du champ
     * * * value : valeur du champ
     * * * part : la partie du formulaire à laquelle le champ appartient
     */
    constructor(props) {
      super(props)
      this.state = {
        bureaux: [],
        types: [],
        formFields: [
            {
              id: 'nom',
              value: '',
              valid: false
            },
            {
              id: 'prenom',
              value: '',
              valid: false
            },
            {
              id: 'mail',
              value: '',
              valid: false
            },
            {
              id: 'type',
              value: '',
              valid: false
            },
        ],
        validForm: false,
        bureauLastId: 1
      }
      this.getBureaux()
      this.getTypes()
      this.checkFormField = this.checkFormField.bind(this)
    }

    /* GETTERS */

    getBureaux() {
      axios.get('/api/b')
      .then(response => {
        this.setState({bureaux: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    getTypes() {
      axios.get('/api/ut')
      .then(response => {
        this.setState({types: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    showIcon(id) {
      document.getElementById(id).style.opacity = 0.8;
    }

    hideIcon(id) {
      document.getElementById(id).style.opacity = 0;
    }


    /* FIELDS CHECKING */

    /* Renvoie l'index de l'id dans le tableau formFields du state */
    getIndexForm(id) {
      return this.state.formFields.findIndex(e => e.id === id)
    }

    /* vérifie que le champ est valide puis vérifie si toute la section est valide */
    checkFormField(id, verifications) {
      /* Vérification du champ saisi ou modifié */
      const element = document.getElementById(id)
      let value = element.value // value fournie pour la vérification
      let upForm = this.state.formFields // récupère l'élément formFields du state

      /* Si le champ est valide */
      if (FormValid.verifyFormField(value, verifications)) { // fait tous les tests spécifiés pour la value de l'éléments
        element.classList.remove("is-invalid") // retire la classe is-invalid si elle était associée
        if (id === "signature")
          upForm[this.getIndexForm(id)].file = element.files[0]
        upForm[this.getIndexForm(id)].value = element.value
        upForm[this.getIndexForm(id)].valid = true
      }
      else {
        element.classList.add("is-invalid")
        upForm[this.getIndexForm(id)].valid = false
      }

      this.setState({formFields : upForm}) // met à jour le state avec le nouveau form
      this.checkForm() // Vérifie tout le formulaire

      return upForm[this.getIndexForm(id)].valid
    }

    checkFormFieldBureau(nbr) {
      let bureau = document.getElementById("bureau-" + nbr)
      let upForm = this.state.formFields // récupère l'élément formFields du state
      let validInput = false

      const inputIndex = this.state.formFields[this.getIndexForm("bureaux")].value.findIndex(e => e.id === nbr)
      /* S'il existe déjà un élément dans formFields avec le même id */
      if (inputIndex !== -1) {
        upForm[this.getIndexForm("bureaux")].value[inputIndex] = {id: nbr, bureaupret_id: bureau.value}
      }
      /* Si l'élément n'existe pas */
      else {
        upForm[this.getIndexForm("bureaux")].value[0] = {id: nbr, bureaupret_id: bureau.value}
      }

      const bureauxField = upForm[this.getIndexForm("bureaux")]
      if (bureauxField.value.every(e => e.bureaupret_id != -1)) {
        upForm[this.getIndexForm("bureaux")].valid = true
      } else {
        upForm[this.getIndexForm("bureaux")].valid = false
      }

      if ( !bureau || !bureau.value ) {
        upForm[this.getIndexForm("bureaux")].valid = false
      }

      this.setState({formFields : upForm}) // met à jour le state avec le nouveau form
      this.checkForm()
    }

    /*
    adminCheckBox() {
      const element = document.getElementById('admin')
      let value = element.checked // value fournie pour la vérification
      if (value) {
        let upForm = this.state.formFields // récupère l'élément formFields du state
        upForm[this.getIndexForm('admin')].value = true
        upForm[this.getIndexForm('admin')].valid = true
        this.setState({formFields : upForm})
      } else {
        let upForm = this.state.formFields // récupère l'élément formFields du state
        upForm[this.getIndexForm('admin')].value = false
        upForm[this.getIndexForm('admin')].valid = false
        this.setState({formFields : upForm})
      }
    }
    */

    /* Vérifie que tous inputs du form sont remplis */
    checkForm() {
      const formFields = this.state.formFields
      let valid = false
      if (formFields[this.getIndexForm('mail')].valid && formFields[this.getIndexForm('nom')].valid && formFields[this.getIndexForm('prenom')].valid) { // Si le mail est rempli et valide
        if (formFields[this.getIndexForm('type')].valid) { // Si le type vaut 1 (=agent)
          if (formFields[this.getIndexForm('type')].value == 1 && formFields[this.getIndexForm('bureaux')] && formFields[this.getIndexForm('bureaux')].valid) { // Vérifie que le bureau est aussi rempli
            valid = true
          }
          else if (formFields[this.getIndexForm('type')].value > 1) { // Si le type vaut 2 (=delegataire)
            valid = true // On ne vérifie pas la signature car elle n'est pas obligatoire
          }
        }
      }
      this.setState({validForm: valid})
    }

    disabledValidateButton() {
      return !this.state.validForm
    }

    /* RENDERING */

    renderBureaux() {
      const b = this.state.bureaux
      if (b.length > 0) {
        return b.map(e => {
          return <option key={e.id} value={e.id}>{e.nom}</option>
        })
      }
    }

    renderTypes() {
      const t = this.state.types
      if (t.length > 0) {
        return t.map(e => {
          return <option key={e.id} value={e.id}>{e.id == 3 ? 'delegataire et administrateur' : e.nom}</option>
        })
      }
    }

    /* Récupère la valeur d'un champ input dont on fournit l'id */
    getInputValue(id) {
      const element = document.getElementById(id)
      if (element != null) {
        return element.value
      }
      return false
    }

    getFileName(fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
      }
      return filename
    }

    validate() {
      return this.state.validForm
    }

    /* SEND */

    postUserType(userId, usertypeId) {
      return axios.post('/api/u/new-rel', {user_id: userId, usertype_id: usertypeId})
    }

    getUserTypesRequest(userId, type) {
      let requests = []
      type.map(e => {
        requests.push(this.postUserType(userId, e))
      })
      return requests
    }

    postBureau(userId, bureaupretId) {
      return axios.post('/api/u/new-bureau', {user_id: userId, bureaupret_id: bureaupretId})
    }

    getBureauxRequest(userId, bureaux) {
      let requests = []
      bureaux.map(e => {
        requests.push(this.postBureau(userId, e.bureaupret_id))
      })
      return requests
    }

    send() {
      const fields = this.state.formFields
      let type
      let bureaux = false
      let signature = false
      let userId
      let userBureaux

      let dataSignature = new FormData()

      // Administrateur et délégataire
      if (fields.find(e => e.id === "type").valid && fields.find(e => e.id === "type").value == 3) {
        type = [2, 3]
      }
      // Délégataire ou agent
      else if (fields.find(e => e.id === "type").valid && fields.find(e => e.id === "type").value < 3) {
        type = [fields.find(e => e.id === "type").value] // Administrateur et delegataires
      }

      if (fields.some(e => e.id === "bureaux") && fields.find(e => e.id === "bureaux").valid) {
        bureaux = true
        userBureaux = fields.find(e => e.id === "bureaux").value
      }
      if (fields.some(e => e.id === "signature") && fields.find(e => e.id === "signature").valid) {
        dataSignature.append('signature', fields.find(e => e.id === "signature").file)
        signature = true
      }

      if (this.validate()) {
        axios.post('/api/u/new', { // CREATION USER
          nom: fields.find(e => e.id === "nom").value,
          prenom: fields.find(e => e.id === "prenom").value,
          mail: fields.find(e => e.id === "mail").value
        })
        .then(response => { // AJOUT DES USERTYPES
          console.log(response)
          userId = response.data.id
          axios.all(this.getUserTypesRequest(userId, type))
          .then(axios.spread((acct, perms) => {
            console.log(acct)

            if (bureaux && userId) { // AJOUT DES BUREAUX
              axios.all(this.getBureauxRequest(userId, userBureaux))
              .then(axios.spread((acct, perms) => {
                document.location = '/administration/nouvel-utilisateur/confirmation'
              }))
            }

            else if (signature && userId) {
              dataSignature.append('user_id', userId)
              axios.post('/api/s/new', dataSignature) // AJOUT DE LA SIGNATURE
              .then(response => {
                console.log(response)
                document.location = '/administration/nouvel-utilisateur/confirmation'
              })
              .catch(function (error) {
                console.log(error)
              })
            }

            else {
              document.location = '/administration/nouvel-utilisateur/confirmation'
            }

          }))
        })
        .catch(function (error) {
          console.log(error)
          if (error.response && error.response.status == 422) {
            document.getElementById('user-alert').classList.remove("invisible")
            document.getElementById('user-alert').classList.add("visible")
          }
        })
      }
    }

    addBureau() {
      let lastId = this.state.bureauLastId
      ++lastId
      let newBureauInput = {id: lastId, bureaupret_id: -1}
      let upForm = this.state.formFields

      upForm[this.getIndexForm('bureaux')].valid = false
      upForm[this.getIndexForm('bureaux')].value.push(newBureauInput)

      this.setState({formFields: upForm})
      this.setState({bureauLastId: lastId})
      this.setState({validForm: false})
    }

    removeBureau(idNbr) {
      /* On enlève l'agent du state */
      let upForm = this.state.formFields
      if (upForm[this.getIndexForm("bureaux")].value.length > 1) {
        upForm[this.getIndexForm('bureaux')].value = upForm[this.getIndexForm('bureaux')].value.filter(e => e.id !== idNbr)
        this.setState({formFields: upForm})
      }
      this.checkForm()
    }

    createFormField(add, supp, value) {
      let newFormFields = this.state.formFields
      if (!newFormFields.some(e => e.id == add)) {
        if (newFormFields.some(e => e.id == supp)) {
          newFormFields = newFormFields.filter(e => e.id != supp)
        }
        newFormFields.push({
          id: add,
          value: value,
          valid: false
        })
        this.setState({formFields: newFormFields})
      }
    }

    createBureauField() {
      this.createFormField('bureaux', 'signature', [{id: 1, bureaupret_id: -1}])
    }
    createSignatureField() {
      this.createFormField('signature', 'bureaux', '')
    }

    renderSignatureInput() {
      this.createSignatureField()
      return (
        <div className="form-group">
          <label htmlFor="signature">Signature</label> <small>(Optionnel)</small>
          <input id="signature" onBlur={() => { this.checkFormField("signature", ["required", "file"]) }} onChange={() => { this.checkFormField("signature", ["required", "file"]) }} onPaste={() => { this.checkFormField("signature", ["required", "file"]) }} onInput={() => { this.checkFormField("signature", ["required", "file"]) }} accept=".jpg, .jpeg, .png, .tiff" type="file" className="form-control-file" id="signature" />
        </div>
      )
    }

    renderBureauInput(input) {
      return (
        <div key={'input-' + input.id} className="form-group">
          <div className="form-row d-flex align-items-center">
            <div className="col">
              <label htmlFor="bureau">Bureau de prêt assigné</label>
                <select key={"bureau-" + input.id}
                  onBlur={() => { this.checkFormFieldBureau(input.id) }}
                  onChange={() => { this.checkFormFieldBureau(input.id) }}
                  onPaste={() => { this.checkFormFieldBureau(input.id) }}
                  onInput={() => { this.checkFormFieldBureau(input.id) }}
                  defaultValue={ input.bureaupret_id }
                  className="form-control" id={"bureau-" + input.id}>
                  <option value="-1" disabled>Veuillez choisir...</option>
                  { this.renderBureaux() }
               </select>
             </div>
               <div className="col-3 delete-agent-input">
                 <i className="fas fa-times"
                   onMouseOver={() => {this.showIcon("bureau-del-"+ input.id)}}
                   onMouseOut={() => {this.hideIcon("bureau-del-"+ input.id)}}
                   onClick={() => {this.removeBureau(input.id)}}
                   >
                 </i>
                 <span id={"bureau-del-" + input.id}>supprimer</span>
               </div>
             </div>
        </div>
      )

    }

    renderBureauInputs() {
      this.createBureauField()
      if (this.state.formFields[this.getIndexForm("bureaux")]) {
        const list = this.state.formFields[this.getIndexForm("bureaux")].value
        if (list.length > 0) {
          return list.map((e) => {
              return(
                this.renderBureauInput(e)
              )
            })
        }
      }
    }

    renderAddNewBureauButton() {
      return (
        <button id="add-bureau" className={"btn btn-add"}
          onClick={() => { this.addBureau() }} disabled={this.state.validForm ? '' : 'disabled'}>
          <i className="fas fa-plus"></i>
          Ajouter un nouveau bureau
        </button>
      )
    }

    /*
    renderAdministrateurInput() {
      return (
        <div className="form-group">
          <input onChange={() => this.adminCheckBox()} id="admin" type="checkBox" name="admin" value="admin" />
          <label htmlFor="admin">Administrateur</label>
        </div>
      )
    }
    */

    render() {
        const s = this.state
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='admin' admin
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />
            <div className="container end">
              <div className="row justify-content-center new-form">
                  <div className="col col-md-8 offset-md-1 nouvelle-demande">
                    <div key='new-user' className='new-user'>
                      <h2>Nouvel utilisateur</h2>
                      <div className="row">
                        <div className="col">
                          <div id="user-alert" className="alert alert-danger invisible" role="alert">
                            L'adresse email est incorrecte ou il existe déjà un utilisateur avec cette adresse email.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input id="prenom" nom="Prénom" verifications={["required", "alpha"]} type="text" placeholder="Prénom" callback={this.checkFormField} />
                        </div>
                        <div className="col">
                          <Input id="nom" nom="Nom" verifications={["required", "alpha"]} type="text" placeholder="Nom" callback={this.checkFormField} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input id="mail" nom="Email" verifications={["required", "emailUpem"]} type="text" placeholder="Email UPEM de l'utilisateur" callback={this.checkFormField} />
                        </div>
                        <div className="col"></div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <div className="form-group">
                            <label htmlFor="type">Type d'utilisateur</label>
                              <select onBlur={() => { this.checkFormField("type", ["required"]) }} onChange={() => { this.checkFormField("type", ["required"]) }} onPaste={() => { this.checkFormField("type", ["required"]) }} onInput={() => { this.checkFormField("type", ["required"]) }} defaultValue="-1" className="form-control" id="type">
                                <option value="-1" disabled>Veuillez choisir...</option>
                                { this.renderTypes() }
                             </select>
                          </div>
                        </div>
                        <div className="col">
                          { (this.state.formFields[this.getIndexForm('type')].value == 1) && this.renderBureauInputs() }
                          { (this.state.formFields[this.getIndexForm('type')].value == 1) && this.renderAddNewBureauButton() }
                          { (this.state.formFields[this.getIndexForm('type')].value >= 2) && this.renderSignatureInput() }
                        </div>
                      </div>
                      {/*<div className="row">
                        <div className="col">
                          { this.renderAdministrateurInput() }
                        </div>
                      </div>*/}
                      <button className='btn btn-orange-outlined' onClick={() => { document.location = '/administration' }}>Annuler</button>
                      <button className='btn btn-orange next' onClick={() => { this.send() }} disabled={ this.disabledValidateButton() ? 'disabled' : '' } >Valider</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}


if (document.getElementById('admin-new-user')) {
    ReactDOM.render(<AdminNewUser />, document.getElementById('admin-new-user'));
}
