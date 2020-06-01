import React,{Component} from 'react';
import Auxilary from '../Auxilary';
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
            <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
              <Toolbar DrawerToggleClicked={this.SideDrawerToggleHandler} />
              <main className={classes.Content}>
                  {this.props.children}
              </main>
              </Auxilary>
      );
    }

}

export default layout;