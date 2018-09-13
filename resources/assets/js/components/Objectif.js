import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import img from '../../img/objectif.png'

class Objectif extends Component {
    render(props) {
        return (
          <tr key='0' className="objectif">
            <td colSpan="9">
              <img src={img}></img>
              <p className="legend">{this.props.legend}</p>
            </td>
          </tr>
        )
    }
}

export default Objectif
