import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from './CheckOutSummary.css';

const CheckOutSummary=(props)=>{

    return(
      <div className={classes.CheckOutSummary}>
         
          <div style={{width:"100%",margin:"auto"}}>
          <Burger ingrideints={props.ingredients}/>
    
          </div>
          <h2>That Looks Delicious!</h2>
          <p style={{color: "#444"}}>Do you want to order this burger?</p>
         <Button btnType="Danger" clicked={props.CheckOutSummaryCancel}>CANCEL</Button>
         <Button btnType="Success" clicked={props.CheckOutSummaryContinue} disabled={props.disabled}>CONTINUE</Button>
      
      </div>

    );

}

export default CheckOutSummary;