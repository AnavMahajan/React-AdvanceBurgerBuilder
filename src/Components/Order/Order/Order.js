import React from "react";
import classes from './Order.css'
import Model from "../../UI/Model/Model";
import Button from "../../UI/Button/Button";
import {NavLink }from 'react-router-dom';

const Order=(props)=>{
const ingredients=[];
const OrderData=[];
let id=props.id;


console.log("id is"+ id);
for(let IngredientsName in props.ingredients){

    ingredients.push({
        name:IngredientsName,
        quantity:props.ingredients[IngredientsName]
    })

}
for(let OrderDataName in props.OrderData){

    OrderData.push({
        name:OrderDataName,
        value:props.OrderData[OrderDataName]
    })

}
let styleCustomer={display:"none"};
props.hideCustomer && props.id===props.customertargetid ?  styleCustomer={
    textTransform:'capitalize',

    fontWeight:"normal",
    fontSize:"large",
    margin:'10px 10px',
    padding:'0px',
    backgroundColor: "WHITE",
    color: "#222"
}:styleCustomer


let styleIngredients={display:"none"};
console.log("id",id);

props.hideIngredients && id===props.ingredientstargetid ?  styleIngredients={
    textTransform:'capitalize',
   

    fontWeight:"normal",
    fontSize:"large",
    margin:'10px 10px',
    padding:'0px',
    backgroundColor: "WHITE",  
    color: "#222"
}:styleIngredients

const ingredientsOutput=ingredients.map(igkey=>{
    return <p  style={styleIngredients} 
       
      key={igkey.name}> {igkey.name}  &times; {igkey.quantity}
   
   </p>
})


const OrderDataOutput=OrderData.map(igkey=>{
    return <p  style={styleCustomer} 
      key={igkey.name}> {igkey.name} : {igkey.value}
   
   </p>
})
let price=+props.price;
price=price.toFixed(2)

    return(
       
        <div className={classes.Order}>
            <p ><b>OrderID:</b>{props.id} <i style={{backgroundColor:"#fcdc1f",color:"black",fontWeight:"bold",borderRadius:"5px ",border:"1px solid #fcdc1f",marginRight:"3%",marginLeft:"2%"}}>#Paid</i>
            <i style={{backgroundColor:"rgb(31, 232, 252)",color:"black",fontWeight:"bold",borderRadius:"5px ",border:"1px solid rgb(31, 232, 252)"}}> #Preparing</i>
            </p>
   
   
   
   
   <div className={classes.price}>           
        <i id={props.id}  onClick={props.clickedCustomer} class="fas fa-user"> {props.hideCustomer ? <Model show><i style={{marginLeft:"100px",color:"#fcdc1f", borderBottom: '1px solid #fcdc1f',textAlign:"center"}}>Cusomter Details</i>{OrderDataOutput}</Model>:null} </i></div>
<div className={classes.ingredients}>
<i id={id}  onClick={props.clickedIngredients} class="fas fa-hamburger" > {props.hideIngredients ? <Model show><i style={{marginLeft:"100px",color:"#fcdc1f", borderBottom: '1px solid #fcdc1f',textAlign:"center"}}>Burger Ingredients</i> {ingredientsOutput}</Model>:null}</i> </div>
<div style={{padding:"10px",width:"7%",marginLeft:"12%"}} class="fas fa-dollar-sign"><i style={{fontWeight:"normal"}}> &nbsp;{price} </i></div>

<div style={{padding:"22px",marginLeft:"8%",marginRight:"8%"}} class="fas fa-hourglass-half"><i style={{fontWeight:"normal"}}>&nbsp;Preparing </i> </div>

<div><NavLink to="/new-post"><Button btnType="Success" >Feedback</Button></NavLink></div>

        </div>


    )
}

export default Order;