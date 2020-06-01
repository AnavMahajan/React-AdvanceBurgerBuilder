import * as actionTypes from "./actionTypes";
import axios from 'axios'

export const authStart=()=>{
    return({
        type: actionTypes.AUTH_START
    })
}

export const authSuccess=(idToken,userId)=>{
    return({
        type: actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:userId
    })
}

export const authFailure=(error)=>{
    return({
        type: actionTypes.AUTH_FAILED,
        error:error
    })
}

export const AC_authLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('ExpirationDate');
    localStorage.removeItem('userID');
    return({
        type: actionTypes.AUTH_LOGOUT,
      
    })
}

export const authExpiration=(expirationTime)=>{
    return (dispatch)=>{
        setTimeout(()=>{
            dispatch(AC_authLogout())
        },expirationTime*1000)
    }
}


export const AC_auth=(email,password,isSignUp)=>{
   const data={
        email:email,
        password:password,
        returnSecureToken:true
    }
    let url="https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDwjl3yTTc9cYRQZsDuyOsxcY2jWuqyTVA"
    if(!isSignUp){
        url="https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDwjl3yTTc9cYRQZsDuyOsxcY2jWuqyTVA"
    }
    return(dispatch=>{
        dispatch(authStart())
        axios
          .post(
            url,
            data
          )
          .then(Response => {
            const ExpirationDate=new Date(new Date().getTime() + Response.data.expiresIn*1000)
            localStorage.setItem('token',Response.data.idToken);
            localStorage.setItem('ExpirationDate',ExpirationDate);
            localStorage.setItem('userID',Response.data.localId);

             dispatch(authSuccess(Response.data.idToken,Response.data.localId));
             dispatch(authExpiration(Response.data.expiresIn));
          })
          .catch(error => {
            console.log(error.response);
             dispatch(authFailure(error.response.data.error.message));
          });

    })
}


export const AC_Auth_CheckState=()=>{
    return dispatch=>{
    
        const token=localStorage.getItem('token');
       
        if(!token){
            dispatch(AC_authLogout());
        }
        else {
            const ExpirationDate=new Date(localStorage.getItem('ExpirationDate'));
            const userID=localStorage.getItem('userID');
            if(ExpirationDate > new Date()){

                dispatch(authSuccess(token,userID));
                dispatch(authExpiration((ExpirationDate.getTime()- new Date().getTime())/1000));
            }
            else{
                dispatch(AC_authLogout());
            }
           

        }
        

    }

}



export const authReset_Start=()=>{
    return({
        type: actionTypes.AUTH_RESET_START
    })
}

export const authReset_Success=(email)=>{
    return({
        type: actionTypes.AUTH_RESET_SUCCESS,
        email:email,
      
    })
}

export const authReset_Failure=(error)=>{
    return({
        type: actionTypes.AUTH_RESET_FAILED,
        error:error
    })
}

export const AC_authReset=(email)=>{
   const data={
    requestType:'PASSWORD_RESET',
    email:email
   }
    return dispatch=>{
        dispatch(authReset_Start());
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDwjl3yTTc9cYRQZsDuyOsxcY2jWuqyTVA',data)
        .then(Response=>{
          console.log(" success console in reset ",Response.data)
          dispatch(authReset_Success(Response.data.email));
        })
        .catch(error=>{
            console.log(" errorconsole in reset ",error.response.data.error.message)
            dispatch(authReset_Success(error.response.data.error.message));
        })
    }

}
