import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import logoWhite from '../../img/logo-upem-white.png'
import logoColor from '../../img/logo-upem-color.png'

class Logo extends Component {
    render(props) {
      let logo
      if (this.props.color === 'white') {
        logo = logoWhite
      } else {
        logo = logoColor
      }
        return (
          <div className="logo">
            <img src={logo}></img>
            <span className="subtitle">Prêt audiovisuel</span>
          </div>
        )
    }
}

export default Logo
