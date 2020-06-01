import React,{Component} from 'react';
import CheckOutSummary from '../../Components/Order/CheckOutSummary/CheckOutSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {Route,withRouter,Redirect} from 'react-router-dom';
import ContactDetails from './ContactDetails/ContactDetails';
import {connect} from "react-redux";
import * as actionCreator from '../../store/actions/index'

class CheckOut extends Component{


    state={

  
        disabled:false
    }
    

    /* componentDidMount() {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        let ingredients = {};
        let price=0;
     
        for(let param of query.entries()){
            if(param[0]==='price')
            {
                console.log("praram",param[0])
                price=param[1];

            }else{
                console.log("elsepraram",param[0])
                ingredients[param[0]]=+param[1];
            }
        }

        this.setState({ingredients: ingredients, price: price});
      } */



    CheckOutSummaryCancelHanlder=()=>{
        this.props.onCheckOutSummaryCancel();
       this.props.history.goBack();
     
    }
    CheckOutSummaryContinueHanlder=()=>{
   //     this.props.onCheckOutSummaryContinue()
        this.setState({
            disabled:true
        })
        this.props.history.replace("/CheckOut/ContactDetails/");
    }

    render(){
    let output=<Redirect to="/Home"/>
    let redirect=null;
    if(this.props.ingredients){
    console.log("***********************",this.props.redirect)
    redirect=this.props.redirect ?<Redirect to="/Success" />:null
    console.log("*****************rdirect******")
    output=(<CheckOutSummary ingredients={this.props.ingredients}
    CheckOutSummaryContinue={this.CheckOutSummaryContinueHanlder}
    CheckOutSummaryCancel={this.CheckOutSummaryCancelHanlder}
    disabled={this.state.disabled}
    />)}

        return(
        <div>
            {redirect}
            {output}
            <Route path={this.props.match.url+"/ContactDetails"} component={ContactDetails}/>

        </div>
        )
    }
}


const mapStateToProp=(state)=>{
    return({
        ingredients:state.burgerBuilder.ingrideints,
        redirect:state.order.redirect,
    })
}

const mapDispatcherToProps=(dispatch)=>{
        return({
    onCheckOutSummaryCancel:()=>dispatch(actionCreator.AC_onCheckOutSummaryCancel()),
        })
    }

export default connect(mapStateToProp,mapDispatcherToProps)(withRouter(CheckOut));