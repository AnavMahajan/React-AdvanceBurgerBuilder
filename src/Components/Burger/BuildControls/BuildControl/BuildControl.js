import React from 'react';
import classes from './BuildControl.css'
import Salad from '../../../../Assets/Images/Salad.png';
import Cheese from '../../../../Assets/Images/Cheese.png';
import Bacon from '../../../../Assets/Images/Bacon.png';
import Meat from '../../../../Assets/Images/Meat.png';


const BuildControl=(props)=>{

    return( 
    <div className={classes.BuildControl}>
      <div >
      {props.lable==='Salad' ? <img src={Salad} style={props.ingrideintsCount!=0?{border : '2px solid #228c1d'}:null} /> :null } 
       {props.lable==='Bacon' ? <img src={Bacon} style={props.ingrideintsCount!=0?{border : '2px solid #c45e38'}:null} />:null } 
        {props.lable==='Cheese' ? <img src={Cheese} style={props.ingrideintsCount!=0?{border : '2px solid #d6bb22'}:null} /> :null }
        {props.lable==='Meat' ? <img src={Meat} style={props.ingrideintsCount!=0?{border : '2px solid #7f3608'}:null} /> :null }
      </div>

      <div className={classes.Label}>{props.lable}
      <sub>${props.price.toFixed(2)} </sub></div>
  
      <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>-</button>
      <div className={classes.count}>
        {props.ingrideintsCount}
       </div>
      <button className={classes.More} onClick={props.added}>+</button>
  </div>
  
  );
   


}

export default BuildControl;