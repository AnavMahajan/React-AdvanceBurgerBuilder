import * as actionType from "../actions/actionTypes";

const initialState = {
  ingrideints: null,
  totalPrice: 4,
  purchasing: false,
  error: false
};

const INGREDIENTS_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  cheese: 0.4,
  meat: 1.3
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADD_INGREDIENT:
      return {
        ...state,
        ingrideints: {
          ...state.ingrideints,
          [action.ingrideintsName]:
            state.ingrideints[action.ingrideintsName] + 1
        },
        totalPrice:
          state.totalPrice + INGREDIENTS_PRICES[action.ingrideintsName]
      };
    case actionType.REMOVE_INGREDIENT:
      return {
        ...state,
        ingrideints: {
          ...state.ingrideints,
          [action.ingrideintsName]:
            state.ingrideints[action.ingrideintsName] - 1
        },
        totalPrice:
          state.totalPrice - INGREDIENTS_PRICES[action.ingrideintsName]
      };

   
    case actionType.onPurechaseCancelHandler:
      return {
        ...state,
        ingrideints: {
          salad: 0,
          cheese: 0,
          meat: 0,
          bacon: 0
        },
        purchasing: false,
        totalPrice: 4
      };

    case actionType.onPurchaseHandler:
      return {
        ...state,
        purchasing: true
      };
    case actionType.onCheckOutSummaryCancel:
      return {
        ...state,
        purchasing: false,
        ingrideints: {
          salad: 0,
          cheese: 0,
          meat: 0,
          bacon: 0
        },

        totalPrice: 4
      };


      case actionType.ORDER_SUMMARY_CONTINUE:
          return {
            ...state,
            purchasing: false,
            
           
            
          };
    case actionType.SET_INGREDIENTS:
      return {
        ...state,
        purchasing: false,
        totalPrice: 4,
        ingrideints: action.Ingredients,
        error: false,
     


      };

    case actionType.SET_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;
