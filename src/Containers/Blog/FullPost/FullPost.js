import React, { Component } from 'react';
import axios from 'axios'

import classes from './FullPost.css';

class FullPost extends Component {

    state={

        fullposts:null,
        fullpostsId:null,

    }

    componentDidMount(){
        this.loadData();
    }
    componentDidUpdate(){
        this.loadData();
    }

    loadData(){

   
        if(this.props.match.params.id){  
     
            if(!this.state.fullposts || ( this.state.fullposts && this.state.fullpostsId != this.props.match.params.id)){
                axios.get('https://burgerbuilder-265a5.firebaseio.com/posts.json/?'+this.props.match.params.id)
                .then( Response=>{
                 
                   
                    let fullpostId=null;
                    let fullpost=null;
                    for(let id in Response.data){
                        fullpostId=id;
                        fullpost=Response.data[id]
                    }
                    this.setState({
                        fullposts:fullpost,
                        fullpostsId:fullpostId
                    })

                       console.log("full post props :", this.props.match.params.id);
                    console.log("full state props :", this.state.fullpostsId);
                    console.log("full title props :", this.state.fullposts.title);
                })
            }}
    }
    deleteHandler=()=>{
        axios.delete('https://burgerbuilder-265a5.firebaseio.com/posts.json/?'+this.props.match.params.id)    
    }

 
    render () {
     
      
/*         let post = <p style={{textAlign:"center"}}>Please select a Post!</p>;
 */       
        let post = null;
    
        if(this.props.match.params.id){
         post=   <p style={{textAlign:"center"}}>Loading....</p>

        }
     
        
        if(this.state.fullposts){
            post = (
                <div className={classes.FullPost}>
                    <h1>{this.state.fullposts.title} </h1>
                    <p>{this.state.fullposts.body}</p>
                    <div className={classes.Edit}>
                        <button onClick={this.deleteHandler} className={classes.Delete}>Delete</button>
                    </div>
                </div>
    
            );
           
        }
        return  post;
    }
}

export default FullPost;