import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import Logo from './Logo'

class MenuPrincipal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      new: this.props.new, // Menu 1
      see: this.props.see, // Menu 2
      admin: this.props.admin,
      links: {
        new: this.props.links.new,
        see: this.props.links.see
      },
      activeItem: this.props.active
    }

    if (this.props.light) {
      this.state.mode = 'light'
    } else {
      this.state.mode = 'normal'
    }

    if (this.props.admin)
      this.state.links.admin = this.props.links.admin

    if (this.state.mode === 'light') {
      this.state.bar = false
    } else {
      this.state.bar = true
    }
  }

  isAdmin() {
    if (this.state.admin)
      return true
    return false
  }

  renderAdmin() {
    const s = this.state
      return (
        <div className={'text-center col col-lg-2 ' + (s.new ? 'offset-lg-2' : 'offset-lg-5')}>
          <a href={s.links.admin}><span className={'item ' + (s.activeItem === 'admin' ? 'selected' : '')} name='admin' >Administration</span></a>
        </div>
      )
  }

    renderNew() {
      const s = this.state
      if (s.new) {
        return (
            <div className={'text-center col col-lg-3' + ( !this.isAdmin() && ' offset-lg-5')}>
              <a href={s.links.new}><span className={'item ' + (s.activeItem === 'new' ? 'selected' : '')} name='new' >{ s.new }</span></a>
            </div>
        )
      } else {
        return (
          <div className={'text-center col col-lg-3' + ( !this.isAdmin() && ' offset-lg-5')}></div>
        )
      }
    }

    renderSee() {
      const s = this.state
      if (s.see) {
        return (
          <div className='text-center col col-lg-2'>
              <a href={s.links.see}><span className={'item ' + (s.activeItem === 'see' ? 'selected' : '')} name='see' >{ s.see }</span></a>
            </div>
        )
      }
      else {
        return ( <div className='col col-lg-2'></div>)
      }

    }

    renderBlank() {
      return (
        <div className="col col-lg-5">

        </div>
      )
    }

    render() {
      const s = this.state
      return (
        <div className='container'>
          <div className={'top-bar ' + (s.bar ? 'visible' : 'invisible')}></div>
          <div className={'row d-flex align-items-center justify-content-between menu ' + s.mode} >
                <div className="col col-lg-2 logo">
                  <Logo color={s.mode === 'light' ? 'white' : 'color'} />
                </div>

                { this.isAdmin() && this.renderAdmin() }
                { this.renderNew() }
                { this.renderSee() }

        </div>
        <div className={'bottom-bar ' + (s.bar ? 'visible' : 'invisible')}></div>
      </div>
        )
    }
  }

  export default MenuPrincipal;
