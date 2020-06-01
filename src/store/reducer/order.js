import * as actionType from "../actions/actionTypes";

const initialState = {
  orders: [],
  spinner:false,
  redirect: false,
  orderId:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {

    case actionType.SUBMIT_ORDER_START:
      return {
        ...state,
        spinner:true,
        orderId:null
      };
      
    case actionType.SUBMIT_ORDER_SUCCESS:
            const updatedOrder = {
              ...action.orderData,
              OrderId: action.orderId
            };
            
  
      return {
      ...state,
      spinner:false,
      orders: state.orders.concat(updatedOrder),
      redirect:true,
      orderId:action.orderId



      };

    case actionType.SUBMIT_ORDER_FAILED:
      return {
        ...state,
        spinner:false,

      };

      case actionType.SUBMIT_ORDER_REDIRECT:
          return {
            ...state,
            redirect:false
          
    
          };

          case actionType.FETCH_ORDER_START:
              return {
                ...state,
                spinner:true,
               
              };

              case actionType.FETCH_ORDER_SUCCESS:
                  return {
                    ...state,
                    orders:action.orders,
                    spinner:false,
                   
                  };

                  case actionType.FETCH_ORDER_FAILED:
                      return {
                        ...state,

                        spinner:false,
                       
                      };

    default:
      return state;
  }
};

export default reducer;
