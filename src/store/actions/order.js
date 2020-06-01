import * as actionTypes from "./actionTypes";
import axios from "../../axios-order";
import { Redirect } from "react-router-dom";

//Action Creator of  Api call for submit order ingrsidents from db

/* export const Submit_Order=(orderId,orderData)=>{
    return{
        type: actionTypes.SUBMIT_ORDER,
      
    }
} */

//Submit Order for Contact Details page
export const Submit_Order_Start = () => {
  return {
    type: actionTypes.SUBMIT_ORDER_START
  };
};

export const Submit_Order_Success = (orderId, orderData) => {
  return {
    type: actionTypes.SUBMIT_ORDER_SUCCESS,
    orderId: orderId,
    orderData: orderData
  };
};
export const Submit_Order_Failed = error => {
  return {
    type: actionTypes.SUBMIT_ORDER_FAILED,
    error: error
  };
};

export const AC_Submit_Order = (orderdata,token) => {
  return dispatch => {
    dispatch(Submit_Order_Start());
    axios
      .post("https://burgerbuilder-265a5.firebaseio.com/orders.json?auth="+token, orderdata)
      .then(Response => {
        dispatch(Submit_Order_Success(Response.data.name, orderdata));
      })
      .catch(error => {
        dispatch(Submit_Order_Failed(error));
      });
  };
};

export const AC_Submit_Order_Redirect = () => {
    return {
      type: actionTypes.SUBMIT_ORDER_REDIRECT
    };
  };

//Get Orders for Orders page
export const AC_Fetch_Order_Init = () => {
    return {
      type: actionTypes.FETCH_ORDER_INIT
    };
  };

export const Fetch_Order_Start = () => {
  return {
    type: actionTypes.FETCH_ORDER_START
  };
};

export const Fetch_Order_Success = orders => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders:orders
  };
};

export const Fetch_Order_Failed = error => {
  return {
    type: actionTypes.FETCH_ORDER_FAILED,
    error:error
  };
};

export const AC_Fetch_Order=(token)=>{
    return dispatch=>{
        dispatch(Fetch_Order_Start());
        axios.get("orders.json?auth="+token)
        .then(res=>{
            console.log(res.data);
            const fetchorder=[]
            for(let key in res.data){
                fetchorder.push({
                    ...res.data[key],
                    id:key
                })
            } 
     
          dispatch(Fetch_Order_Success(fetchorder))
            
                 
        })
        .catch(error=>{
            console.log(error.message);
            dispatch(Fetch_Order_Failed(error))
            
        })
    }
}


