import React from 'react';
import classes from './Post.css'
import './Post.css';

const post = (props) => (
    <article className={classes.Post} onClick={props.clicked}>
        <p className={classes.high}>{props.datetime}</p>
        <h1><i class="far fa-comment"></i>&nbsp;{props.title}</h1>
        <p>{props.body}</p>
        <div >
            <div className={classes.Author}><i><sub>@{props.email}</sub></i></div>
        </div>
    </article>
);

export default post;