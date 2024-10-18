import React, { useEffect, useState } from "react";

export default function Teste(){
  const [text, setText] = useState("Nada por enquanto")

  function getData(){
    fetch("http://localhost:8080/teste")
    .then((mess) => mess.text())
    .then((text) => setText(text))
  }

  return (
    <div>
      <button onClick={getData}>
        Clique aqui
      </button>

      {text}
    </div>
  )
}
