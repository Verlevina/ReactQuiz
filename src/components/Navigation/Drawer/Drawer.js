import React, {Component} from 'react';

import classes from './Drawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop';

import {NavLink} from 'react-router-dom';


const links = [
  { to: '/', label: 'Список', exact: true},
  { to: '/Auth', label: 'Авторизация', exact: true},
  { to: '/QuizCreator', label: 'Создать тест', exact: true},
  { to: '/AboutUs', label: 'О нас', exact: true}];

class Drawer extends Component {
  clickHandler = () => {
    this.props.onClose();
  };

  renderLinks = () =>{
    return (links.map((link, key)=>{
      return (
        <li key={key}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={this.clickHandler}>
          {link.label}
        </NavLink>
      </li>)
    }))
  };
  render(){
    const cls = [classes.Drawer];
      if(!this.props.isOpen) {
        cls.push(classes.close)
      }
    return(<React.Fragment>
        <nav className={cls.join(' ')}>
         <ul>
           {this.renderLinks()}
          </ul>
        </nav>
      {this.props.isOpen?
        <BackDrop onClick={this.props.onClose}/>
        :null}
      </React.Fragment>
    )

  }
}
export default Drawer;