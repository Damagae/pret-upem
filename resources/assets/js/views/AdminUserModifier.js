import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MenuPrincipal from '../components/MenuPrincipal'
import Input from '../components/Input'
const FormValid = require('../lib/FormValidation.js')

export default class AdminUserModifier extends Component {
    /*
     * activeFormSection : partie du formulaire affichée
     * formFields : liste de tous les champs du formulaire avec
     * * * id : l'id du champ
     * * * value : valeur du champ
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
            }
        ],
        userId: '',
        bureauLastId: 1,
        signatureCB: '',
        userHasSignature: false,
        validForm: false,
        userType: []
      }
      this.getBureaux()
      this.getTypes()
      this.getUser()
      this.checkFormField = this.checkFormField.bind(this)

    }

    /* Vérifie la validité du formulaire à chaque MAJ du component */
    componentDidUpdate() {
      this.checkForm()
    }

    /* INITIALISATION */

    /* Met à jour le state avec tous les bureaux existants */
    getBureaux() {
      axios.get('/api/b')
      .then(response => {
        this.setState({bureaux: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

  /* Met à jour le state avec tous les types d'utilisateur existants */
    getTypes() {
      axios.get('/api/ut')
      .then(response => {
        this.setState({types: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    /* Met à jour le state avec l'utilisateur que l'on souhaite modifier */
    getUser() {
      let urlString = window.location.href
      let url = urlString.split('/')
      url.pop()
      let id = url.pop()
      axios.get('/api/u/' + id)
      .then(response => {
        const u = response.data
        const form = [ // Rempli le nouveau form avec le mail que l'on vient d'obtenir
            {
              id: 'nom',
              value: u.nom,
              valid: true
            },
            {
              id: 'prenom',
              value: u.prenom,
              valid: true
            },
            {
              id: 'mail',
              value: u.mail,
              valid: true
            }
        ]
        if (u.bureaux.length > 0) { // Si l'utilisateur est associé à un ou des bureau(x)
          form.push({ // On ajoute les bureaux au form
            id: 'bureaux',
            value: u.bureaux,
            valid: true
          })
          const lastId = u.bureaux[u.bureaux.length - 1]
          this.setState({bureauLastId: lastId.bureaupret_id}) // On MAJ le lastID
        }
        if (u.signature) { // Si l'utilisateur possède une signature
          form.push({ // On l'ajoute au form
            id: 'signature',
            value: u.signature,
            valid: true
          })
          this.setState({userHasSignature: true})
        }
        this.setState({formFields: form})
        this.setState({userId: u.id})
        this.setState({userType: u.type})
        if (this.getTypeId(u.type) == 1 && !u.bureaux) {
          this.createBureauField() // Crée un field Bureau si l'utilisateur est un agent sans bureaux
        }
        if (this.getTypeId(u.type) > 1) {
          this.createTypeField(u.type) // Crée un champ Type si l'utilisateur est délégataire ou admin
        }
      })
      .catch(error => {
        console.log(error)
        document.location = '/administration'
      })
    }

    /* GETTERS */

    /* Retourne
     * 1 si l'utilisateur est de type agent
     * 2 si l'utilisateur est de type délégataire
     * 3 si l'utilisateur est de type délégataire et administrateur
     */
    getTypeId(type) {
      if (Array.isArray(type)) {
        if (type.length > 1) // Admin
          return 3
        else if (type.some(e => e.usertype_id == 2)) // délégataires
          return 2
        else  // agent
          return 1
      } else {
        return type
      }
    }

    /* Retourne la valeur d'un champ input dont on fournit l'id */
    getInputValue(id) {
      const element = document.getElementById(id)
      if (element != null) {
        return element.value
      }
      return false
    }

    /* retourne le nom d'un fichier dont on fournit l'URL */
    getFileName(fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
      }
      return filename
    }

    /* AJOUTER ET RETIRER DES INPUTS BUREAU */

    /* Retire un input bureau s'il en reste plus d'un */
    removeBureau(idNbr) {
      /* On enlève le bureau du state */
      let upForm = this.state.formFields
      if (upForm[this.getIndexForm("bureaux")].value.length > 1) {
        upForm[this.getIndexForm('bureaux')].value = upForm[this.getIndexForm('bureaux')].value.filter(e => e.id !== idNbr)
        this.setState({formFields: upForm})
      }
      this.checkForm()
    }

    /* Ajoute un input bureau "vide" */
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

    /* FIELDS CHECKING - VERIFICATION DES CHAMPS SAISIS */

    /* Renvoie l'index de l'id dans le tableau formFields du state */
    getIndexForm(id) {
      return this.state.formFields.findIndex(e => e.id === id)
    }

    /* vérifie que le champ est valide puis vérifie si toute le formulaire est valide */
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

    /* Vérifie spécifiquement l'input bureau avec l'id "nbr" puis vérifie tout le formulaire */
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

    /* Vérifie que tous inputs du form sont remplis et MAJ validForm du state */
    checkForm() {
      const formFields = this.state.formFields
      const s = this.state
      let valid = false
      if (formFields[this.getIndexForm('mail')].valid && formFields[this.getIndexForm('prenom')].valid && formFields[this.getIndexForm('nom')].valid) { // Si le mail est rempli et valide
          // Si agent
          if (this.getTypeId(s.userType) == 1 && formFields[this.getIndexForm('bureaux')] && formFields[this.getIndexForm('bureaux')].valid) { // Vérifie que le bureau est aussi rempli
            valid = true
          }
          else if (this.getTypeId(s.userType) > 1) { // Si le type vaut 2 ou 3 (=delegataire)
            // Si le délégataire possédait déjà une signature
            if (this.state.userHasSignature) {
              // S'il a rempli la checkbox
              if (this.state.signatureCB != '') {
                // S'il a choisi de remplacer la signature
                if (this.state.signatureCB == 3) {
                  // Si la signature a été renseignée
                  if (this.state.formFields[this.getIndexForm('signature')].value != '') {
                    valid = true
                  }
                  else { valid = false }
                }
                else { valid = true }
              }
              else { valid = false }
            }
            else { valid = true } // On ne vérifie pas la signature car elle n'est pas obligatoire
          }
        }
      if (valid != this.state.validForm) {
        this.setState({validForm: valid})
      }
    }

    /* Vérifie le checkbox signature */
    signatureCheckbox() {
      const keepS = document.getElementById('keep-signature')
      const deleteS = document.getElementById('delete-signature')
      const replaceS = document.getElementById('replace-signature')
      let value
      let upForm = this.state.formFields
      if (keepS.checked)
        value = 1
      if (deleteS.checked)
        value = 2
      if (replaceS.checked) {
        value = 3
        upForm[this.getIndexForm('signature')].value = ''
      }

      if (upForm != this.state.formFields)
        this.setState({formFields: upForm})

      if (value && value != this.state.signatureCB)
        this.setState({signatureCB: value})

    }

    /* Retourne true si le formulaire est valide */
    validate() {
      return this.state.validForm
    }

    /* AUTRES */

    /* Renvoie true si le bouton doit être désactivé
     * Renvoie false si le bouton peut être activé
     */
    disabledValidateButton() {
      return !this.state.validForm
    }

    /* Affiche l'élément dont on fournit l'id */
    showIcon(id) {
      document.getElementById(id).style.opacity = 0.8;
    }

    /* Cache l'élément dont on fournit l'id */
    hideIcon(id) {
      document.getElementById(id).style.opacity = 0;
    }

    /* Crée un nouvel élément "add" dans le tableau formFields du state
     * Supprime "supp" du tableau
     */
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
      this.createFormField('bureaux', 'signature', [])
    }
    createSignatureField() {
      this.createFormField('signature', 'bureaux', '')
    }
    createTypeField(type) {
      this.createFormField('type', '', type)
    }

    /* RENDERING */

    /* rend tous les bureaux sous forme d'options d'un select */
    renderBureaux() {
      const b = this.state.bureaux
      const list = this.state.formFields[this.getIndexForm('bureaux')].value
      if (b.length > 0) {
        return b.map(e => {
          return <option key={e.id} disabled={list.some(l => e.id == l.bureaupret_id) ? 'disabled' : ''} value={e.id}>{e.nom}</option>
        })
      }
    }

    /* rend tous les usertypes sous forme d'options d'un select */
    renderTypes() {
      const t = this.state.types
      if (t.length > 0) {
        return t.map(e => {
          if (e.id != 1)
            return <option key={e.id} value={e.id}>{e.id == 3 ? 'delegataire et administrateur' : e.nom}</option>
        })
      }
    }

    /* SEND */

    /* retourne la requête pour envoyer une relation entre un utilisateur et un usertype */
    postUserType(userId, usertypeId) {
      return axios.post('/api/u/new-rel', {user_id: userId, usertype_id: usertypeId})
    }

    /* retourne un tableau de reqêtes postUserType en fonction du tableau type */
    getUserTypesRequest(userId, type) {
      let requests = []
      type.map(e => {
        requests.push(this.postUserType(userId, e))
      })
      return requests
    }

    /* retourne la requête pour envoyer une relation entre un utilisateur et un bureau de prêt */
    postBureau(userId, bureaupretId) {
      return axios.post('/api/u/new-bureau', {user_id: userId, bureaupret_id: bureaupretId})
    }

    /* retourne un tableau de reqêtes postBureau en fonction du tableau bureaux */
    getBureauxRequest(userId, bureaux) {
      let requests = []
      bureaux.map(e => {
        requests.push(this.postBureau(userId, e.bureaupret_id))
      })
      return requests
    }

    /* Envoie le formulaire */
    send() {
      const fields = this.state.formFields
      let bureau = false
      let signature = false
      let type = []
      const userId = this.state.userId
      const sCB = this.state.signatureCB

      let dataSignature = new FormData()

      if (fields.some(e => e.id === "bureaux") && fields.find(e => e.id === "bureaux").valid) {
        bureau = true
      }
      if (fields.some(e => e.id === "signature") && fields.find(e => e.id === "signature").valid) {
        dataSignature.append('signature', fields.find(e => e.id === "signature").file)
        signature = true
      }
      if (fields.some(e => e.id === "type") && fields.find(e => e.id === "type").valid) {
        if (this.getTypeId(fields.find(e => e.id === "type").value) == 3) { type = [2, 3] }
        else { type = [fields.find(e => e.id === "type").value[0]] }
      }
      else {
        if (this.getTypeId(this.state.userType) == 3) { type = [2, 3] }
        else if (this.getTypeId(this.state.userType) == 2) { type = [2] }
      }

      if (this.validate()) {
        /* ENVOI AGENT */
        if (this.getTypeId(this.state.userType) == 1) {
          // MAJ du user
          axios.post('/api/u/update/' + userId, {
            nom: fields.find(e => e.id === "nom").value,
            prenom: fields.find(e => e.id === "prenom").value,
            mail: fields.find(e => e.id === "mail").value
          })
          .then(response => {
              axios.delete('/api/ub/delete/' + userId) // Supprime toute relation avec un bureau
              .then(response => {
                console.log(response)
                const bureaux = fields.find(e => e.id === "bureaux").value
                axios.all(this.getBureauxRequest(userId, bureaux))
                .then(axios.spread((acct, perms) => {
                  document.location = '/administration/nouvel-utilisateur/confirmation'
                }))
              })
              .catch(function (error) {
                console.log(error)
                if (error.response && error.response.status == 422) {
                  document.getElementById('user-alert').classList.remove("invisible")
                  document.getElementById('user-alert').classList.add("visible")
                }
              })
            })
        }
        /* ENVOI DELEGATAIRE ET ADMIN */
        else {
          // MAJ du user
          axios.post('/api/u/update/' + userId, {
            nom: fields.find(e => e.id === "nom").value,
            prenom: fields.find(e => e.id === "prenom").value,
            mail: fields.find(e => e.id === "mail").value
          })
          .then(response => {
            console.log(response)
            axios.delete('/api/ut/delete/' + userId) // Suppression des anciennes relations usertype
            .then(response => {
              axios.all(this.getUserTypesRequest(userId, type))
              .then(axios.spread((acct, perms) => {
                console.log(acct)

                if (sCB == 2) {
                  axios.delete('/api/s/delete/' + userId)
                  .then(response => {
                    console.log(response)
                    document.location = '/administration/modification-utilisateur/confirmation'
                  })
                }

                else if (sCB == 3 && signature) {
                  dataSignature.append('user_id', userId)
                  axios.delete('/api/s/delete-force/' + userId) // AJOUT DE LA SIGNATURE
                  .then(response => {
                    axios.post('/api/s/new', dataSignature) // AJOUT DE LA SIGNATURE
                    .then(response => {
                      console.log(response)
                      document.location = '/administration/modification-utilisateur/confirmation'
                    })
                    .catch(function (error) {
                      console.log(error)
                    })
                  })
                }
                else if (!sCB && signature) {
                  dataSignature.append('user_id', userId)
                  axios.post('/api/s/new', dataSignature) // AJOUT DE LA SIGNATURE
                  .then(response => {
                    console.log(response)
                    document.location = '/administration/modification-utilisateur/confirmation'
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
                }
                else {
                  document.location = '/administration/modification-utilisateur/confirmation'
                }
              }))
            })
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

    renderSignatureInput() {
      this.createSignatureField()
      return (
        <div className="form-group">
          <label htmlFor="signature">Signature</label> <small>(Optionnel)</small>
          <input id="signature" onBlur={() => { this.checkFormField("signature", ["required", "file"]) }}  onChange={() => { this.checkFormField("signature", ["required", "file"]) }} onPaste={() => { this.checkFormField("signature", ["required", "file"]) }} onInput={() => { this.checkFormField("signature", ["required", "file"]) }} accept=".jpg, .jpeg, .png, .tiff" type="file" className="form-control-file" id="signature" />
        </div>
      )
    }

    renderSignatureCheckbox() {
      return (
        <div className="form-group">
          <input onChange={() => this.signatureCheckbox()} id="keep-signature" type="radio" name="signature-cb" value='keep' />
          <label htmlFor="keep-signature">Conserver l'ancienne signature</label> <br/>
          <input onChange={() => this.signatureCheckbox()} id="delete-signature" type="radio" name="signature-cb" value='delete' />
          <label htmlFor="delete-signature">Supprimer l'ancienne signature</label> <br/>
          <input onChange={() => this.signatureCheckbox()} id="replace-signature" type="radio" name="signature-cb" value='replace' />
          <label htmlFor="replace-signature">Remplacer l'ancienne signature</label> <br/>
        </div>
      )
    }

    renderBureauInput(input) {
      return (
        <div className="form-group">
          <div className="form-row d-flex align-items-center">
            <div className="col">
              <label htmlFor="bureau">Bureau de prêt assigné</label>
                <select key={"bureau-" + input.id}
                  onBlur={() => { this.checkFormFieldBureau(input.id) }}
                  onChange={() => { this.checkFormFieldBureau(input.id) }}
                  onPaste={() => { this.checkFormFieldBureau(input.id) }}
                  onInput={() => { this.checkFormFieldBureau(input.id) }}
                  defaultValue={input.bureaupret_id} className="form-control" id={"bureau-" + input.id}>
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
      if (this.state.formFields[this.getIndexForm("bureaux")]) {
        const list = this.state.formFields[this.getIndexForm("bureaux")].value
        if (list.length > 0) {
          return list.map((e) => {
              return(
                this.renderBureauInput(e)
              )
            })
        }
        else {
          const emptyField = {id: 1, bureaupret_id: -1}
          let upForm = this.state.formFields
          upForm[this.getIndexForm("bureaux")].value[0] = emptyField
          this.setState({formFields: upForm})
        }
      }
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

    renderTypeInput() {
      const type = this.state.formFields.find(e => e.id == 'type')
      return (
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="type">Type d'utilisateur</label>
                <select value={type && this.getTypeId(type.value)} onBlur={() => { this.checkFormField("type", ["required"]) }} onChange={() => { this.checkFormField("type", ["required"]) }} onPaste={() => { this.checkFormField("type", ["required"]) }} onInput={() => { this.checkFormField("type", ["required"]) }} defaultValue="-1" className="form-control" id="type">
                  <option value="-1" disabled>Veuillez choisir...</option>
                  { this.renderTypes() }
               </select>
            </div>
          </div>
        </div>
      )
    }

    render() {
        const s = this.state
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='admin' admin
              links={{see:'/campus-numerique/conventions', admin: '/administration'}} />
            <div className="container end">
              <div className="row justify-content-center new-form">
                  <div className="col col-md-8 offset-md-1 nouvelle-demande">
                    <div key='user-modifier' className='user-modifier'>
                      <h2>Modifier l'utilisateur</h2>
                      <div className="row">
                        <div className="col">
                          <div id="user-alert" className="alert alert-danger invisible" role="alert">
                            Il existe déjà un utilisateur avec cette adresse email.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input id="prenom" nom="Prénom" defaultValue={s.formFields.find(e => e.id == 'prenom').value} verifications={["required", "alpha"]} type="text" placeholder="Prénom" callback={this.checkFormField} />
                        </div>
                        <div className="col">
                          <Input id="nom" nom="Nom" defaultValue={s.formFields.find(e => e.id == 'nom').value} verifications={["required", "alpha"]} type="text" placeholder="Nom" callback={this.checkFormField} />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input id="mail" nom="Email" defaultValue={s.formFields.find(e => e.id == 'mail').value} verifications={["required", "emailUpem"]} type="text" placeholder="Email UPEM de l'utilisateur" callback={this.checkFormField} />
                        </div>
                        <div className="col"></div>
                      </div>
                      { (this.getTypeId(s.userType) > 1) && this.renderTypeInput() }
                      <div className="row">
                        <div className="col">
                          { (this.getTypeId(s.userType) == 1) && this.renderBureauInputs() }
                          { (this.getTypeId(s.userType) == 1) && this.renderAddNewBureauButton() }
                          { (!this.state.userHasSignature && (this.getTypeId(s.userType) >= 2)) && this.renderSignatureInput() }
                          { (this.state.userHasSignature && (this.getTypeId(s.userType) >= 2)) && this.renderSignatureCheckbox() }
                          { s.signatureCB == 3 && this.renderSignatureInput() }
                        </div>
                      </div>
                      {/*<div className="row">
                        <div className="col">
                          { this.renderAdministrateurInput() }
                        </div>
                      </div>*/}
                      <div className="col"></div>
                      <button className='btn btn-orange-outlined' onClick={() => { document.location = '/administration/utilisateur/' + s.userId }}>Annuler</button>
                      <button className='btn btn-orange next' onClick={() => { this.send() }} disabled={ this.disabledValidateButton() ? 'disabled' : '' } >Valider</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}


if (document.getElementById('admin-user-modifier')) {
    ReactDOM.render(<AdminUserModifier />, document.getElementById('admin-user-modifier'));
}
