import React, { Component } from "react";
import { Redirect,NavLink } from "react-router-dom";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from './Auth.css';
import Spinner from '../../Components/UI/Spinner/Spinner'
import * as actionCreators from '../../store/actions/index';
import {connect} from 'react-redux';
import Auxilary from '../../Components/Hoc/Auxilary/Auxilary';
import logo from '../../Assets/Images/animated-clipart-burger-1.gif'

let errorMessage=null;
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },

    isSignUp: false
  };

  CheckValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if ( rules.isEmail ) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test( value ) && isValid
    }

    if ( rules.isNumeric ) {
        const pattern = /^\d+$/;
        isValid = pattern.test( value ) && isValid
    }
    return isValid;
  };

  inputChangeHanlder=(event,elementIdentifier)=>{

    const updatedControls={...this.state.controls}
    const updatedControlsElement = { ...updatedControls[elementIdentifier] };
    updatedControlsElement.value = event.target.value;
    updatedControlsElement.valid = this.CheckValidity(
        updatedControlsElement.value,
        updatedControlsElement.validation
      );

      updatedControlsElement.touched = true;
      updatedControls[elementIdentifier] = updatedControlsElement;
      this.setState({
        controls: updatedControls,
       // isValid: isValid
      });
  }


  submitHandler=(event)=>{
  
    event.preventDefault();
 this.props.onAuthentication(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
   
  }

  switchToLogin=()=>{
    errorMessage=null;
    return(
     
      this.setState({

        isSignUp:!this.state.isSignUp

      })
    )
  }
/* 
  onReset=()=>{
    console.log("indie the res3r redireedt")
    return(
     <Redirect to="/ResetPassword"/>
      )
   
  } */


    
    

  render() {



    let formArray = [];
    for (let key in this.state.controls) {
      formArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    console.log(formArray)

    let form=formArray.map(formElement=>{
        return(
            <Input
            required
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangeHanlder(event, formElement.id)}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            isTouched={formElement.config.touched}
            valueType={formElement.id}
            />
        )
      

    });

    this.props.spinner?form=<Spinner/>:form

    
    if(this.props.error){
      console.log(this.props.error)
      if(this.props.error==="EMAIL_NOT_FOUND"){
        errorMessage= <p>EMAIL_NOT_FOUND: There is No User linked to this Email.</p>
      }
      if(this.props.error==="INVALID_EMAIL"){
        errorMessage= <p>INVALID_EMAIL: Email you have Entered is Incorrect or Empty.</p>
      }
      if(this.props.error==="EMAIL_EXISTS"){
        errorMessage= <p>EMAIL_EXISTS: This Email is Already in Use. </p>
            }
      else if(this.props.error==="INVALID_PASSWORD"){
        errorMessage= <p>INVALID_PASSWORD: Your Password is Invalid.</p>
      }
      else if(this.props.error==="WEAK_PASSWORD : Password should be at least 6 characters"){
        errorMessage= <p>WEAK_PASSWORD : Password should be at least 6 characters</p>
      }
      else if(this.props.error==="USER_DISABLED"){
        errorMessage= <p>USER_DISABLED: Too Many Wrong Attempts. User has been Disabled</p>
      }
     
      else{

      }
       
       
    }
    
    console.log("@2@@@@@@@@"+this.props.IsAuthenticated)
    let autoReditect=<Redirect to="/Dashboard"/>;
    if(this.props.IsAuthenticated){
     autoReditect=<Redirect to="/Dashboard"/>
    }
    
    return (
  
      <div className={classes.Auth}>
     <div className={classes.firstDiv}>
       {autoReditect}
        <form onSubmit={this.submitHandler}>
        <h2>{this.state.isSignUp ? "Create Burger Builder Account" : "Member Login"}</h2>
          {form}
          
          {errorMessage}
          <Button btnType="Success" >
            {this.state.isSignUp ? "SignUp" : "Login With Email"}
          </Button>
         
          <p style={{fontSize:"10px",textAlign:"left"}}>{this.state.isSignUp ? "By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time." : null}</p>
          
        </form>
        {this.state.isSignUp ? null : <NavLink to="/ResetPassword"><i class="fas fa-unlock-alt"></i>  Reset Password</NavLink>  }  
       &nbsp;&nbsp; {this.state.isSignUp ?null:  <a  href ="https://github.com/AnavMahajan/ReactJs-AdvanceBurgerBuilder-" style={{color: "whitesmoke",fontWeight:"bold",marginLeft:"10px"}}><i class="fab fa-github"> GitHub</i></a>}
      </div>
     <div className={classes.SecondDiv}>
     {this.state.isSignUp ? <h2>It's Quick and Easy</h2> : <h2>Create Your Burger Builder Account</h2>}
      <p><img src={logo} style={{width:"30%",borderRadius:"50%",border:"1px solid #0a0233d9", backgroundColor:"#0a0233d9"}}></img></p>
     <Button btnType="Success" clicked={this.switchToLogin}>
          Switch To {this.state.isSignUp ? "Login" : "SignUp"}
        </Button>
     </div>



      </div>
    
    );
  }
}



const mapStateToProps=(state)=>{
  return({

    spinner: state.auth.spinner,
    error: state.auth.error,
   
    IsAuthenticated: state.auth.token!=null

  })
}

const mapDispatchToProps=(dispatch)=>{
  return({

    onAuthentication: (email,password,isSignUp)=>dispatch(actionCreators.AC_auth(email,password,isSignUp)),
  })
}


export default connect(mapStateToProps,mapDispatchToProps)(Auth);
