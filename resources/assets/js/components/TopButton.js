import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class TopButton extends Component {
    render() {
        return (
          <div className="container">
            <div className="row justify-content-end">
              <div className="col col-sm-1">
                {/*<button className="top-button" onClick={() => { document.location.href = "#" }}>Top</button>*/}
                <i className="fas fa-arrow-alt-circle-up top-button" onClick={() => { document.location.href = "#" }}></i>
              </div>
            </div>
          </div>
        )
    }
}

export default TopButton
