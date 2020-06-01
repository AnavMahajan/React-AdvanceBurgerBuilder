import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css'
import Auxilary from '../../Hoc/Auxilary/Auxilary';
import BackDrop from '../../UI/BackDrop/BackDrop';

const SideDrawer=(props)=>{
 let attachedClass=[classes.SideDrawer,classes.Close];
 props.open ? attachedClass=[classes.SideDrawer,classes.Open] : attachedClass
    return(
        <Auxilary>
            <BackDrop clicked={props.closed} show={props.open}/>
        <div className={attachedClass.join(' ')} >
         <div className={classes.Logo}>
         <Logo />
         </div>
        
           <nav>
              <NavigationItems clicked={props.closed} isAuthenticated={props.isAuthenticated}/>
           </nav>
        </div>
        </Auxilary>

    );
}

export default SideDrawer;