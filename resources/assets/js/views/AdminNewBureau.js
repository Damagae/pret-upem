import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import MenuPrincipal from '../components/MenuPrincipal'
import Input from '../components/Input'
const FormValid = require('../lib/FormValidation.js')

export default class AdminNewBureau extends Component {
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
        agentLastId: 1,
        validForm: false
      }
      this.getBureaux()
      this.getAgents()
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
          return <option key={e.id} value={e.id} disabled={list.some(l => e.id == l.agent_id) ? 'disabled' : ''}>{e.mail}</option>
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

    /* retourne la requête pour envoyer une relation entre un agent et un bureau de prêt */
    postAgent(bureauId, agentId) {
      return axios.post('/api/ub/new', {user_id: agentId, bureaupret_id: bureauId})
    }

    /* retourne un tableau de reqêtes postBureau en fonction du tableau agents */
    getAgentsRequest(bureauId, agents) {
      let requests = []
      agents.map(e => {
        requests.push(this.postAgent(bureauId, e.agent_id))
      })
      return requests
    }

    send() {
      const fields = this.state.formFields
      const agents = fields.find(e => e.id === "agents").value

      if (this.validate()) {
        axios.post('/api/b/new', // CREATION DU BUREAU
          {
            nom: fields.find(e => e.id === "nom").value
          }
        )
        .then(response => {
          console.log(response)
          const bureauId = response.data.id

          axios.all(this.getAgentsRequest(bureauId, agents))
          .then(axios.spread((acct, perms) => {
            document.location = '/administration/nouveau-bureau/confirmation'
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

    canAddNewAgent() {
      return this.state.validForm
    }

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

    removeAgent(idNbr) {
      /* On enlève l'agent du state */
      let upForm = this.state.formFields
      if (upForm[this.getIndexForm("agents")].value.length > 1) {
        upForm[this.getIndexForm('agents')].value = upForm[this.getIndexForm('agents')].value.filter(e => e.id !== idNbr)
        this.setState({formFields: upForm})
      }
      this.checkForm()
    }

    showIcon(id) {
      document.getElementById(id).style.opacity = 0.8;
    }

    hideIcon(id) {
      document.getElementById(id).style.opacity = 0;
    }

    renderAgentInput(input) {
      return (
        <div key={input.id} className="form-group">
          <div className="form-row d-flex align-items-center">
            <div className="col">
              <label htmlFor="type">Agent associé</label>
                <select key={"agent-" + input.id} id={"agent-" + input.id}
                  onChange={() => { this.checkFormFieldAgent(input.id) }}
                  onPaste={() => { this.checkFormFieldAgent(input.id) }}
                  onInput={() => { this.checkFormFieldAgent(input.id) }}
                  onLoad={() => { this.checkFormFieldAgent(input.id) }}
                  defaultValue={input.agent_id} className="form-control">
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
                      <h2>Nouveau bureau</h2>
                      <div className="row">
                        <div className="col">
                          <div id="user-alert" className="alert alert-danger invisible" role="alert">
                            Il existe déjà un bureau du même nom.
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">
                          <Input id="nom" nom="Nom du bureau de prêt" verifications={["required", "alphaNum"]} type="text" placeholder="Ex: IUT" callback={this.checkFormField} />
                        </div>
                        <div className="col"></div>
                      </div>
                      { this.renderAgentInputs() }
                      <div className="row">
                        <div className="col">
                          { this.renderAddNewAgentButton() }
                        </div>
                      </div>
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


if (document.getElementById('admin-new-bureau')) {
    ReactDOM.render(<AdminNewBureau />, document.getElementById('admin-new-bureau'));
}
