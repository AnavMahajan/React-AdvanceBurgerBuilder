import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { lable: 'Salad' , type: 'salad'},
    { lable: 'Bacon' , type: 'bacon'},
    { lable: 'Cheese' , type: 'cheese'},
    { lable: 'Meat' , type: 'meat'}
];
const INGREDIENTS_PRICES={
   
    salad : 0.5,
    bacon : 0.7,
    cheese : 0.4,
    meat : 1.3,
  
  };

const BuildControls=(props)=>{

    return(<div className={classes.BuildControls}>
        <p className={classes.totalprice}>Total Price     &nbsp; &nbsp; <strong>$ {props.price.toFixed(2)}</strong></p>
        {
        controls.map((cntrl)=>{
            return (<BuildControl 
                key={cntrl.lable}
                lable={cntrl.lable }
                added={ ()=>props.ingrideintAdded(cntrl.type) } 
                removed={ ()=>props.ingrideintRemoved(cntrl.type) }
                disabled={props.disabled[cntrl.type]}
                ingrideintsCount={props.ingrideints[cntrl.type]}
                price={INGREDIENTS_PRICES[cntrl.type]}
                />
            );

        })
      }
      <button className={classes.OrderButton} disabled={!(props.purchasable)} onClick={props.ordered}>CheckOut Burger</button>
  </div>
);

}

export default BuildControls;