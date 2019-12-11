import React from 'react';


export default function Repo(props) {
    return(
        <div className="repo">
        <img src = {props.avatar}></img>
        <p>{props.login}</p>
        <a href={props.url} target = "_BLANK">{props.name}</a>
    </div>
    );
}