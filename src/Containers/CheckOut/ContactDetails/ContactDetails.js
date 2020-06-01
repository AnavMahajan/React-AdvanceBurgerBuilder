import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactDetails.css";
import axios from "../../../axios-order";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import { connect } from "react-redux";
import WithErrorHandler from "../../../Components/Hoc/WithErrorHandler/WithErrorHandler";
import * as actionCreators from "../../../store/actions/index";

class ContactDetails extends Component {
  myRef = null;
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZipCode"
        },
        value: "",
        validation: {

          required: true,
          isNumeric:true,
          minLength: 4,
          maxLength: 6,
         
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true,
          touched: false
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email"
        },
        value: "",
        validation: {
          required: true,
          isEmail:true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Pickup" },
            { value: "cheapest", displayValue: "Home Delivery" }
          ]
        },
        validation: {},
        value: "Pickup",
        valid: true
      }
    },
    isValid: false,

    orderid: null
  };

  orderHandler = event => {
    event.preventDefault();
    const formdata = {};
    for (let id in this.state.orderForm) {
      formdata[id] = this.state.orderForm[id].value;
    }
    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formdata,
      userId:this.props.userId
      /*     customer: {
            name: "Anav",
            address : {
                street : '416a Saint kilda Road',
                zipcode: '13008',
                country: 'Australia' 
            },
            email: 'test@gmail.com',
                  },
        deliveryMethod : 'fastest', */
    };
    //alert("You Continue");
    this.props.onSubmitOrder(orderData,this.props.token);

    
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

  formChanged = (event, elementIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[elementIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.CheckValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[elementIdentifier] = updatedFormElement;
    console.log("updatedForm", updatedOrderForm);

    let isValid = true;
    for (let i in updatedOrderForm) {
      isValid = updatedOrderForm[i].valid && isValid;
    }
    this.setState({
      orderForm: updatedOrderForm,
      isValid: isValid
    });
  };

  componentDidMount() {
    window.scrollTo(0, this.myRef.offsetTop);
  }
  render() {
    const formArray = [];
    for (let key in this.state.orderForm) {
      formArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formArray.map(formElemet => {
          return (
            <Input
              key={formElemet.id}
              elementType={formElemet.config.elementType}
              elementConfig={formElemet.config.elementConfig}
              value={formElemet.config.value}
              changed={event => this.formChanged(event, formElemet.id)}
              invalid={!formElemet.config.valid}
              shouldValidate={formElemet.config.validation}
              isTouched={formElemet.config.touched}
              valueType={formElemet.id}
            />
          );
        })}
        <Button
          inputtype="input"
          btnType="Success"
          disabled={!this.state.isValid}
        >
          Place Your Order
        </Button>
      </form>
    );

    this.props.spinner ? (form = <Spinner />) : form;
    return (
      <div className={classes.ContactDetails}>
        <h4 ref={ref => (this.myRef = ref)}>Enter your Contact Details</h4>

        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingrideints,
    price: state.burgerBuilder.totalPrice,
    spinner: state.order.spinner,
    orderid:state.order.orders,
    token:state.auth.token,
    userId:state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitOrder: (orderData,token) => dispatch(actionCreators.AC_Submit_Order(orderData,token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactDetails, axios));
