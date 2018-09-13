import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class EtudiantLandingpage extends Component {
    render() {
        return (
          <div className="container-full bg-etud">
            <MenuPrincipal new='Nouvelle demande de prêt' see='Mes demandes de prêt' light
              links={{new:'/etudiant/nouvelle-demande', see:'/etudiant/mes-demandes'}} />
            <div className="container">
              <div className="intro row justify-content-center">
                <div className="col col-md-8">
                  <h1>Réservez le matériel audiovisuel pour vos projets étudiants</h1>
                </div>
                <div className="w-100"></div>
                <div className="col col-md-3">
                  <a href="/etudiant/nouvelle-demande">
                    <button type="button" className="btn-intro">Faire une demande de prêt</button>
                  </a>
                </div>
              </div>
            </div>
            <div className="credits">
            Photo by <a target="_blank" href="https://unsplash.com/@pl_gt?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge">Paul Gaudriault</a> on Unsplash
            </div>
          </div>
        )
    }
}

if (document.getElementById('etudiant-landingpage')) {
    ReactDOM.render(<EtudiantLandingpage />, document.getElementById('etudiant-landingpage'));
}
