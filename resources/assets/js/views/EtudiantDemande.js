import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'
import Demande from '../components/Demande'
import DemandesTable from '../components/DemandesTable'
import TopButton from '../components/TopButton'
import ConventionPDF from '../components/ConventionPDF'

HTMLElement.prototype.click = function() {
   var evt = this.ownerDocument.createEvent('MouseEvents');
   evt.initMouseEvent('click', true, true, this.ownerDocument.defaultView, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
   this.dispatchEvent(evt);
}

export default class EtudiantDemande extends Component {
    constructor(props) {
      super(props)
      this.state = {
        user: currentUser,
        convention: '',
        modal: false
      }
      this.showDeleteModal = this.showDeleteModal.bind(this)
      this.telecharger = this.telecharger.bind(this)
      this.getConvention()
    }

    getConvention() {
      let url = window.location.href
      let numEng = url.split('/').pop()
      axios.get('/api/c/bynumeng/' + numEng)
      .then(response => {
        this.setState({convention: response.data})
      })
      .catch(error => {
        console.log(error)
        document.location = '/etudiant/mes-demandes/'
      })
    }

    showDeleteModal(id) {
      this.setState({modal: true})
      this.setState({removeConventionId: id})
    }

    isVisibleModal() {
      return this.state.modal
    }

    cancelAlert() {
      this.setState({modal: false})
      this.setState({removeConventionId: ''})
    }

    cancelAlertClickingAway(e) {
      const popup = document.getElementById('popup')
      const elements = document.getElementsByClassName('popup-child')
      const popupChildren = Array.prototype.slice.call(elements)
      if (e.target != popup && !popupChildren.includes(e.target))
        this.cancelAlert()
    }

    confirmAlert() {
      this.deleteConvention()
      this.setState({modal: false})
    }

    deleteConvention() {
      const url = window.location.href + '/suppression'
      axios.put('/api/c/cancel/' + this.state.convention.id)
      .then(response => {
        window.location.href = url
      })
      .catch(error => {
        console.log(error)
      })
    }

    conventionPDF() {
      return <ConventionPDF user={this.state.user} convention={this.state.convention} />
    }

    telecharger() {
      const icon = document.getElementById('telecharger')
      const numEng = this.state.convention.num_eng
      const src = this.conventionPDF()

      // Affiche l'icone
      icon.style.visibility = 'visible'

      // Crée la convention dans une div
      let div = document.createElement('div')
      ReactDOM.render(src, div)
      const conventionHTML = div.innerHTML

      axios.post('/api/pdf', { // Envoie l'html
        html: conventionHTML
      })
      .then(response => {
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
          alert("Vous ne pouvez pas télécharger cette convention avec ce navigateur. Essayez avec Chrome ou Mozilla Firefox.")
        }
        else {
          /* Marche pour faire un download sur Chrome */
          let a = document.createElement("a")
          a.href = response.data
          a.download = "Convention " + numEng + " " + new Date().toDateString() + ".pdf"
          a.click()
        }


        /* Affiche mais on peut pas dl*/
        // let pdfWindow = window.open("")
        // pdfWindow.document.write("<title>"+ "Convention " + numEng + " " + new Date().toDateString() +"</title><style>body { margin: 0; }</style><iframe data='Convention' style='position:fixed;' width='100%' height='100%' src="+ response.data +"></iframe>")

        // Enlève l'icone
        icon.style.visibility = 'hidden'
      })
      .catch(error => {
        console.log(error)
        // Enlève l'icone
        icon.style.visibility = 'hidden'
      })
    }

    render() {
        return (
          <div className="container-full end">
            <MenuPrincipal new='Nouvelle demande de prêt' see='Mes demandes de prêt' active='see'
              links={{new:'/etudiant/nouvelle-demande', see:'/etudiant/mes-demandes'}} />
            <Demande emprunteur={this.state.user} user={this.state.user} convention={ this.state.convention } showDeleteModal={this.showDeleteModal} goBack={this.unsetSelectConventionId} telecharger={this.telecharger} />

              <div onClick={(e) => { this.cancelAlertClickingAway(e) }} id="delete-modal" className={'d-flex justify-content-center align-items-center modal ' + (this.isVisibleModal() ? 'visible' : 'invisible')}>
                <div className="popup">
                  <p><strong>Vous êtes sur le point de supprimer une demande de prêt.</strong></p>
                  <p>Une fois la demande de prêt supprimée, vous ne pourrez plus la faire valider ni récupérer le matériel demandé. <br/> Si vous voulez emprunter à nouveau du matériel, vous devrez remplir un nouveau formulaire de demande de prêt.</p>
                  <div className="d-flex justify-content-around popup-child">
                    <p className="cancel popup-child" onClick={() => { this.cancelAlert() }}>Annuler</p>
                    <p className="confirm orange popup-child" onClick={() => { this.confirmAlert() }}>Confirmer la suppression</p>
                  </div>
                </div>
              </div>

              <TopButton />

            <div className="end-div"></div>
          </div>
        )
    }
}

if (document.getElementById('etudiant-demande')) {
    ReactDOM.render(<EtudiantDemande />, document.getElementById('etudiant-demande'));
}
