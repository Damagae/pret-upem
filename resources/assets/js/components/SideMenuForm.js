import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class SideMenuForm extends Component {
    constructor(props) {
      super(props)
      this.state = {
        formSections: this.props.formSections,
        activeFormSection: this.props.activeFormSection,
        selectable: this.props.formSections.map(e => e = [e[0], false]),
        updateView: this.props.updateView
      }
      if (props.fullAccess) {
        this.state.selectable = this.props.formSections.map(e => e = [e[0], true])
      }
    }

    /* Quand activeFormSection change
     * activé par un bouton sur EtudiantNew
     */
    componentWillReceiveProps(props) {
      this.update(props.activeFormSection)
    }

    /* change l'item actif
     * prend la clé en parametre
     * met à jour les items sélectionnables
     */
    update(key) {
      this.state.selectable[this.getIndex(this.state.activeFormSection)][1] = true
      this.setState({activeFormSection: key})
    }

    /* Au clic sur un item
     * vérifie si l'item est cliquable
     * met à jour l'item actif
     * trigger la maj de Etudiant New
     */
    handleItemClick(key) {
      if (this.isSelectable(key)) {
        this.update(key)
        this.state.updateView(key)
      }
    }

    /* permet d'obtenir l'index d'un item grâce à sa clé */
    getIndex(key) {
      return this.state.formSections.findIndex(e => e[0] === key)
    }

    /* permet d'obtenir la clé d'un item grâce à son index */
    getKey(index) {
      return this.state.formSections[index][0]
    }

    /* vérifie que l'item est sélectionnable */
    isSelectable(key) {
      return this.state.selectable[this.getIndex(key)][1]
    }

    /* render un item du menu
     * key est le nom utilisé comme clé
     * nom est le nom de l'item affiché
     */
    renderItem(key, nom) {
      const activeFormSection = this.state.activeFormSection
      return (
        <li key={key} className={"side-menu-item" + ((activeFormSection === key) ? " active" : "") + (this.isSelectable(key) ? ' selectable' : '')} onClick={() => { this.handleItemClick(key) }}>
          {nom}
        </li>
      )
    }

    render() {
      return (
      <ul className="side-menu flex-column">
        { this.state.formSections.map( (item) => this.renderItem(item[0], item[1])) }
      </ul>
    )

    }
}

  export default SideMenuForm;
