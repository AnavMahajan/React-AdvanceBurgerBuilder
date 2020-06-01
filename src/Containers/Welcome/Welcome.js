import React,{Component} from "react";
import {NavLink} from 'react-router-dom';
import classes from './Welcome.css';
import Button from "../../Components/UI/Button/Button";
import welcome from "../../Assets/Images/welcome.gif";

class Welcome extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            style : {
                width : "100%",
                color:"White"
            }
        };
      
        this.closeNav = this.closeNav.bind(this);
    }

    componentDidMount() {
        document.addEventListener("click", this.closeNav);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.closeNav);
    }

/*     openNav() {
        const style = { width : "100%" };
        this.setState({ style });
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
        document.addEventListener("click", this.closeNav);
    } */

    closeNav() {
        document.removeEventListener("click", this.closeNav);
        const style = { width : 0 };
        this.setState({ style });
        document.body.style.backgroundColor = "#F3F3F3";
        this.props.history.push("/Home")
    }

    render() {
        return (
            
       


            <div
                ref       = "snav"
                className = {classes.overlay}
                style     = {this.state.style}
                onClick   = {this.closeNav}
            >
               

                 
              {/*       <NavLink
                        
                        className = "closebtn"
                        onClick   = {this.closeNav}
                        to    = "/Home"
                    >
                        ×
                    </NavLink>
          */}
                    
                <h1  style={{fontfamily: "cursive", color:"#f7f7f7",padding:"0px",textAlign:"center",fontSize:"xxx-large",color: "rgba(0, 0, 0, 0.81)"}}>Welcome to Burger Builder</h1>
{/*                      <p >This interactive activity challenges you to create your own Burger by selecting the ingredeints like salad, cheese, meat or Bacon.
The activity goes through the stages of Ingredient selection,Summarizing the burger Ingredients and Ordering your Burger.</p> */}
                   
               
{/*                   <div><p><span style={{color:"#f7f7f7",fontSize:"20px",margin:"120px",borderBottom:"5px solid yellow",fontWeight:"bold"}}>Choose Ingredients</span><span style={{color:"#f7f7f7",fontSize:"20px",margin:"100px",borderBottom:"5px solid yellow",fontWeight:"bold"}}>Checkout Burger</span><span style={{color:"#f7f7f7",fontSize:"20px",margin:"100px",borderBottom:"5px solid yellow",fontWeight:"bold"}}>Place Order </span></p> </div> 
 */}                {/*   <div ><p><span ><i class="fas fa-hand-pointer"></i></span><span style={{color:"#0000009e",fontSize:"100px",margin:"110px"}}><i class="fas fa-shopping-cart"></i></span><span style={{color:"#0000009e",fontSize:"100px",margin:"160px"}}><i class="fas fa-hamburger"></i></span></p> 
                  </div>  */}
                  <div style={{textAlign:"center"}}><img   src={welcome}></img></div>
                     <Button btnType="success" >Create your own burger</Button>
                 
            </div>
        );
    }
}


export default Welcome;