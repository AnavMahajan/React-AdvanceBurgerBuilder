import React,{Component} from 'react';

import Burger from '../../Components/Burger/Burger';
import Buildcontrols from '../../Components/Burger/BuildControls/BuildControls.js'; 
import Model from '../../Components/UI/Model/Model'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Auxilary from '../../Components/Hoc/Auxilary/Auxilary';
import axios from '../../axios-order';
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithErrorHandler from '../../Components/Hoc/WithErrorHandler/WithErrorHandler';
import classes from './BurgerBuilder.css';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'
import * as actionCreators from '../../store/actions/index'




class BurgerBuilder extends Component{


    componentDidMount(){

        this.props.initIngrideints(this.props.token);
     
  /*       axios.get('https://burgerbuilder-265a5.firebaseio.com/ingredients.json')
        .then(Response=>{
            this.setState({
                ingrideints:Response.data
            })
        }
        )
        .catch(error=>{
             
            this.setState({
                error:true
            })

        }) */

        }

    updatePurchase=(ingrideints)=>{
  //  const ingrideints={...this.state.ingrideints};
    const sum=Object.keys(ingrideints)
    .map((igKey)=>{

        return ingrideints[igKey];
    }).reduce((sum,el)=>{
           return sum + el;
    },0)
     
   return sum>0
    }
/* 
    addIngredientHandler=(type)=>{

     
     const oldCount=this.state.ingrideints[type];
     const updayedCount=oldCount +1 ;

     const updatedIngredient={...this.state.ingrideints};
     updatedIngredient[type]=updayedCount;
    
     const priceAddition=INGREDIENTS_PRICES[type];
     const oldprice=this.state.totalPrice;
     const newPrice=oldprice + priceAddition;

     this.setState({ingrideints:updatedIngredient,totalPrice:newPrice});
     this.updatePurchase(updatedIngredient);
    } */

 /*    removeIngredientHandler=(type)=>{

        const oldCount=this.state.ingrideints[type];
        let updayedCount=0;
        oldCount!=0 ? updayedCount=oldCount -1 : updayedCount

    
    
     const updatedIngredient={...this.state.ingrideints};
     updatedIngredient[type]=updayedCount;
    
     const priceAddition=INGREDIENTS_PRICES[type];
     const oldprice=this.state.totalPrice;
     const newPrice=oldprice - priceAddition;

     this.setState({ingrideints:updatedIngredient,totalPrice:newPrice});
     this.updatePurchase(updatedIngredient);

    }
 */
/*     purchaseHandler=()=>{
     
  this.setState({
    purchasing: true
  });
    } */

/*     purechaseCancelHandler=()=>{

        this.setState({
          purchasing: false,
          
            totalPrice: 4,

        });
    }
 */
    purechaseContinueHandler=()=>{
   



/* const queryparam=[];
for(let i in this.props.ingrideints){
    queryparam.push(encodeURIComponent(i)+"="+encodeURIComponent(this.props.ingrideints[i]));
  
}
queryparam.push("price="+this.props.totalPrice);
const querystring=queryparam.join('&'); */
        this.props.initOrder();
        this.props.onOrderSummaryContinue();
        this.props.history.push({
            pathname: '/CheckOut',
        //    search: '?'+querystring
          });

}

    render(){
         
        const disabledinfo={...this.props.ingrideints};
        for(let key in disabledinfo ){
            disabledinfo[key]= disabledinfo[key] ==0
        }

        let ordersummary=null;
        let burger=<Spinner/>

      if(this.props.ingrideints){
        burger=<Auxilary>
                       {/*  <Burger ingrideints={this.state.ingrideints}/> */}
                       <Burger ingrideints={this.props.ingrideints}/> 
                        <Buildcontrols 
                  /*        ingrideintAdded={this.addIngredientHandler}
                         ingrideintRemoved={this.removeIngredientHandler} */
                         
                         ingrideintAdded={this.props.onAddIngredientHandler}
                         ingrideintRemoved={this.props.onRemoveIngredientHandler}
                         disabled={disabledinfo}
                         price={this.props.totalPrice}
                         purchasable={this.updatePurchase(this.props.ingrideints)}
                         ordered={this.props.onPurchaseHandler}
                         ingrideints={this.props.ingrideints}
                       
                         />
            
            </Auxilary>

        ordersummary= 
                       <OrderSummary 
                        ingredients={this.props.ingrideints}
                        Continue={this.purechaseContinueHandler}
                        Cancel={this.props.onPurechaseCancelHandler}
                        price={this.props.totalPrice}
                        />
                    }
        if(this.props.spinner){
                        ordersummary=<Spinner/>
                    }

        
    let autoRedirect=null;
    autoRedirect=this.props.isAuthenticated?null:<Redirect to="/"/>
        

     return(
       
      <Auxilary>
          {autoRedirect}
        <Model show={this.props.purchasing}  modelClosed={this.props.onPurechaseCancelHandler}>
           {ordersummary}
            </Model>
           {burger}
          
   
   </Auxilary>
        
        );

    }

}

const mapStateToProps=(state)=>{
return({  
    
    ingrideints: state.burgerBuilder.ingrideints,
    totalPrice : state.burgerBuilder.totalPrice,
    purchasing: state.burgerBuilder.purchasing,
    error:state.burgerBuilder.error,
    spinner:state.order.spinner,
    token:state.auth.token,
    isAuthenticated:state.auth.token!=null

});
   
}

const mapDispatcherToProps=(dispatch)=>{
   return({

    onAddIngredientHandler: (ingrideintsName)=>dispatch(actionCreators.AC_ADD_INGREDIENT(ingrideintsName)),
    onRemoveIngredientHandler: (ingrideintsName)=>dispatch(actionCreators.AC_REMOVE_INGREDIENT(ingrideintsName)),
    onPurchaseHandler:()=>dispatch(actionCreators.AC_onPurchaseHandler()),
    onPurechaseCancelHandler:()=>dispatch(actionCreators.AC_onPurechaseCancelHandler()),
    onCheckOutSummaryCancel:()=>dispatch(actionCreators.AC_onCheckOutSummaryCancel()),
    initIngrideints:(token)=>dispatch(actionCreators.AC_initIngredients(token)),
    initOrder:()=>dispatch(actionCreators.AC_Submit_Order_Redirect()),
    onOrderSummaryContinue:()=>dispatch(actionCreators.AC_onOrderSummaryContinue())



   })
    

}

export default connect(mapStateToProps,mapDispatcherToProps)(WithErrorHandler(BurgerBuilder,axios));