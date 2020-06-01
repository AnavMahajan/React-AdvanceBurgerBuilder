import React,{Component} from 'react';
import Model from '../../UI/Model/Model';
import Auxilary from '../Auxilary/Auxilary';

const WithErrorHanlder=(WrappedComponent,axios)=>{
 return( class extends Component{

    state={
        error:null
    }

    componentWillMount(){
      
        this.reqInterceptor=axios.interceptors.request.use(request=>{
            this.setState({error:null})
            return request;
        },error=>{
            this.setState({error:error})
        })
        this.resInterceptor=axios.interceptors.response.use(response=>{
            return response
        },error=>{
            this.setState({error:error});
          
           
        })

    }

    componentWillUnmount(){

        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorHanlder=()=>{

        this.setState({
            error:null
        });
    }

 render(){

    return(  <Auxilary>
        <Model show={this.state.error} modelClosed={this.errorHanlder} >
             {this.state.error ? this.state.error.message :null}  
        </Model>
        <WrappedComponent {...this.props}/>
      </Auxilary>)
 }

 })

}

export default WithErrorHanlder;
