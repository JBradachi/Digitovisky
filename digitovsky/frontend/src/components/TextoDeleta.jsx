import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../../style/global.css";
import styles from "../../style/Texto.module.css";
import isAuth from "./isAuth";
import { Alert } from "./Alert";

// componente pra Read e Delete
function TextoDeleta(props) {
  const navigate = useNavigate()
  const [message, setMessage] = useState()

  const [texto, setTexto] = useState()
  const rotaDeleta = "http://localhost:8080/texto/delete"
  const rotaVisualiza = "http://localhost:8080/texto/visualizar"

  useEffect(() => {
    loadData();
  }, []);

  function returnArea() {
    props.close();
  }

  async function loadData() {
    return await fetch(`${rotaVisualiza}/${props.info.id}`, {
      method: "GET",
    })
    .then((response)=> {
        if (!response.ok) {
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
              if (data.hasOwnProperty('field') && data.hasOwnProperty('message')) {
                alert(data.field + ' : ' + data.message)
                return
              }
              else {
                throw response 
              }
            })
            .catch((error) => {
              alert("Um erro inesperado ocorreu ao contatar o backend.")
              console.log("TextoDeleta.jsx >>> ", error)
              return
            })
          return
        }
        // Caso tudo tenha dado certo
        return response.text()

      })
      .then((obj) => {
        setTexto(obj)
          .catch((error) => {
      })
      alert("Um erro inesperado ocorreu ao cadastrar o professor.");
      console.log("TextoDeleta.jsx >>> ", error)
      throw new error
    })
  }

  async function deletaTexto(){
    return await fetch(`${rotaDeleta}/${props.info.id}`, {
      method: 'DELETE',
    })
      .then((response)=> {
        if (!response.ok) {
          // Primeiramente é tentado recuperar os campos da resposta que indicam que deu errado. Se não conseguir, trata como um erro genérico
          const obj = response.json()
            .then((data) => {
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
              console.log("TextoDeleta.jsx >>> ", error)
              return
            })
          return
        }
        // Caso tudo tenha dados certo
        alert("Texto deletado com sucesso!!")
        //window.location.reload();
        props.reload()
      })
      .catch((error) => {
        //alert("Um erro ocorreu ao tentar deletar o texto.")
        setMessage("Um erro ocorreu ao tentar deletar o texto.")
        console.log("TextoDeleta.jsx >>> ", error)
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
          </h1>
          <div className={styles.texto}>
            <p id="texto-">Texto: {texto}</p>
          </div>

          <button className={styles.deletar_button} onClick={deletaTexto}>
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
export default isAuth(TextoDeleta)
