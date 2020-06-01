import React from  'react';
import classes from './OrderSummary.css';
import Auxilary from '../../Hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

const OrderSummary=(props)=>{

    const ingredients=props.ingredients;
    const orderSummary=Object.keys(ingredients)
    .map((igKey)=>{

        return <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}> {igKey}</span> &times; {props.ingredients[igKey]}
            </li>
    });

    return(

       <Auxilary>
       <h3 className={classes.Underline}>Your Order</h3>
       <hr></hr>
     
       <p>A delicious burger with following ingredients :</p>
       <ul >
       {orderSummary}

       </ul>
       <p>Total Price: <span className={classes.OrderSummary}> ${props.price.toFixed(2)}</span></p>
       <p>Continue to Checkout ?</p>
       <Button btnType="Danger" clicked={props.Cancel}>&larr;</Button>
       <Button btnType="Success" clicked={props.Continue}>CONTINUE &nbsp;&nbsp;&rarr;</Button>
       </Auxilary>

    );
}

export default OrderSummary;