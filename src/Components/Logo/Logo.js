import React from  'react';
import burgerlogo from '../../Assets/Images/burger-logo.png';
import classes from './Logo.css';
import {NavLink } from 'react-router-dom';

const Logo=(props)=>{
 
return <div className={classes.Logo} >
  {props.isAuthenticated? <NavLink to="/Home"><img src={burgerlogo} alt="myBurger" ></img></NavLink>:
 <NavLink to="/Dashboard"><img src={burgerlogo} alt="myBurger" ></img></NavLink>}
 

</div>

}

export default Logo;