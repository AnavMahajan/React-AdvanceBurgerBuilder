import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems=(props)=>{

    return(
   
<ul className={classes.NavigationItems} onClick={props.clicked}>


{props.isAuthenticated?<NavigationItem  link="/Home"  ><i class="fas fa-home"></i> Burger Builder</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/Orders" ><i class="fas fa-hamburger"></i> MyOrders</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/new-post" ><i class="far fa-comments"></i> Feedback</NavigationItem>:null}
{props.isAuthenticated?<NavigationItem link="/Logout" ><i class="fas fa-sign-out-alt"></i> Logout</NavigationItem>:<NavigationItem   link="/Dashboard" ><i class="fas fa-sign-in-alt"></i> Login</NavigationItem>}

</ul>

    );
}

export default NavigationItems;