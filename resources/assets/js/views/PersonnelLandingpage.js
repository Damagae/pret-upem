import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MenuPrincipal from '../components/MenuPrincipal'

export default class PersonnelLandingpage extends Component {
    render() {
        return (
          <div className="container-full bg-perso">
            <MenuPrincipal see='Les conventions' light links={{see:'/personnel/redirection'}} />
            <div className="container">
              <div className="intro row justify-content-center fake-vertical-center">
                <div className="col col-md-8">
                  <h1>Gérer les conventions de prêt de matériel audiovisuel</h1>
                </div>
                <div className="w-100"></div>
                <div className="col col-md-3">
                  <a href="/personnel/redirection">
                    <button type="button" className="btn-intro">Accéder aux conventions</button>
                  </a>
                </div>
              </div>
            </div>
            <div className="credits">
            Photo by <a target="_blank" href="https://unsplash.com/@markusspiske?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge">Markus Spiske</a> on Unsplash
            </div>
          </div>
        )
    }
}

if (document.getElementById('personnel-landingpage')) {
    ReactDOM.render(<PersonnelLandingpage />, document.getElementById('personnel-landingpage'));
}
