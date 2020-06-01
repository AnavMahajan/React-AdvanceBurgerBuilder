import React,{Component} from 'react';
import {connect} from 'react-redux'
import Auxilary from '../Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';

class layout extends Component{
   state={
    
    showSideDrawer: false

   }

   SideDrawerClosedHandler=()=>{
    
    return(
     
        this.setState({
            showSideDrawer:false
        })

    );

   }

   SideDrawerToggleHandler=()=>{
    
    return(
     
        this.setState((prev)=>{
            
             return({showSideDrawer: !prev.showSideDrawer});
            
        })

    );

   }
    render(){

        return( <Auxilary >
            <SideDrawer 
            isAuthenticated={this.props.isAuthenticated}
            open={this.state.showSideDrawer} 
            closed={this.SideDrawerClosedHandler}/>
              <Toolbar
              isAuthenticated={this.props.isAuthenticated}
              DrawerToggleClicked={this.SideDrawerToggleHandler} />
              <main className={classes.Content}>
                  {this.props.children}
              </main>
              </Auxilary>
      );
    }

}

const mapStateToProp=(state)=>{
    return({
        isAuthenticated: state.auth.token !==null
    })

}

export default connect(mapStateToProp)(layout);