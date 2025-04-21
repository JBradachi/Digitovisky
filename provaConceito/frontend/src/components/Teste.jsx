import React, { useState } from "react";
import './Teste.css'
import './Jogar.jsx'
import Jogar from "./Jogar.jsx";

export default function Teste(){
  const [text, setText] = useState("Nada por enquanto");
  const [titulo, setTitulo] = useState("");

  const getText = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/getText", {
      method: 'POST',
      body: titulo
    })
    .then((mess) => mess.text())
    .then((text) => setText(text))
  }

  function getAllText(){
    fetch("http://localhost:8080/getAllText")
    .then((mess) => mess.text())
    .then((text) => setText(text))
  }

  return (
    <div>
      
      <h1 class="t">DIGITÓVSKY</h1>

      <label for="name" class='info'>Selecione um texto pelo seu título: </label>
      <form class="pesquisa-texto" onSubmit={getText} >
        <input 
          type="text"
          name="name" 
          id="name"
          required
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          />
        <button type="submit" >Selecionar</button>
      </form>
      <Jogar />
      {/*<KeyListenerComponent /> */}

      <button onClick={getAllText} class='botaoTexto'> Mostrar textos cadastrados </button>

      <div class='resposta'>{text}</div>
    </div>
  )
}
