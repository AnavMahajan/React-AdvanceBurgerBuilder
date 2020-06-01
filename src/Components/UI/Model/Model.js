import React,{Component} from 'react';
import classes from './Model.css';
import Auxilary from '../../Hoc/Auxilary/Auxilary';
import BackDrop from '../BackDrop/BackDrop';

class Model extends Component{
     
    shouldComponentUpdate(PrevProps,PrevState){
        return this.props.show !=PrevProps.show || this.props.children !=PrevProps.children
    }

    componentDidUpdate(){

        console.log("moded will update");
    }

    render(){
    console.log("this.props.modelClosed",this.props.modelClosed);
    console.log("this.props.show",this.props.show);


        return( <Auxilary>
            <BackDrop show={this.props.show} clicked={this.props.modelClosed}/>
    
    <div className={classes.Modal} 
    style={{
        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: this.props.show ? '1' : '0',
    }}>

        {this.props.children}
    </div>
    </Auxilary>);
    }
}

export default Model;