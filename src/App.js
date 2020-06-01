import React, { Component } from 'react';
import Layout from './Components/Hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch,withRouter} from 'react-router-dom';
import CheckOut from './Containers/CheckOut/CheckOut';
import Orders from './Containers/Orders/Orders'
import Completion from './Containers/Completion/Completion';
import Welcome from './Containers/Welcome/Welcome';
import Blog from './Containers/Blog/Blog';
import AsyncComponent from './Components/Hoc/AsyncComponent';
import Posts from './Containers/Blog/Posts/Posts';
import NewPost from './Containers/Blog/NewPost/NewPost';
import Auth from './Containers/Auth/Auth';
import Logout from './Containers/Auth/Logout/Logout';
import * as actionCreators from './store/actions/index';
import { connect } from "react-redux";
import Reset from './Containers/Auth/Reset/Reset';

const asyncNewPost =AsyncComponent(()=>{
  return import('./Containers/Blog/NewPost/NewPost');
});

class App extends Component {

  componentDidMount(){

    this.props.onAuthCheckStatus();
  }
  render() {
   
    console.log("isAuthenticated*******************#*******########################"+this.props.isAuthenticated);
    let routes=(
      <Switch>
     
      <Route path="/Logout" component={Logout}/>
      <Route path="/ResetPassword" component={Reset}/>
      <Route path="/" exact component={Auth}/>
      
      <Route  component={Auth}/>
      </Switch>
    );
if(this.props.isAuthenticated){
  routes=(
    <Switch>
    <Route path="/Success" component={Completion}/>
  
    <Route path="/new-post" exact component={asyncNewPost} />
    <Route path="/posts"  component={Posts} />
            
          
     <Route path="/CheckOut" component={CheckOut}/>
     <Route path="/Orders/new-post" exact component={NewPost}/>
     <Route path="/Orders" component={Orders}/>
     <Route path="/Home" exact component={BurgerBuilder}/>
     <Route path="/Logout" component={Logout}/>
     <Route path="/Dashboard" component={Welcome}/>
 
    
   
     <Route render={()=><h1 style={{margin:"20px",padding:"10px",backgroundcolor:"#fcdc1f"}}>OOOPS!!Not Found</h1>}/>
     </Switch>
  );
}
    return (
      <div style={{marginTop:"3%"}}>
    
       <Layout >
     
    {routes}
            
         </Layout>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
  return({
   isAuthenticated: state.auth.token!=null
  })
}

const mapDispatchToProps=(dispatch)=>{
  return({
    onAuthCheckStatus: ()=>{dispatch(actionCreators.AC_Auth_CheckState())}
  })
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
