import React,{Component} from 'react';
import Order from '../../Components/Order/Order/Order';
import axios from "../../axios-order";
import Spinner from '../../Components/UI/Spinner/Spinner';
import WithError from '../../Components/Hoc/WithErrorHandler/WithErrorHandler';
import classes from "./Orders.css";
import Button from '../../Components/UI/Button/Button';
import * as actionCreators from '../../store/actions/index';
import {connect} from "react-redux"
import {Redirect} from 'react-router-dom'
import Auxilary from '../../Components/Hoc/Auxilary/Auxilary';

class Orders extends Component{

    state={
     
     
        clicked:false,
        clickedIngredients:false,
        customertargetid:null,
        ingredientstargetid:null
    }
    componentDidMount(){
        this.props.onFetchOrder(this.props.token)
     /*    axios.get("orders.json")
        .then(res=>{
            console.log(res.data);
            const fetchorder=[]
            for(let key in res.data){
                fetchorder.push({
                    ...res.data[key],
                    id:key
                })
            } 
     
            this.setState({spinner:false,orders:fetchorder})
            
                 
        })
        .catch(error=>{
            console.log(error.message);
            return(this.setState({spinner:false})) 
            
        })
         */

    }

    clickedCustomerHanlder=(event)=>{
     
     this.setState(
         {
             clicked:!this.state.clicked,
             customertargetid:event.target.id

    })
    }
    
    clickedIngedientsHanlder=(event)=>{
        
        this.setState(
            {ingredientstargetid:event.target.id,
                clickedIngredients:!this.state.clickedIngredients,
                
            
            })
       }

    render(){
        let order=this.props.orders.map((order)=>{
            return (
             this.props.userId===order.userId?
                <Auxilary>
             
                  <Order
                    hideIngredients={this.state.clickedIngredients}
                    clickedIngredients={this.clickedIngedientsHanlder}
                    hideCustomer={this.state.clicked}
                    clickedCustomer={this.clickedCustomerHanlder}
                    customertargetid={this.state.customertargetid}
                    ingredientstargetid={this.state.ingredientstargetid}
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order.id}
                    id={order.id}
                    OrderData={order.orderData}
                  />
                
              </Auxilary>:null
            );}
               
                  
                  )



this.props.spinner?order=<Spinner/>:order

if(!this.props.isAuthenticated){
    order=<Redirect to="/"/>
}
        return(
            <Auxilary>      {order}</Auxilary>
    
          
        )
    }
}

const mapStatetoProps=(state)=>{
    return({
        orders:state.order.orders,
        spinner:state.order.spinner,
        token:state.auth.token,
        isAuthenticated: state.auth.token!=null,
        userId:state.auth.userId
    })
}

const mapDispatchToProps=(dispatch)=>{
    return({

        onFetchOrder:(token)=>dispatch(actionCreators.AC_Fetch_Order(token))
    })
}

export default connect(mapStatetoProps,mapDispatchToProps)(WithError(Orders,axios));