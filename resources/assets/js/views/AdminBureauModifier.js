import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MenuPrincipal from '../components/MenuPrincipal'
import Input from '../components/Input'
const FormValid = require('../lib/FormValidation.js')

export default class AdminBureauModifier extends Component {
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
        agents: [],
        formFields: [
            {
              id: 'nom',
              value: '',
              valid: false
            },
            {
              id: 'agents',
              value: [],
              valid: false
            },
        ],
        bureauId: '',
        agentLastId: 1,
        validForm: false
      }
      this.getBureau()
      this.getAgents()
      this.checkFormField = this.checkFormField.bind(this)
    }

    componentDidUpdate() {
      this.checkForm()
    }

    /* INITIALISATION */

    /* MAJ le state avec le bureau que l'on veut modifier puis vérifie le formulaire */
    getBureau() {
      let urlString = window.location.href
      let url = urlString.split('/')
      url.pop()
      let id = url.pop()
      axios.get('/api/b/' + id)
      .then(response => {
        const b = response.data
        const form = [
            {
              id: 'nom',
              value: b.nom,
              valid: true
            },
            {
              id: 'agents',
              value: b.agents,
              valid: true
            }
        ]
        this.setState({formFields: form})
        this.setState({bureauId: b.id})
    })
    this.checkForm()
  }

    /* MAJ le state avec tous les utilisateurs de type "agent" existants */
    getAgents() {
      axios.get('/api/u')
      .then(response => {
        const users = response.data
        const agents = users.filter(e => e.type.some(t => t.usertype_id == 1))
        this.setState({agents: agents})
      })
      .catch(error => {
        console.log(error)
      })
    }

    /* GETTERS */

    /* AJOUTER ET RETIRER DES INPUTS AGENTS */

    /* Retourne true si l'on peut ajouter un nouvel utilisateur (= formulaire valide) */
    canAddNewAgent() {
      return this.state.validForm
    }

    /* Ajoute un input agent */
    addAgent() {
      let lastId = this.state.agentLastId
      ++lastId
      let newAgentInput = {id: lastId, agent_id: -1}
      let upForm = this.state.formFields

      upForm[this.getIndexForm('agents')].valid = false
      upForm[this.getIndexForm('agents')].value.push(newAgentInput)

      this.setState({formFields: upForm})
      this.setState({agentLastId: lastId})
      this.setState({validForm: false})
    }


    /* Retire un input agent dont on fournit l'id s'il en rest plus d'un */
    removeAgent(idNbr) {
      /* On enlève l'agent du state */
      let upForm = this.state.formFields
      if (upForm[this.getIndexForm("agents")].value.length > 1) {
        upForm[this.getIndexForm('agents')].value = upForm[this.getIndexForm('agents')].value.filter(e => e.id !== idNbr)
        this.setState({formFields: upForm})
      }
      this.checkForm()
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

    checkFormFieldAgent(nbr) {
      let agent = document.getElementById("agent-" + nbr)
      let upForm = this.state.formFields // récupère l'élément formFields du state
      let validInput = false

      const inputIndex = this.state.formFields[this.getIndexForm("agents")].value.findIndex(e => e.id === nbr)
      /* S'il existe déjà un élément dans formFields avec le même id */
      if (inputIndex !== -1) {
        upForm[this.getIndexForm("agents")].value[inputIndex] = {id: nbr, agent_id: agent.value}
      }
      /* Si l'élément n'existe pas */
      else {
        upForm[this.getIndexForm("agents")].value[0] = {id: nbr, agent_id: agent.value}
      }

      const agentsField = upForm[this.getIndexForm("agents")]
      if (agentsField.value.every(e => (FormValid.verifyFormField(agent.value, ['required', 'alphaNum'])))) {
        upForm[this.getIndexForm("agents")].valid = true
      } else {
        upForm[this.getIndexForm("agents")].valid = false
      }

      if ( !agent || !agent.value ) {
        upForm[this.getIndexForm("agents")].valid = false
      }

      this.setState({formFields : upForm}) // met à jour le state avec le nouveau form
      this.checkForm()
    }

    /* Vérifie que tous inputs du form sont remplis */
    checkForm() {
      const formFields = this.state.formFields
      let valid = false
      if (formFields.every(e => e.valid)) { // Si tout est valide
        valid = true
      }
      if (valid != this.state.validForm) {
        this.setState({validForm: valid})
      }
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

    renderAgents() {
      let a = this.state.agents
      const list = this.state.formFields[this.getIndexForm('agents')].value
      if (a.length > 0) {
        return a.map(e => {
          return <option key={e.id} value={e.id} disabled={list.some(l => e.id == l.user_id) ? 'disabled' : ''}>{e.mail}</option>
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

    isFilled(agents) {
      if (agents.some(e => e.agent_id == -1)) {
        return false
      }
      if (agents.length > 0) {
        return true
      }
      return false
    }

    /* SEND */

    /* retourne la requête pour envoyer une relation entre un agent et un bureau de prêt */
    postAgent(bureauId, agentId) {
      return axios.post('/api/ub/new', {user_id: agentId, bureaupret_id: bureauId})
    }

    /* retourne un tableau de reqêtes postBureau en fonction du tableau agents */
    getAgentsRequest(bureauId, agents) {
      let requests = []
      agents.map(e => {
        requests.push(this.postAgent(bureauId, e.user_id))
      })
      return requests
    }

    send() {
      const fields = this.state.formFields
      const agents = fields.find(e => e.id === "agents").value

      if (this.validate()) {
        axios.post('/api/b/update/' + this.state.bureauId, // CREATION DU BUREAU
          {
            nom: fields.find(e => e.id == "nom").value
          }
        )
        .then(response => {
          console.log(response)
          const bureauId = response.data.id
          axios.delete('/api/ub/delete/b/' + bureauId) // Supprime toutes les relations avec un agent
          .then(response => {
            console.log(response)
            if (this.isFilled(agents)) {
              axios.all(this.getAgentsRequest(bureauId, agents))
              .then(axios.spread((acct, perms) => {
                document.location = '/administration/nouvel-utilisateur/confirmation'
              }))
            } else {
              document.location = '/administration/modification-bureau/confirmation'
            }
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

    showIcon(id) {
      document.getElementById(id).style.opacity = 0.8;
    }

    hideIcon(id) {
      document.getElementById(id).style.opacity = 0;
    }

    renderAgentInput(input) {
      return (
        <div key={'input' + input.id} className="form-group">
          <div className="form-row d-flex align-items-center">
            <div className="col">
              <label htmlFor="type">Agent associé</label>
                <select key={"agent-" + input.id} id={"agent-" + input.id}
                  onChange={() => { this.checkFormFieldAgent(input.id) }}
                  onPaste={() => { this.checkFormFieldAgent(input.id) }}
                  onInput={() => { this.checkFormFieldAgent(input.id) }}
                  onLoad={() => { this.checkFormFieldAgent(input.id) }}
                  defaultValue={input.agent_id} value={input.user_id} className="form-control">
                  <option value="-1" disabled>Veuillez choisir...</option>
                  { this.renderAgents() }
               </select>
             </div>
               <div className="col-3 delete-agent-input">
                 <i className="fas fa-times"
                   onMouseOver={() => {this.showIcon("agent-del-"+ input.id)}}
                   onMouseOut={() => {this.hideIcon("agent-del-"+ input.id)}}
                   onClick={() => {this.removeAgent(input.id)}}
                   >
                 </i>
                 <span id={"agent-del-" + input.id}>supprimer</span>
               </div>
             </div>
        </div>
      )

    }

    renderAgentInputs() {
      const list = this.state.formFields[this.getIndexForm("agents")].value
      if (list.length > 0) {
        return list.map((e) => {
            return(
              this.renderAgentInput(e)
            )
          })
      }
      else {
        const emptyField = {id: 1, agent_id: -1}
        let upForm = this.state.formFields
        upForm[this.getIndexForm("agents")].value[0] = emptyField
        this.setState({formFields: upForm})
      }
    }

    renderAddNewAgentButton() {
      return (
        <button id="add-user" className={"btn btn-add"}
          onClick={() => { this.addAgent() }} disabled={this.canAddNewAgent() ? '' : 'disabled'}>
          <i className="fas fa-plus"></i>
          Ajouter un nouvel agent
        </button>
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
                    <div key='new-user' className='new-user'>
                      <h2>Modification du bureau</h2>
                      <div className="row">
                        <div className="col">
                          <div id="user-alert" className="alert alert-danger invisible" role="alert">
                            Il existe déjà un bureau du même nom.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input id="nom" nom="Nom du bureau de prêt" verifications={["required", "alphaNum"]} type="text" placeholder="Ex: IUT" defaultValue={s.formFields.find(e => e.id == 'nom').value} callback={this.checkFormField} />
                        </div>
                        <div className="col"></div>
                      </div>
                      { this.renderAgentInputs() }
                      <div className="row">
                        <div className="col">
                          { this.renderAddNewAgentButton() }
                        </div>
                      </div>
                      <button className='btn btn-orange-outlined' onClick={() => { document.location = '/administration/bureau/' + s.bureauId }}>Annuler</button>
                      <button className='btn btn-orange next' onClick={() => { this.send() }} disabled={ this.disabledValidateButton() ? 'disabled' : '' } >Valider</button>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        );
    }
}


if (document.getElementById('administration-bureau-modifier')) {
    ReactDOM.render(<AdminBureauModifier />, document.getElementById('administration-bureau-modifier'));
}
