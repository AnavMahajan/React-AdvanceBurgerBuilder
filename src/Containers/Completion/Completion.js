import React,{ Component } from "react";
import classes from './Completion.css';
import {NavLink } from "react-router-dom";
import Button from "../../Components/UI/Button/Button";
import { connect } from "react-redux";

class Completion extends Component{

    render(){
         console.log("OrderId***********",this.props.orderId)
        return(<div className={classes.Completion}>
          
               <h1 ><i class="fas fa-check-circle"></i> Your Order <NavLink  to={"/orders"} style={{textDecoration:'none',fontSize:"110%",color:'green'}}></NavLink> has been Succussfully placed</h1>
               <h4><span >OrderID : {this.props.orderId}</span></h4>
          <NavLink className={classes.Navlink} to={"/orders"}>Track your order here <i class="fas fa-truck"></i> </NavLink>
         
           
            </div>)
    }
}

const mapStateToProps = state => {
    return {
        orderId: state.order.orderId,
    
    };
  };
  
  /* const mapDispatchToProps = dispatch => {
    return {
      onSubmitOrder: orderData => dispatch(actionCreators.AC_Submit_Order(orderData))
    };
  }; */

export default connect(mapStateToProps)(Completion);