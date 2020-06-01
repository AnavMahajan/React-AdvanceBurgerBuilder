import React, { Component } from 'react';
import axios from "axios";
import {Redirect} from 'react-router-dom';
import  classes from './NewPost.css';
import { connect } from "react-redux";
import Button from '../../../Components/UI/Button/Button';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Auxilary from '../../../Components/Hoc/Auxilary/Auxilary';
import WithErrorHanlder from '../../../Components/Hoc/WithErrorHandler/WithErrorHandler';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: true,
        email:''
    }

    componentDidMount(){

        console.log("New post props are", this.props);
        console.log("New post props are", this.state.submitted);
        this.setState({
            submitted:false 
        })
        
  

    }
   
    postHandler=()=>{
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;
        const data={
         
                 title:this.state.title,
                body:this.state.content,
                author:this.state.author,
                dateTime: dateTime,
                email:this.state.email
          
        }
        axios.post('https://burgerbuilder-265a5.firebaseio.com/posts.json?auth='+this.props.token,data)
        .then(response=>{

            console.log("response of New post is : " + response.status);
            this.props.history.push('/posts');
         
        })
        .catch(error=>{
        

            this.props.history.push('/posts');

        })


    }

    render () {

      /*   let Redirect=null;
         
        if(this.state.submitted){
            Redirect=<Redirect to="/posts" />
        } */

        let newpost=(  <form onSubmit={this.postHandler}><div className={classes.NewPost}><h1>Your Feedback<sub > <i>our priority</i></sub> </h1>
      
        <p>Use the form below to send us your comments. We read all feedback carefully, but we are unable to respond to each submission individually. Please provide your email address to better understand the comments you submitted.</p>
        <label>Title</label>
        <input required type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
        <label>Content</label>
        <textarea required  rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
        <label>Email</label>
        <input required  type="email" value={this.state.email} onChange={(event) => this.setState({email: event.target.value})}></input>
         <br/>
        <Button btnType="Success"  >Submit</Button></div>
        </form>
        );


        newpost=this.state.submitted?<Spinner/>:newpost

        return (

       
           <Auxilary>{this.props.isAuthenticated?newpost:<Redirect to="/"/>}
           </Auxilary>
                
                
          
        );
    }
}
const mapStateToProps=(state)=>{
    return{
        token:state.auth.token,
        isAuthenticated: state.auth.token!=null
    }
}
export default connect(mapStateToProps)(WithErrorHanlder(NewPost,axios) ) ;