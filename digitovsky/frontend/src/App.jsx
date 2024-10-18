//import React, { useEffect, useState } from "react";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//export default function Teste(){
//  const [text, setText] = useState("Nada por enquanto")
//
//  function getData(){
//    fetch("http://localhost:3000/api/teste")
//    .then((mess) => {
//        console.log(mess)
//        return mess.json()
//      })
//    .then((mess2) => {
//      console.log(mess2)
//      setText(JSON.stringify(mess2.message))
//    })
//  }
//
//  return (
//    <div>
//      <button onClick={getData}>
//        Clique aqui
//      </button>
//      
//      {text}
//    </div>
//  )
//}


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
