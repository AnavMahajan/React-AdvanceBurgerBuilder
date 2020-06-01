import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToogle/DrawerToggle';
const Toolbar=(props)=>{

return(

<header className={classes.Toolbar}>
    
     <DrawerToggle clicked={props.DrawerToggleClicked}/>
      <div className={classes.Logo}>
             <Logo isAuthenticated={props.isAuthenticated}/>
      </div>

 
    <nav className={classes.DesktopOnly}>
  <NavigationItems  isAuthenticated={props.isAuthenticated}/>
  </nav>
</header>

);

}

export default Toolbar;