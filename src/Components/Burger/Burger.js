import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import Text from '../../Assets/Images/burgertext.png';

const Burger=(props)=>{

console.log("burger prop ingr",props.ingrideints)
let transformedburged=Object.keys(props.ingrideints)
.map(igKey=>{
    return [...Array(props.ingrideints[igKey])].map((_,i)=>{
return <BurgerIngredient key={igKey + i} types={igKey} /> ;

});

}).reduce((prev,current)=>{
return prev.concat(current);

},[]);
console.log(transformedburged);
if (transformedburged.length===0){

    transformedburged=<div className={classes.Logo2}><img src={Text}/></div>;
}
return(
    <div className={classes.Burgerimg}>
  <div className={classes.Burger}>
<BurgerIngredient types="bread-top"/>
{transformedburged}
<BurgerIngredient types="bread-bottom"/>

  </div>  
  </div>
    );

}



export default Burger;