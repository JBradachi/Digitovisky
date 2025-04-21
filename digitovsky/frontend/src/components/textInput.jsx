import React from "react";

export default function textInput(props){
  return (
    <input id={props.id} type="text" onChange={(e) => props.event(e.target.value)} />
  )
}
