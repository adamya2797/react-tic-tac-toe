import React, {Component} from 'react'

function Square(props){
    return <button
    onClick={()=>{
        props.clickHandler(props.index)
    }}> {props.value} </button>
}

export default Square