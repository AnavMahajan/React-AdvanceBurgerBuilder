import React,{Component} from 'react';
import axios from 'axios';
import Post from '../../../Components/Post/Post';
import {Route,Redirect} from 'react-router-dom'; 
import {connect} from 'react-redux'
import Fullpost from  '../FullPost/FullPost';
import classes from './Posts.css'
/* import {Link} from 'react-router-dom';
 */import  './Posts.css';
import WithErrorHanlder from '../../../Components/Hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../../Components/UI/Spinner/Spinner';
class Posts extends Component{
    state={

        post:[],
        posts:[],
        spinner:true
  
    }


    componentDidMount(){
        
        console.log("posts props are", this.props)
        axios.get("https://burgerbuilder-265a5.firebaseio.com/posts.json?auth="+this.props.token)
        .then(Response=>{

          this.setState({
              spinner:false
          })
  const fetchpost=[]
  for(let key in Response.data){
    fetchpost.push({
          ...Response.data[key],
          id:key
      })
  } 




            const posts=fetchpost;
            const updatedposts=posts.map(post=>{
            
             return {
                 ...post,
                 author: "@Anav Mahajan"
             }
            })
            this.setState({
                 post:updatedposts
            })
         
        })
        .catch(error=>{

          /*     this.setState({
                  error :true
              }); */
              this.setState({
                spinner:false
            })
              console.log(error);
        })}

    postselectedHanlder=(id)=>{
         
      this.props.history.push({pathname:'/posts/'+id});

        }




 render(){


    let post=<p style={{textAlign:"center"}}>Something Went Wrong</p>
    if(!this.state.error){
        

         post=this.state.post.map(post=>{
/*             return  <Link to={'/'+post.id} key={post.id}>
 */           return <Post 
            key={post.id}
            title={post.title} 
            author={post.author}
            email={post.email}
            body={post.body}
            datetime={post.dateTime}
            clicked={()=>{this.postselectedHanlder(post.id)}}
            />
/*   </Link> */
          });

         

    }
    this.state.spinner?post=<Spinner/>:post

    let autoRediect=null
    if(!this.props.isAuthenticated)
    {
        autoRediect=<Redirect to="/"/>
    }

    return(
        <div>
            {autoRediect}
        <section className={classes.Posts}> 
         {post}
        </section>
        {/*  <Route path={this.props.match.url+"/:id"} exact component={Fullpost} /> */}
         </div>

    );
 }

}

const mapStateToProps=(state)=>{
    return{
        token: state.auth.token,
        isAuthenticated:state.auth.token!=null
    }
}

export default connect(mapStateToProps)(WithErrorHanlder(Posts,axios)) ;