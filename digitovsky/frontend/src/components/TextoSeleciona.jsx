import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style/global.css";
import styles from "../../style/Texto.module.css";
import isAuth from "./isAuth";
import { Alert } from "./Alert";

// componente pra Read e Delete
 function TextoSeleciona(props) {
  const navigate = useNavigate();

  const [message, setMessage] = useState("")

  const [texto, setTexto] = useState("");
  const rotaVisualiza = "http://localhost:8080/texto/visualizar"
  const rotaSeleciona = "http://localhost:8080/texto/escolheAtual"

  useEffect(() => {
    loadData();
  }, []);

  function returnArea() {
    props.close();
  }

  async function selecionarTexto() {
  //  try {
  //    const response = await fetch(`${rotaVisualiza}/${props.info.id}`, {
  //      method: "GET",
  //    });
  //
  //    if (!response.ok) {
  //      // Handle non-200 responses
  //      const data = await response.json().catch(() => null); // Catch if JSON parsing fails
  //      if (data && data.field && data.message) {
  //        alert(`${data.field}: ${data.message}`);
  //        return;
  //      } else {
  //        throw new Error("Unexpected response from the server.");
  //      }
  //    }
  //
  //    // Parse the response if successful
  //    const text = await response.text();
  //    console.log("Texto carregado com sucesso:", text);
  //    setTexto(text); // Update React state
  //  } catch (error) {
  //    // Generic error handling
  //    console.error("Erro ao carregar os dados:", error);
  //    alert("Um erro inesperado ocorreu ao contatar o backend.");
  //  }
  //}
    return await fetch(`${rotaSeleciona}/${props.info.id}`, {
      method: "POST",
      body: props.info.id
    })
    .then((response)=> {
        console.log(response)
        if (!response.ok) {
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              console.log(data)
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                //alert(data.field + ' : ' + data.message)
                setMessage(data.field + ' : ' + data.message)
                return
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              //alert("Um erro inesperado ocorreu ao contatar o backend")
              setMessage("Um erro inesperado ocorreu ao contatar o backend")
              console.log("TextoSeleciona.jsx >>> ", error);
              return
            })
          return
        }
        // Caso tudo tenha dado certo
        console.log("TextoSeleciona.jsx >>> texto carregado com sucesso");
        alert("O texto foi selecionado com sucesso!!")
        returnArea()
      })
    .catch((error) => {
      //alert("um erro inesperado ocorreu ao cadastrar o professor");
      setMessage("Um erro inesperado ocorreu ao cadastrar o professor.");
      console.log("TextoSeleciona.jsx >>> ", error);
      throw new error
    })
    }

  async function loadData() {
    return await fetch(`${rotaVisualiza}/${props.info.id}`, {
      method: "GET",
    })
    .then((response)=> {
        console.log(response)
        if (!response.ok) {
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              console.log(data)
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                //alert(data.field + ' : ' + data.message)
                setMessage(data.field + ' : ' + data.message)
                return
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
             console.log("AAAAaa ", error);
              //alert("Um erro inesperado ocorreu ao contatar o backend")
              setMessage("Um erro inesperado ocorreu ao contatar o backend.")
              console.log("TextoSeleciona.jsx >>> ", error);
              return
            })
          return
        }
        // Caso tudo tenha dado certo
        console.log("TextoSeleciona.jsx >>> texto carregado com sucesso");
        return response.text()
      })
      .then((obj) => {
        console.log((obj))
        setTexto(obj)
      })
    .catch((error) => {
      //alert("um erro inesperado ocorreu ao cadastrar o professor");
      setMessage("Um erro inesperado ocorreu ao cadastrar o professor.");
      console.log("TextoSeleciona.jsx >>> ", error);
      throw new error
    })
  }

  return (
    <div className={styles.overlay}>
      <Alert message={message} setMessage={setMessage} />
      <div className={styles.content}>

        <div className={styles.card}>
        <button className={styles.return} onClick={returnArea}>X</button>

          <h1>
            <span>Título: {props.info.titulo.length > 30 ? <>{props.info.titulo.slice(0,30)}...</> : props.info.titulo}</span>
            <br />
            <span> Dificuldade: {props.info.dificuldade}</span>
          </h1>
          <div className={styles.texto}>
            <p id="texto-">{texto}</p>
          </div>
          <button className={styles.primary_button} onClick={selecionarTexto}>
            Selecionar
          </button>
        </div>
      </div>
    </div>
  );
}
export default isAuth(TextoSeleciona)
