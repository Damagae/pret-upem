import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MenuPrincipal from '../components/MenuPrincipal'
import SideMenuForm from '../components/SideMenuForm'
import Input from '../components/Input'
const FormValid = require('../lib/FormValidation.js')

export default class PersonnelModifier extends Component {
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
        user: null,
        activeFormSection: 'infoprojet',
        formSections: [
          [
            'infoprojet',
            'Informations sur le projet',
            false
          ],
          [
            'infopersonnel',
            'Informations personnelles',
            false
          ],
          [
            'materiel',
            'Matériel',
            false
          ],
          [
            'documents',
            'Documents',
            false
          ],
          [
            'validation',
            'Validation',
            true
          ]
        ],
        formFields: [ // NORMAL
            {
              id: 'nom-projet',
              value: '',
              part: 'infoprojet',
              valid: false
            },
            {
              id: 'bureau',
              value: '',
              part: 'infoprojet',
              valid: false
            },
            {
              id: 'date-debut',
              value: '',
              part: 'infoprojet',
              valid: false
            },
            {
              id: 'date-fin',
              value: '',
              part: 'infoprojet',
              valid: false
            },
            {
              id: 'participants',
              value: '',
              part: 'infoprojet',
              valid: false
            },
            {
              id: 'adresse',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'ville',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'postal',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'formation',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'carte',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'nom-assurance',
              part: 'infopersonnel',
              value: '',
              valid: true
            },
            {
              id: 'num-assurance',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'telephone',
              part: 'infopersonnel',
              value: '',
              valid: false
            },
            {
              id: 'materiel',
              part: 'materiel',
              value: [

              ],
              valid: false,
            },
            {
              id: 'carte-etud',
              part: 'documents',
              value: '',
              valid: false
            },
            {
              id: 'assurance',
              part: 'documents',
              value: '',
              valid: false
            }],
        materielLastId: 1,
        bureaux: [],
        convention: {}
      }
      this.updateActiveFormSection = this.updateActiveFormSection.bind(this)
      this.checkFormField = this.checkFormField.bind(this)
      this.getCurrentUser()
    }

    componentWillMount() {
      this.getBureaux()
      this.getConvention()
    }

    updateActiveFormSection(formSection) {
      this.setState({activeFormSection: formSection})
    }

    getCurrentUser() {
      axios.get('/api/u/bymail/' + currentUser.mail)
      .then(response => {
        this.setState({user: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    /* Vérifie dès le début que tous les champs récupéré de l'api sont OK (on sait jamais) */
    verifyEverything() {
      let sections = this.state.formSections
      let fields = this.state.formFields
      let c = this.state.convention

      /* Section INFOPROJET */
      c.nom_projet && this.checkFormField("nom-projet", ["required"])
      c.bureaupret && this.checkFormField("bureau", ["required"])
      c.date_debut && this.checkFormField("date-debut", ["required", "date"])
      c.date_fin && this.checkFormField("date-fin", ["required", "dateSup"])
      c.membres_equipe && this.checkFormField("participants", ["required", "alpha"])

      /* Section INFOPERSONNEL */
      c.emprunteur_adr && this.checkFormField("adresse", ["required", "alphaNum"], 'infopersonnel')
      c.emprunteur_ville && this.checkFormField("ville", ["required", "alpha"], 'infopersonnel')
      c.emprunteur_postal && this.checkFormField("postal", ["required", "numeric"], 'infopersonnel')
      c.emprunteur_formation && this.checkFormField("formation", ["required", "alpha"])
      c.emprunteur_carte_num && this.checkFormField("carte", ["required", "carte"], 'infopersonnel')
      c.assurance_nom && this.checkFormField("nom-assurance", ["required", "alphaNum"], 'infopersonnel')
      c.assurance_num && this.checkFormField("num-assurance", ["required", "numeric"], 'infopersonnel')
      c.emprunteur_tel && this.checkFormField("telephone", ["required", "numeric"], 'infopersonnel')


      /* Section MATERIEL */
      fields[this.getIndexForm('materiel')].value.map((e) => {
        this.checkFormFieldMateriel(e.id)
      })

      /* Section DOCUMENTS */
      c.carte_etud_url && this.checkFormField("carte-etud", ["required", "file"])
      c.assurance_url && this.checkFormField("assurance", ["required", "file"])

    }

    setMateriel() {
      const materiel = this.state.convention.materiel
      let fields = this.state.formFields
      materiel.map((e) => {
        fields[this.getIndexForm('materiel')].value.push({id: e.id, nom: e.nom, qte: e.quantite})
      })
      fields[this.getIndexForm('materiel')].value.shift()
      this.setState({formFields: fields})
    }

    getConvention() {
      let urlString = window.location.href
      let url = urlString.split('/')
      url.pop()
      let numEng = url.pop()
      axios.get('/api/c/bynumeng/' + numEng)
      .then(response => {
        this.setState({convention: response.data})
        this.setMateriel()
        this.verifyEverything()
      })
      .catch(error => {
        console.log(error)
      })
    }

    dateInputDisplay() {
      /* Vérifie quel type d'input date afficher selon les navigateurs */
      let test = document.createElement('input')
      test.type = 'date'

      return (test.type === 'date')
      /* Renvoie true si le champ date est accepté
       * renvoie false sinon
       */
    }

    renderPart() {
      return ([
        this.title1(),
        this.infoprojet(),
        this.infopersonnel(),
        this.materiel(),
        this.documents(),
        this.validation()
      ])
    }

    title1() {
      return (
        <h1 key='titre'>Modification de la demande de prêt {this.state.convention.num_eng}</h1>
      )
    }

    next() {
      const activeFormSection = this.state.activeFormSection
      const rank = this.getIndex(this.state.activeFormSection)
      const newActiveFormSection = this.state.formSections[rank+1][0]
      this.setState({activeFormSection: newActiveFormSection})
    }

    /* renvoie false si la partie est validée = bouton activé
     * renvoie true si la partie n'est pas validée = bouton désactivé
     */
    disabledNextButton() {
      const activeFormSection = this.state.activeFormSection
      const rank = this.getIndex(this.state.activeFormSection)
      return !(this.state.formSections[rank][2])
    }

    previous() {
      const rank = this.getIndex(this.state.activeFormSection)
      this.setState({activeFormSection: this.state.formSections[rank-1][0]})
    }

    getIndex(formSection) {
      return this.state.formSections.findIndex(e => e[0] === formSection)
    }

    isVisible(key) {
      if (this.state.activeFormSection === key)
        return true
      else if (key === 'modal' && this.state.modal)
        return true
      return false
    }

    /* Renvoie l'index de l'id dans le tableau formFields du state */
    getIndexForm(id) {
      return this.state.formFields.findIndex(e => e.id === id)
    }

    /* vérifie que le champ est valide puis vérifie si toute la section est valide */
    checkFormField(id, verifications, part) {

      /* Vérification du champ saisi ou modifié */
      const element = document.getElementById(id)
      let value = element.value // value fournie pour la vérification = se transforme en tableau dans certains cas
      let upForm = this.state.formFields // récupère l'élément formFields du state
      if(id === "date-fin") { // on transforme value en tableau pour ce cas précis
        value = [upForm[this.getIndexForm("date-debut")].value, value]
      }

      /* Si le champ est valide */
      if (FormValid.verifyFormField(value, verifications)) { // fait tous les tests spécifiés pour la value de l'éléments
        element.classList.remove("is-invalid") // retire la classe is-invalid si elle était associée
        if (id === "assurance" || id === "carte-etud")
          upForm[this.getIndexForm(id)].file = element.files[0]
        upForm[this.getIndexForm(id)].value = element.value
        upForm[this.getIndexForm(id)].valid = true
      }
      else {
        element.classList.add("is-invalid")
        upForm[this.getIndexForm(id)].valid = false
      }

      this.setState({formFields : upForm}) // met à jour le state avec le nouveau form

      /* Vérification totale de la partie */
      const newFormSections = this.state.formSections
      let rightPart = ""
      if (part) {rightPart = part}
      else {rightPart = this.state.activeFormSection}
      const formFields = this.state.formFields.filter(e => e.part === rightPart)
      if (formFields.every(e => e.valid == true)) { // Si tout est valide
        newFormSections[this.getIndex(rightPart)][2] = true
      } else {
        newFormSections[this.getIndex(rightPart)][2] = false
      }
      this.setState({formSections: newFormSections})

      return upForm[this.getIndexForm(id)].valid
    }

    /*  */
    checkFormFieldDate(id, verifications) {

      /* Vérification du champ saisi ou modifié */
      let upForm = this.state.formFields // récupère l'élément formFields du state


      const d = document.getElementById(id + "-day")
      const m = document.getElementById(id + "-month")
      const y = document.getElementById(id + "-year")

      let value = 0

      /* Vérification uniquement si les 3 champs sont saisis */
      if (d.value != -1 && m.value != -1 && y.value != -1) {
        let date = y.value + '-' + (m.value < 10 ? '0' + m.value : m.value) + '-' + (d.value < 10 ? '0' + d.value : d.value)
        if(id === "date-fin") { // on transforme value en tableau pour ce cas précis
          value = [upForm[this.getIndexForm("date-debut")].value, date]
        } else {
          value = date
        }

        /* Si le champ est valide */
        if (FormValid.verifyFormField(value, verifications)) { // fait tous les tests spécifiés pour la value de l'éléments
          d.classList.remove("is-invalid") // retire la classe is-invalid si elle était associée
          m.classList.remove("is-invalid")
          y.classList.remove("is-invalid")
          upForm[this.getIndexForm(id)].value = date
          upForm[this.getIndexForm(id)].valid = true
        }
        else {
          d.classList.add("is-invalid")
          m.classList.add("is-invalid")
          y.classList.add("is-invalid")
          upForm[this.getIndexForm(id)].valid = false
        }

        this.setState({formFields : upForm}) // met à jour le state avec le nouveau form
      }
      /* Vérification totale de la partie */
      const newFormSections = this.state.formSections
      const formFields = this.state.formFields.filter(e => e.part === this.state.activeFormSection)
      if (formFields.every(e => e.valid == true)) { // Si tout est valide
        newFormSections[this.getIndex(this.state.activeFormSection)][2] = true
      } else {
        newFormSections[this.getIndex(this.state.activeFormSection)][2] = false
      }
      this.setState({formSections: newFormSections})
    }

    /*  */
    checkFormFieldMateriel(nbr) {
      const verifications = {
        nom: ["required", "alphaNum"],
        qte: ["required", "numericNotNull"]
      }

      let nom = document.getElementById("nom-materiel-" + nbr)
      let qte = document.getElementById("qte-materiel-" + nbr)

      let upForm = this.state.formFields // récupère l'élément formFields du state

      /* Champ nom */
      if (FormValid.verifyFormField(nom.value, verifications.nom)) { // fait tous les tests spécifiés pour la value de l'élément
        nom.classList.remove("is-invalid") // retire la classe is-invalid si elle était associée
      } else {
        nom.classList.add("is-invalid")
      }

      /* Champ qte */
      if (FormValid.verifyFormField(qte.value, verifications.qte)) {
        qte.classList.remove("is-invalid") // retire la classe is-invalid si elle était associée
      } else {
        qte.classList.add("is-invalid")
      }

      const inputIndex = this.state.formFields[this.getIndexForm("materiel")].value.findIndex(e => e.id === nbr)
      if (inputIndex !== -1)
        upForm[this.getIndexForm("materiel")].value[inputIndex] = {id: nbr, nom: nom.value, qte: qte.value}
      else
        upForm[this.getIndexForm("materiel")].value[0] = {id: nbr, nom: nom.value, qte: qte.value}

      if ( !(FormValid.verifyFormField(nom.value, verifications.nom) && FormValid.verifyFormField(qte.value, verifications.qte)) ) {
        upForm[this.getIndexForm("materiel")].valid = false
      }

      this.setState({formFields : upForm}) // met à jour le state avec le nouveau form

      this.checkFormSectionMateriel(verifications)
    }

    /* Vérification totale de la partie dans le cas partie = matériel */
    checkFormSectionMateriel(verifications) {
      const newFormSections = this.state.formSections
      const materiel = this.state.formFields[this.getIndexForm('materiel')]
      // Si tous les éléments sont valides
      if (materiel.value.every(e => (FormValid.verifyFormField(e.nom, verifications.nom) && FormValid.verifyFormField(e.qte, verifications.qte)))) {
        newFormSections[this.getIndex('materiel')][2] = true
      } else {
        newFormSections[this.getIndex('materiel')][2] = false
      }
      this.setState({formSections: newFormSections})
    }

    getBureaux() {
      axios.get('/api/b')
      .then(response => {
        this.setState({bureaux: response.data})
      })
      .catch(error => {
        console.log(error)
      })
    }

    renderBureaux() {
      const b = this.state.bureaux
      if (b.length > 0) {
        return b.map(e => {
          return <option value={e.id} key={e.id}>{e.nom}</option>
        })
      }
    }

    alternativeDate(id, titre, feedback, verifications) {
      const d = document.getElementById(id + "-day")
      const m = document.getElementById(id + "-month")
      const y = document.getElementById(id + "-year")
      let daysTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]

      let maxDay = 31

      if (m) {
        if(m.value === '1' || m.value === '3' || m.value === '5' || m.value === '7' || m.value === '8' || m.value === '10' || m.value === '12') {
        maxDay = 31
        } else if(m.value === '4' || m.value === '6' || m.value === '9' || m.value === '11') {
          maxDay = 30
        } else if(m.value === '2') {
        // If month is February, calculate whether it is a leap year or not
          const year = y.value
          const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
          maxDay = leap ? 29 : 28
        }

        daysTable = daysTable.filter(e => e <= maxDay)
      }

      return (
        <div>
            <p className="fallbackLabel">{titre}</p>
              <div id={id} className="form-group fallbackDatePicker row">
                <div className="col">
                  <label className="small" htmlFor={id + "-day"}>Jour</label>
                  <select className="form-control alternativeSelect" id={id + "-day"} name={id + "-day"} onBlur={() => { this.checkFormFieldDate(id, verifications) }} onChange={() => { this.checkFormFieldDate(id, verifications) }} defaultValue="-1">
                    <option value='-1' disabled>-</option>
                    { daysTable.map(e => {
                      return <option key={e}>{e}</option>
                    }) }
                  </select>
                  <div className="invalid-feedback row">
                    {feedback}
                  </div>
                </div>
                <div className="col">
                  <label className="small" htmlFor={id + "-month"}>Mois</label>
                  <select className="form-control alternativeSelect" id={id + "-month"} name={id + "-month"} onBlur={() => { this.checkFormFieldDate(id, verifications) }} onChange={() => { this.checkFormFieldDate(id, verifications) }} defaultValue="-1">
                    <option value='-1' disabled>-</option>
                    <option value='1'>Janvier</option>
                    <option value='2'>Février</option>
                    <option value='3'>Mars</option>
                    <option value='4'>Avril</option>
                    <option value='5'>Mai</option>
                    <option value='6'>Juin</option>
                    <option value='7'>Juillet</option>
                    <option value='8'>Août</option>
                    <option value='9'>Septembre</option>
                    <option value='10'>Octobre</option>
                    <option value='11'>Novembre</option>
                    <option value='12'>Décembre</option>
                  </select>
                </div>
                <div className="col">
                  <label className="small" htmlFor={id + "-year"}>Année</label>
                  <select className="form-control alternativeSelect" id={id + "-year"} name={id + "-year"} onBlur={() => { this.checkFormFieldDate(id, verifications) }} onChange={() => { this.checkFormFieldDate(id, verifications) }} defaultValue="-1">
                    <option value='-1' disabled>-</option>
                    <option>{ new Date().getUTCFullYear() }</option>
                    <option>{ new Date().getUTCFullYear() + 1 }</option>
                  </select>
                </div>
              </div>

        </div>
      )
    }

    infoprojet() {
      const c = this.state.convention
      return (
        <div key='infoprojet' className={'infoprojet ' + (this.isVisible('infoprojet') ? 'visible' : 'invisible')}>
          <h2>Informations sur le projet</h2>
          <div className="row">
            <div className="col">
              <Input disabled id="nom-projet" nom="Nom du projet" onChange verifications={["required"]} type="text" placeholder="Nom du projet" defaultValue={c.nom_projet} callback={this.checkFormField} />
              <div className="form-group">
                <label htmlFor="bureau">Bureau de prêt</label>
                  <select disabled onBlur={() => { this.checkFormField("bureau", ["required"]) }} onChange={() => { this.checkFormField("bureau", ["required"]) }} onPaste={() => { this.checkFormField("bureau", ["required"]) }} onInput={() => { this.checkFormField("bureau", ["required"]) }} defaultValue={c.bureaupret_id} className="form-control" id="bureau">
                    <option value="-1" disabled>Veuillez choisir...</option>
                    { this.renderBureaux() }
                 </select>
              </div>
              <div className={"form-group nativeDatePicker" + (!this.dateInputDisplay() && " invisible")}>
                <label htmlFor="date-debut">Date de début de l'emprunt</label>
                <input onBlur={() => { this.checkFormField("date-debut", ["required", "date"]) }} onChange={() => { this.checkFormField("date-debut", ["required", "date"]) }} onPaste={() => { this.checkFormField("date-debut", ["required", "date"]) }} onInput={() => { this.checkFormField("date-debut", ["required", "date"]) }} type="date" className="form-control" id="date-debut" defaultValue={c.date_debut} />
                <div className="invalid-feedback">
                  Veuillez renseigner une date ultérieure à aujourd'hui.
                </div>
              </div>
              {  !this.dateInputDisplay() && this.alternativeDate("date-debut", "Date de début de l'emprunt", "Veuillez renseigner une date ultérieure à aujourd'hui.", ["required", "date"]) }
              <div className={"form-group nativeDatePicker" + (!this.dateInputDisplay() && " invisible")}>
                <label htmlFor="date-fin">Date de fin de l'emprunt</label>
                <input onBlur={() => { this.checkFormField("date-fin", ["required", "dateSup"]) }} onChange={() => { this.checkFormField("date-fin", ["required", "dateSup"]) }} onPaste={() => { this.checkFormField("date-fin", ["required", "dateSup"]) }} onInput={() => { this.checkFormField("date-fin", ["required", "dateSup"]) }} type="date" className="form-control" id="date-fin" defaultValue={c.date_fin} />
                <div className="invalid-feedback">
                  Veuillez renseigner une date ultérieure à la date de début de l'emprunt.
                </div>
              </div>
              { !this.dateInputDisplay() && this.alternativeDate("date-fin", "Date de fin de l'emprunt", "Veuillez renseigner une date ultérieure à la date de début de l'emprunt.", ["required", "dateSup"]) }
            </div>
            <div className="col">
              <Input disabled id="participants" nom="Etudiants participants" onChange verifications={["required", "alpha"]} type="text" placeholder="Noms et prénoms des étudiants" defaultValue={c.membres_equipe} callback={this.checkFormField} />
            </div>
          </div>
          <button className='btn btn-orange-outlined' onClick={() => { this.previous() }}>Précédent</button>
          <button className='btn btn-orange next' onClick={() => { this.next() }} disabled={ this.disabledNextButton() ? 'disabled' : '' } >Suivant</button>
          </div>
      )
    }

    infopersonnel() {
      const c = this.state.convention
      return (
        <div key='infopersonnel' className={'infopersonnel ' + (this.isVisible('infopersonnel') ? 'visible' : 'invisible')}>
          <h2>Informations personnelles</h2>
          <div className="row">
            <div className="col">
              <Input id="adresse" nom="Adresse" onChange verifications={["required", "alphaNum"]} type="text" placeholder="Numéro et rue" defaultValue={c.emprunteur_adr} callback={this.checkFormField} />
              <Input id="ville" nom="Ville" onChange verifications={["required", "alpha"]} type="text" placeholder="Ex: Champs-sur-Marne" defaultValue={c.emprunteur_ville} callback={this.checkFormField} />
              <Input id="postal" nom="Code postal" onChange verifications={["required", "numeric"]} type="text" placeholder="Code postal" defaultValue={c.emprunteur_postal} callback={this.checkFormField} />
              <div className="form-group">
                <label htmlFor="formation">Formation</label>
                <input disabled onBlur={() => { this.checkFormField("formation", ["required", "alpha"]) }} onChange={() => { this.checkFormField("formation", ["required", "alpha"]) }} onPaste={() => { this.checkFormField("formation", ["required", "alpha"]) }} onInput={() => { this.checkFormField("formation", ["required", "alpha"]) }} type="text" className="form-control" id="formation" placeholder="Le nom de votre formation suivie à l'UPEM" defaultValue={c.emprunteur_formation} />
              </div>
            </div>
            <div className="col">
              <Input id="carte" nom="Numéro de carte étudiante" onChange verifications={["required", "carte"]} type="text" placeholder="Numéro de carte à 6 chiffres" defaultValue={c.emprunteur_carte_num} callback={this.checkFormField} />
              <Input id="nom-assurance" nom="Nom de l'assurance" onChange verifications={["required", "alphaNum"]} type="text" placeholder="Nom de l'assurance" defaultValue={c.assurance_nom} callback={this.checkFormField} />
              <Input id="num-assurance" nom="Numéro de police de l'assurance" onChange verifications={["required", "numeric"]} type="text" placeholder="Numéro de police" defaultValue={c.assurance_num} callback={this.checkFormField} />
              <Input id="telephone" nom="Numéro de téléphone portable" onChange verifications={["required", "telephone"]} type="text" placeholder="Ex: 06********" defaultValue={c.emprunteur_tel} callback={this.checkFormField} />
            </div>
          </div>
          <button className='btn btn-orange-outlined' onClick={() => { this.previous() }}>Précédent</button>
          <button className='btn btn-orange next' onClick={() => { this.next() }} disabled={ this.disabledNextButton() ? 'disabled' : '' } >Suivant</button>
        </div>
      )
    }

    materiel() {
      return (
        <div key='materiel' className={'materiel ' + (this.isVisible('materiel') ? 'visible' : 'invisible')}>
          <h2>Matériel</h2>
          <div className="row">
            <div className="col">
              { this.renderMaterielInputs() }
              <button id="add-materiel" className={"btn btn-add"} disabled={ this.disabledAddButton() ? 'disabled' : '' }
                onClick={() => { this.addMateriel() }}>
                <i className="fas fa-plus"></i>
                Ajouter un nouveau matériel
              </button>
            </div>
          </div>
          <button className='btn btn-orange-outlined' onClick={() => { this.previous() }}>Précédent</button>
          <button className='btn btn-orange next' onClick={() => { this.next() }} disabled={ this.disabledNextButton() ? 'disabled' : '' } >Suivant</button>
        </div>
      )
    }

    materielInput(input) {
        return (
          <div className="form-group" key={input.id}>
            <div className="form-row d-flex align-items-center" id={"materiel-grp-" + input.id}>
              <div className="col">
                <label htmlFor="nom-materiel">Nom du matériel</label>
                <input type="text" className="form-control nom-materiel" id={"nom-materiel-" + input.id} placeholder="Canon 5D"
                    key={"nom-materiel-" + input.id}
                    value={input.nom}
                    onChange={() => { this.checkFormFieldMateriel(input.id) }}
                    onPaste={() => { this.checkFormFieldMateriel(input.id) }}
                    onInput={() => { this.checkFormFieldMateriel(input.id) }}
                    onLoad={() => { this.checkFormFieldMateriel(input.id) }}
                    />
              </div>
              <div className="col-1">
                <label htmlFor="qte-materiel">Quantité</label>
                <input type="number" className="form-control qte-materiel" id={"qte-materiel-" + input.id} placeholder="1"
                    key={"qte-materiel-" + input.id}
                    value={input.qte}
                    onChange={() => { this.checkFormFieldMateriel(input.id) }}
                    onPaste={() => { this.checkFormFieldMateriel(input.id) }}
                    onInput={() => { this.checkFormFieldMateriel(input.id) }}
                    onLoad={() => { this.checkFormFieldMateriel(input.id) }}
                    />
              </div>
              <div className="col-3 delete-materiel-input">
                <i className="fas fa-times"
                  onMouseOver={() => {this.showIcon("mat-"+ input.id)}}
                  onMouseOut={() => {this.hideIcon("mat-"+ input.id)}}
                  onClick={() => {this.removeMateriel(input.id)}}
                  >
                </i>
                <span id={"mat-" + input.id}>supprimer</span>
              </div>
            </div>
          </div>
        )
    }

    renderMaterielInputs() {
      const list = this.state.formFields[this.getIndexForm("materiel")].value
      if (list.length > 0) {
        return list.map((e) => {
            return(
              this.materielInput(e)
            )
          })
      }
      else {
        const emptyField = {id: 1, nom: '', qte: 1}
        let upForm = this.state.formFields
        upForm[this.getIndexForm("materiel")].value[0] = emptyField
        this.setState({formFields: upForm})
      }

    }

    disabledAddButton() {
      return !(this.state.formSections[this.getIndex('materiel')][2])
    }

    addMateriel() {
      let lastId = this.state.materielLastId
      ++lastId
      let newMaterielInput = {id: lastId, nom: '', qte: 1}
      let upForm = this.state.formFields

      this.state.formSections[this.getIndex('materiel')][2] = false
      document.location.href = "#add-materiel"
      upForm[this.getIndexForm("materiel")].value.push(newMaterielInput)

      this.setState({formFields: upForm})
      this.setState({materielLastId: lastId})
    }

    removeMateriel(idNbr) {
      /* On enlève le matériel du state */
      let upForm = this.state.formFields
      if (upForm[this.getIndexForm('materiel')].value.length > 1) {
        upForm[this.getIndexForm('materiel')].value = upForm[this.getIndexForm('materiel')].value.filter(e => e.id !== idNbr)
        this.setState({formFields: upForm})
      }
      this.checkFormSectionMateriel({nom: ["required", "alphaNum"], qte: ["required", "numericNotNull"]})
    }

    documents() {
      const c = this.state.convention
      return (
        <div key='document' className={'documents ' + (this.isVisible('documents') ? 'visible' : 'invisible')}>
          <h2>Documents</h2>
          <div className="row">
            <div className="col">
              <div className="form-group">
                  <div className="col-6">
                    <div className="form-group">
                      <label htmlFor="carte-etud">Carte étudiante</label>
                      <p><a href={"/document/carte/" + c.num_eng} target="_blank">{c.carte_etud_url}</a></p>
                      <input id="carte-etud" onBlur={() => { this.checkFormField("carte-etud", ["required", "file"]) }} onChange={() => { this.checkFormField("carte-etud", ["required", "file"]) }} onPaste={() => { this.checkFormField("carte-etud", ["required", "file"]) }} onInput={() => { this.checkFormField("carte-etud", ["required", "file"]) }} accept=".pdf, .jpg, .jpeg, .png, .tiff" type="file" className="form-control-file" id="carte-etud" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="assurance">Attestation d'assurance</label>
                      <p><a href={"/document/assurance/" + c.num_eng} target="_blank">{c.assurance_url}</a></p>
                      <input id="assurance" onBlur={() => { this.checkFormField("assurance", ["required", "file"]) }} onChange={() => { this.checkFormField("assurance", ["required", "file"]) }} onPaste={() => { this.checkFormField("assurance", ["required", "file"]) }} onInput={() => { this.checkFormField("assurance", ["required", "file"]) }} accept=".pdf, .jpg, .jpeg, .png, .tiff" type="file" className="form-control-file" id="assurance" />
                    </div>
                </div>
              </div>
            </div>
          </div>
          <button className='btn btn-orange-outlined' onClick={() => { this.previous() }}>Précédent</button>
          <button className='btn btn-orange next' onClick={() => { this.next() }}>Suivant</button>

        </div>
      )
    }

    cancelAlert() {
      this.setState({modal: false})
    }

    cancelAlertClickingAway(e) {
      const popup = Array.from(document.getElementsByClassName('popup'))[0]
      const popupChildren = Array.from(document.getElementsByClassName('popup-child'))
      if (e.target != popup && !popupChildren.includes(e.target))
        this.cancelAlert()
    }

    confirmAlert() {
      this.setState({modal: false})
      this.next()
    }

    /* Récupère la valeur d'un champ input dont on fournit l'id */
    getInputValue(id) {
      const element = document.getElementById(id)
      if (element != null) {
        return element.value
      }
      return false
    }

    /* Transforme un format de date aaaa-mm-jj en jj/mm/aaaa */
    dateFormate(d) {
      const date = new Date(d)
      const j = date.getDate()
      const m = (date.getUTCMonth() + 1)
      const a = date.getUTCFullYear()
      return ("0" + j).slice(-2) + '/' + ("0" + m).slice(-2) + '/' + a
    }

    renderMaterielList() {
      if (this.state.formFields[this.getIndexForm('materiel')].value.length > 0 && this.state.formFields[this.getIndexForm('materiel')].value[0].nom) {
        return this.state.formFields[this.getIndexForm('materiel')].value.map( (e, index) => {
          return <li key={index}> {e.nom + ' (' + e.qte + ')'} </li>
        })
      }
      else {
        return <span className="missing-field">Vous n'avez renseigné aucun matériel.</span>
      }
    }

    validation() {
      const warning = <span className='missing-field'>Ce champ est obligatoire et doit être renseigné.</span>
      return (
        <div key="validation" className={'validation ' + (this.isVisible('validation') ? 'visible' : 'invisible')}>
          <h2>Validation</h2>

            <div className="row align-items-center">
              <div className="col validation-section" onMouseLeave={() => { this.hideIcon('edit1')}} onMouseOver={() => { this.showIcon('edit1')}} onClick={() => { this.updateActiveFormSection('infoprojet') }}>
                <h3>Informations sur le projet</h3>
                <p><b>Nom du projet : </b> { this.getInputValue('nom-projet') ? this.getInputValue('nom-projet') : warning } </p>
                <p><b>Bureau de prêt : </b> { this.getInputValue('bureau') ? this.getBureauName(this.getInputValue('bureau')) : warning } </p>
                <p><b>Date de début de l'emprunt : </b> { this.getInputValue('date-debut') ? this.dateFormate(this.getInputValue('date-debut')) : warning } </p>
                <p><b>Date de fin de l'emprunt : </b> { this.getInputValue('date-fin') ? this.dateFormate(this.getInputValue('date-fin')) : warning } </p>
                <p><b>Etudiants participants au projet : </b> { this.getInputValue('participants') ? this.getInputValue('participants') : warning } </p>
              </div>
              <i id="edit1" className="col fas fa-edit"></i>
            </div>

            <div className="row align-items-center">
              <div className="col validation-section" onMouseLeave={() => { this.hideIcon('edit2')}} onMouseOver={() => { this.showIcon('edit2')}} onClick={() => { this.updateActiveFormSection('infopersonnel') }}>
                <h3>Informations personnelles</h3>
                <p><b>Adresse : </b></p>
                <p>{ (this.getInputValue('adresse') && this.getInputValue('ville') && this.getInputValue('postal') ) ? this.getInputValue('adresse') : warning } </p>
                <p>{ this.getInputValue('ville') + this.getInputValue('postal')} </p>
                <p><b>Formation : </b> { this.getInputValue('formation') ? this.getInputValue('formation') : warning } </p>
                <p><b>Numéro de carte étudiante :</b> { this.getInputValue('carte') ? this.getInputValue('carte') : warning } </p>
                <p><b>Nom de l'assurance : </b> { this.getInputValue('nom-assurance') ? this.getInputValue('nom-assurance') : warning } </p>
                <p><b>Numéro de police de l'assurance : </b> { this.getInputValue('num-assurance') ? this.getInputValue('num-assurance') : warning } </p>
                <p><b>Numéro de téléphone portable : </b> { this.getInputValue('telephone') ? this.getInputValue('telephone') : warning } </p>
              </div>
              <i id="edit2" className="col fas fa-edit"></i>
            </div>

            <div className="row align-items-center non-modifiable">
              <div className="col validation-section">
                <h3>Enseignant référent</h3>
                <p><b>Nom : </b> { this.state.convention.enseignant_nom ? this.state.convention.enseignant_nom : "Pas d'enseignant spécifié" } </p>
                <p><b>Mail : </b> { this.state.convention.enseignant_mail ? this.state.convention.enseignant_mail : "Pas d'enseignant spécifié"} </p>
              </div>
              <i id="edit3" className="col fas fa-edit"></i>
            </div>

            <div className="row align-items-center">
              <div className="col validation-section" onMouseLeave={() => { this.hideIcon('edit4')}} onMouseOver={() => { this.showIcon('edit4')}} onClick={() => { this.updateActiveFormSection('materiel') }}>
                <h3>Matériel</h3>
                <ul>{ this.renderMaterielList() }</ul>
              </div>
              <i id="edit4" className="col fas fa-edit"></i>
            </div>

            <div className="row align-items-center">
              <div className="col validation-section" onMouseLeave={() => { this.hideIcon('edit5')}} onMouseOver={() => { this.showIcon('edit5')}} onClick={() => { this.updateActiveFormSection('documents') }}>
                <h3>Documents</h3>
                { this.renderDocuments() }
              </div>
              <i id="edit5" className="col fas fa-edit"></i>
            </div>

            <div className={"alert alert-danger " + (!this.validate() ? 'visible' : 'invisible')} role="alert">
              Les champs n'ont pas tous été renseignés ou renseignés correctement. Veillez à bien remplir tous les champs obligatoires pour pouvoir valider.
            </div>
          <button className='btn btn-orange-outlined' onClick={() => { this.previous() }}>Précédent</button>
          <button className='btn btn-orange' onClick={() => { this.send() }} disabled={ !this.validate() ? 'disabled' : '' }>Valider les modifications</button>

        </div>
      )
    }

    showIcon(id) {
      document.getElementById(id).style.opacity = 0.8;
    }

    hideIcon(id) {
      document.getElementById(id).style.opacity = 0;
    }

    getFileName(fullPath) {
      var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      var filename = fullPath.substring(startIndex);
      if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
          filename = filename.substring(1);
      }
      return filename
    }

    renderDocuments() {
      let assurance = this.getInputValue('assurance')
      let carte = this.getInputValue('carte-etud')
      if (!assurance) {
        assurance = this.state.convention.assurance_url
      }
      if (!carte) {
        carte = this.state.convention.carte_etud_url
      }
      let renderList = []
      if (!carte && !assurance) {
        return <p>L'attestation d'assurance et la copie de la carte étudiante seront remises au bureau de prêt.</p>
      }
      if (carte) {
        const name = this.getFileName(carte)
        renderList.push(
          <p key='carte-1'><b>Carte étudiante : </b> { name } </p>
        )
      } else {
        renderList.push(
          <p key='carte-2'>La copie de la carte étudiante sera remise au bureau de prêt.</p>
        )
      }
      if (assurance) {
        const name = this.getFileName(assurance)
        renderList.push(
          <p key='assurance-1'><b>Attestation d'assurance : </b> { name } </p>
        )
      } else {
        renderList.push(
          <p key='assurance-2'>L'attestation d'assurance sera remise au bureau de prêt.</p>
        )
      }
      return renderList
    }

    /* Retourne le nom du bureau dont on fournit l'id */
    getBureauName(id) {
      if (id > 0) {
        const index = this.state.bureaux.findIndex(e => e.id == id)
        return this.state.bureaux[index].nom
      }
    }

    validate() {
      return (this.state.formSections.filter(e => e[0] != "documents").every(e => e[2]))
    }

    send() {
      const conventionId = this.state.convention.id
      const convention = this.state.convention
      const fields = this.state.formFields
      const materiel = fields[this.getIndexForm('materiel')].value

      let data = new FormData()
      data.append('date_debut', fields.find(e => e.id === "date-debut").value)
      data.append('date_fin', fields.find(e => e.id === "date-fin").value)
      data.append('emprunteur_adr', fields.find(e => e.id === "adresse").value)
      data.append('emprunteur_ville', fields.find(e => e.id === "ville").value)
      data.append('emprunteur_postal', fields.find(e => e.id === "postal").value)
      data.append('emprunteur_tel', fields.find(e => e.id === "telephone").value)
      data.append('emprunteur_carte_num', fields.find(e => e.id === "carte").value)
      data.append('assurance_nom', fields.find(e => e.id === "nom-assurance").value)
      data.append('assurance_num', fields.find(e => e.id === "num-assurance").value)

      if (fields.find(e => e.id === "assurance").file) {
        data.append('assurance', fields.find(e => e.id === "assurance").file)
      }
      if (fields.find(e => e.id === "carte-etud").file) {
        data.append('carte_etud', fields.find(e => e.id === "carte-etud").file)
      }

      if (this.validate()) {
        axios.post('/api/c/update/' + this.state.user.id + '/' + conventionId, // Mets à jour la convention
          data
        )
        .then(response => {
          console.log(response)
          axios.delete('/api/m/deleteall/' + conventionId) // Supprime tous les matériels qui existaient avant
          .catch(error => {
            console.log(error)
          })
        })
        .then(response => {
          materiel.map(e => {
                axios.post('/api/m/new', { // Envoie les nouveaux matériels
                  convention_id: conventionId,
                  nom: e.nom,
                  quantite: e.qte
                })
                .then(response => {
                  console.log(response)
                  document.location = ("/personnel/conventions/"+ convention.num_eng +"/confirmation-modification")
                })
                .catch(function (error) {
                  console.log(error);
                })
          })

        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }

    render() {
        const s = this.state
        return (
          <div className="container-full">
            <MenuPrincipal see='Les conventions' active='see' links={{see:'/personnel/conventions'}} />
            <div className="container end">
              <div className="row justify-content-center new-form">
                  <div className="col col-md-2">
                    <SideMenuForm fullAccess formSections={s.formSections} activeFormSection={s.activeFormSection} updateView={this.updateActiveFormSection} />
                  </div>
                  <div className="col col-md-8 offset-md-1 nouvelle-demande">
                    { this.renderPart() }
                  </div>
              </div>
            </div>
          </div>
        );
    }
}

if (document.getElementById('personnel-modifier')) {
    ReactDOM.render(<PersonnelModifier />, document.getElementById('personnel-modifier'));
}
