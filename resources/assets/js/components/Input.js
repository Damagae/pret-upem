import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class Input extends Component {
    render(props) {
        return (
          <div className="form-group">
            <label htmlFor={this.props.id}>{this.props.nom}</label>
            <input disabled={this.props.disabled ? 'disabled' : ''} onBlur={() => { this.props.callback(this.props.id, this.props.verifications) }} onChange={() => { this.props.onChange && this.props.callback(this.props.id, this.props.verifications) }} onPaste={() => { this.props.callback(this.props.id, this.props.verifications) }} onInput={() => { this.props.onInput && this.props.callback(this.props.id, this.props.verifications) }} type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder} defaultValue={this.props.defaultValue} />
          </div>
        )
    }
}

export default Input
