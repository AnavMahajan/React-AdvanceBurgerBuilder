import * as actionTypes from "./actionTypes";
import axios from '../../axios-order';

export const AC_ADD_INGREDIENT=(ingrideintsName)=>{

    return{
        type: actionTypes.ADD_INGREDIENT,
        ingrideintsName:ingrideintsName
    }
}

export const AC_REMOVE_INGREDIENT=(ingrideintsName)=>{

    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingrideintsName:ingrideintsName
    }
}

export const AC_onPurechaseCancelHandler=()=>{

    return{
        type: actionTypes.onPurechaseCancelHandler
    }
}

export const AC_onPurchaseHandler=()=>{

    return{
        type: actionTypes.onPurchaseHandler
    }
}

export const AC_onCheckOutSummaryCancel=()=>{

    return{
        type: actionTypes.onCheckOutSummaryCancel
    }
}

export const AC_onOrderSummaryContinue=()=>{

    return{
        type: actionTypes.ORDER_SUMMARY_CONTINUE
    }
}


//Action Creator of  Api call for initial ingrsidents from db
export const set_Ingredeints=(ingrideints)=>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        Ingredients: ingrideints
    }
}
export const set_Ingredeints_failed=()=>{
    return{
        type: actionTypes.SET_INGREDIENTS_FAILED,
        
    }
}

export const AC_initIngredients=(token)=>{
    return dispatch=>{
        axios.get('https://burgerbuilder-265a5.firebaseio.com/ingredients.json?auth='+token)
        .then(Response=>{
            dispatch(set_Ingredeints(Response.data))
        }
        )
        .catch(error=>{
             
            dispatch(set_Ingredeints_failed())

        }) 
    }
}