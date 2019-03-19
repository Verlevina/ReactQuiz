import React, { Component } from 'react';
import classes from './Layout.css';
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle.js';
import Drawer from '../../components/Navigation/Drawer/Drawer.js';
class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState ({
      menu: !this.state.menu
      }
    )
  };
  menuCloseHandler=()=>{
    this.setState ({
      menu: false
    })
  };
  render() {
    return (
      <div className={classes.Layout}>
        <main>
          <Drawer isOpen={this.state.menu}
                  onClose={this.menuCloseHandler}/>
          <MenuToggle isOpen = {this.state.menu}
                      onToggle = {this.toggleMenuHandler}
          />
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout;